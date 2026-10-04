from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status, Request

from models.interview import Interview, Answer, InterviewStatus
from request_model.AnswerResquest import AnswerRequest
from response_model.AnswerResponse import AnswerResponse
from services.ai_services import generate_questions_intro, generate_report
from services.interview_service import create_session, get_session, save_answer, get_history
from util.file_util import extract_text, validate_file


router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)

@router.post("/generate-question")
async def generate_questions(
    request: Request,
    job_title: str = Form(...),
    job_description: str = Form(...),
    mode: str = Form("demo"),
    resume: UploadFile = File(...)
):
    # Validate resume file
    await validate_file(resume)

    # Extract text from resume
    resume_text = await extract_text(resume)

    # Generate questions and intro text using title, description, mode, and resume content
    resp = await generate_questions_intro(
        job_title=job_title,
        job_description=job_description,
        resume_text=resume_text,
        mode=mode
    )

    user = request.session.get("user")
    user_id = user.get("id") if user else None

    session = create_session(user_id=user_id, job_title=job_title)
    session.questions = resp.get("questions")
    session.introText = resp.get("introText")

    return { "session_id": session.session_id }



@router.get("/start/{session_id}")
async def start_interview(session_id: str):
    # Check valid session_id
    session = get_session(session_id)
    if not session or session.status == InterviewStatus.COMPLETED:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview Session Not Found")

    return {
        "introText": session.introText,
        "firstQuestion": session.questions[0]
    }


@router.post("/submit", response_model=AnswerResponse)
async def submit_answer(answerReq: AnswerRequest):
    # Check valid session_id
    session = get_session(answerReq.session_id)
    if not session or session.status == InterviewStatus.COMPLETED:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview Session Not Found")


    # save answer in interview session
    save_answer(answerReq.answer, answerReq.skip, session)

    # return
    if session.status == InterviewStatus.COMPLETED:
        return {
            "interviewEnded": True
        }
    
    return {
        "interviewEnded": False,
        "nextQuestion": session.questions[session.current_index]
    }

@router.put("/end/{session_id}")
async def end_interview(session_id: str):
    # Check valid session_id
    session = get_session(session_id)
    if not session or session.status == InterviewStatus.COMPLETED:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview Session Not Found")
    
    session.status = InterviewStatus.COMPLETED

    return {
            "interviewEnded": True
    }

@router.get("/report/{session_id}")
async def report(session_id: str):
    # Check valid session_id
    session = get_session(session_id)
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Interview Session Not Found")
    
    import json
    if session.feedback:
        return { "result": json.loads(session.feedback) }
    
    resp = await generate_report(session.answers)
    session.feedback = json.dumps(resp)

    return { "result":  resp }

@router.get("/history")
async def history(request: Request):
    user = request.session.get("user")
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    
    sessions = get_history(user.get("id"))
    
    return {
        "history": [
            {
                "session_id": s.session_id,
                "job_title": s.job_title,
                "status": s.status,
                "scheduled_time": s.scheduled_time
            }
            for s in sessions
        ]
    }