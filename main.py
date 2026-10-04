import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from routers.interview import router as interview_router
from routers.chat import router as chat_router
from routers.auth import router as auth_router

load_dotenv()

app = FastAPI(
    version="0.1.0",
    title="Ai Interview Platform Service",
    description="This is a service for the Ai Interview Platform using FastAPI framework.",
)

SESSION_SECRET = os.getenv("SESSION_SECRET", "super_secret_session_key_change_me")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Session middleware required for Authlib & session cookies
app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET,
    same_site="none",
    https_only=True,
)

# CORS middleware configured for credentialed requests (session cookies)
origins = [
    FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(interview_router)
app.include_router(chat_router)