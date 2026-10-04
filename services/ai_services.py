import json
import logging
from services.qwen_service import ask_qwen

logger = logging.getLogger(__name__)

async def generate_questions_intro(job_title: str, job_description: str, resume_text: str, mode: str = "demo") -> dict:
    is_demo = str(mode).lower() == "demo"
    num_questions = 3 if is_demo else 12

    prompt = f"""
You are an expert AI Interviewer designing a structured interview for a candidate applying for the role of '{job_title}'.

JOB DESCRIPTION:
{job_description or "General software engineering role."}

CANDIDATE RESUME / EXPERIENCE:
{resume_text or "General software candidate background with past technical internships and project experience."}

INTERVIEW MODE: {"DEMO (3 short introductory/familiarization questions)" if is_demo else "FULL INTERVIEW (10 to 12 medium-to-hard level questions deeply testing past internships, technical projects, architecture, and problem solving skills)"}

Please output ONLY a JSON object with the following format:
{{
  "introText": "Welcome message introducing the interview...",
  "questions": [
    "Question 1...",
    "Question 2..."
  ]
}}
Ensure the 'questions' array has exactly {num_questions} questions.
"""

    try:
        response_str = ask_qwen(prompt, system_prompt="You are a helpful JSON generator. Output ONLY valid raw JSON with keys 'introText' and 'questions'. Do not wrap output in markdown codeblocks.")
        clean_json = response_str.strip()
        if clean_json.startswith("```"):
            clean_json = clean_json.split("```")[1]
            if clean_json.startswith("json"):
                clean_json = clean_json[4:]
        clean_json = clean_json.strip()

        data = json.loads(clean_json)
        if isinstance(data, dict) and "questions" in data and len(data["questions"]) > 0:
            return data
    except Exception as e:
        logger.error(f"Failed to generate questions via AI, using structured fallback: {e}", exc_info=True)

    if is_demo:
        questions = [
            f"Welcome to your demo interview! Could you start by introducing yourself and sharing why you're interested in the {job_title} role?",
            f"Walk me through a project or internship experience from your resume that you are most proud of.",
            f"What is one key technical skill you hope to showcase during this interview process?"
        ]
        introText = f"Welcome to your Demo Interview for {job_title}! This is a quick 3-question practice session designed to help you get familiar with the voice recording and answering interface. Take your time, and enjoy practicing!"
    else:
        questions = [
            f"Welcome! Let's dive right into your experience. Based on your resume, could you walk me through your key technical contributions at your recent internship or project?",
            f"In your past projects listed on your resume, how did you decide on the technical stack and architecture for the {job_title} domain?",
            f"Describe a complex technical challenge or bug you encountered during your past work. How did you diagnose and solve it under pressure?",
            f"Looking at the job description for {job_title}, how do your hands-on skills with your core technologies align with our requirements?",
            f"Can you explain a trade-off you had to make between code performance, maintainability, and delivery speed in a real-world project?",
            f"Walk me through how you handle code reviews, testing, and continuous integration in your engineering workflow.",
            f"Tell me about a time when a project requirement changed unexpectedly midway through development. How did you adapt your implementation?",
            f"How do you approach optimizing database queries or API endpoints when experiencing high latency?",
            f"Describe a scenario where you had to collaborate closely with cross-functional team members (designers, PMs, or backend engineers) to resolve a deadlock.",
            f"What security practices and data validation steps do you strictly enforce when developing production applications?",
            f"How do you stay up to date with modern tools, frameworks, and best practices in the {job_title} landscape?",
            f"Where do you see your technical specialization evolving over the next 3 to 5 years, and how does this role fit into your career vision?"
        ]
        introText = f"Welcome to your Full Interview for the {job_title} position. This comprehensive session consists of 12 medium-to-hard questions designed to deeply evaluate your past experience, technical problem solving, and project achievements. Speak clearly and elaborate fully on your answers!"

    return {
        "questions": questions,
        "introText": introText
    }

async def generate_report(answers: list) -> dict:
    answered = [a for a in answers if a.answer and not a.skip]
    skipped = [a for a in answers if a.skip]
    total = len(answers) if answers else 1
    answered_ratio = len(answered) / total

    base_score = 70
    score = int(min(100, base_score + answered_ratio * 25))

    strengths = [
        "Completed the full interview session end-to-end",
        "Provided structured responses to most questions",
        "Showed commitment and engaged with the practice session",
    ]

    if answered_ratio > 0.7:
        strengths.append("Answered most questions without skipping")

    improvements = [
        "Use the STAR method (Situation, Task, Action, Result) consistently for behavioral answers",
        "Include specific metrics and quantified results where possible",
        "Avoid skipping questions — even short answers are better than none",
    ]

    if skipped:
        improvements.append(f"You skipped {len(skipped)} question(s). Consider answering all questions next time.")

    per_question_feedback = []
    for idx, a in enumerate(answers):
        if a.skip:
            feedback = "This question was skipped. Try answering it next time for complete feedback."
            q_score = max(40, score - 25)
        elif a.answer and len(a.answer) > 120:
            feedback = "Solid response with good detail. Consider adding more specific metrics if possible."
            q_score = min(100, score + 5)
        else:
            feedback = "Short answer. Aim for 2-3 sentences with more context and examples."
            q_score = max(55, score - 10)

        per_question_feedback.append({
            "question": a.question,
            "score": q_score,
            "feedback": feedback,
        })

    return {
        "overall_score": score,
        "strengths": strengths,
        "improvements": improvements,
        "per_question_feedback": per_question_feedback,
    }
