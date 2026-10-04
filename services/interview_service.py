import uuid
from models.interview import Answer, Interview, InterviewStatus
from store.session_store import SESSION_STORE


def create_session() -> Interview:
    session_id = str(uuid.uuid4())

    interview_session = Interview(
        session_id=session_id,
        candidate_name="Candidate",
        interviewer_name="AI Interviewer",
        scheduled_time="2024-01-01T00:00:00Z"
    )

    SESSION_STORE[session_id] = interview_session
    return interview_session

def get_session(session_id: str) -> Interview:
    session = SESSION_STORE.get(session_id)
    if not session:
        return None
    
    return session


def save_answer(answer: str | None, skip: bool, session: Interview):
    question = session.questions[session.current_index]

    session.answers.append(
        Answer(
            question= question,
            answer= None if skip else answer,
            skip=skip
        )
    )

    session.current_index += 1

    if session.current_index == len(session.questions):
        session.status = InterviewStatus.COMPLETED