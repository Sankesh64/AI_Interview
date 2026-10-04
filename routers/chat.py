import logging
from fastapi import APIRouter, HTTPException, Request, status
from request_model.ChatRequest import ChatRequest
from response_model.ChatResponse import ChatResponse
from services.qwen_service import ask_qwen

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/api",
    tags=["Chat"]
)

@router.post("/chat", response_model=ChatResponse)
async def chat(request: Request, body: ChatRequest):
    user = request.session.get("user")
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please sign in first",
        )
    try:
        answer = ask_qwen(body.message)
        return {"reply": answer}
    except Exception as e:
        logger.error(f"Chat service error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unable to get a response from the AI service.",
        )
