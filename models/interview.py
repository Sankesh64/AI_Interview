from enum import Enum
from typing import Optional
from pydantic import BaseModel

class InterviewStatus(str, Enum):
    SCHEDULED = "scheduled"
    COMPLETED = "completed"
    CANCELED = "canceled"


class Answer(BaseModel):
    question: str
    answer: Optional[str] = None
    skip: bool = False

class Interview(BaseModel):
    session_id: str
    user_id: Optional[str] = None
    job_title: str = "General Role"
    candidate_name: str
    questions: list[str] = []
    interviewer_name: str
    scheduled_time: str  # ISO 8601 format
    status: InterviewStatus = InterviewStatus.SCHEDULED
    answers: list[Answer] = []
    current_index: int = 0
    introText: str = "Welcome to the AI Interview Platform! Please answer the following questions to the best of your ability."
    feedback: Optional[str] = None