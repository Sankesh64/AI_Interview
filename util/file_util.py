import io
import os
import base64
import logging
import PyPDF2
from PIL import Image
from fastapi import HTTPException, UploadFile, status
import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

ALLOWED_CONTENT_TYPES = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp"
]

ALLOWED_EXTENSIONS = (".pdf", ".png", ".jpg", ".jpeg", ".webp")

def is_valid_file_type(upload_file: UploadFile) -> bool:
    content_type = upload_file.content_type or ""
    filename = (upload_file.filename or "").lower()
    
    if content_type in ALLOWED_CONTENT_TYPES:
        return True
    if any(filename.endswith(ext) for ext in ALLOWED_EXTENSIONS):
        return True
    return False

async def validate_file(resume: UploadFile):
    # Check file size
    resume.file.seek(0, 2)
    size = resume.file.tell()
    resume.file.seek(0)

    if size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size should not exceed 10MB."
        )

    # Check file format
    if not is_valid_file_type(resume):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file format. Please upload a PDF or PNG/JPG image file."
        )

def extract_text_from_image_sync(image_bytes: bytes, mime_type: str = "image/png") -> str:
    """
    Extracts text from an image using pytesseract (if available) or OpenRouter Vision model.
    """
    # 1. Try local OCR via pytesseract if available
    try:
        import pytesseract
        image = Image.open(io.BytesIO(image_bytes))
        ocr_text = pytesseract.image_to_string(image).strip()
        if ocr_text:
            logger.info("Extracted text from image using local pytesseract.")
            return ocr_text
    except Exception as e:
        logger.debug(f"Pytesseract not available or failed: {e}")

    # 2. Extract using Vision AI via OpenRouter
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        logger.warning("No OPENROUTER_API_KEY found to extract text from image.")
        return ""

    openrouter_url = os.getenv("OPENROUTER_URL", "https://openrouter.ai/api/v1/chat/completions")
    vision_model = os.getenv("VISION_MODEL", "qwen/qwen2.5-vl-72b-instruct")

    b64_image = base64.b64encode(image_bytes).decode("utf-8")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8000",
        "X-Title": "AI Interview Platform"
    }

    payload = {
        "model": vision_model,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "Please extract and transcribe all readable text from this resume/document image accurately and verbatim, including candidate details, skills, experience, and education."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:{mime_type};base64,{b64_image}"
                        }
                    }
                ]
            }
        ]
    }

    try:
        resp = requests.post(openrouter_url, headers=headers, json=payload, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        choices = data.get("choices", [])
        if choices:
            text = choices[0]["message"]["content"].strip()
            logger.info("Successfully extracted text from image via Vision AI.")
            return text
    except Exception as e:
        logger.error(f"Failed to extract text from image using Vision AI: {e}", exc_info=True)

    return ""

async def extract_text(resume: UploadFile) -> str:
    content = await resume.read()
    filename = (resume.filename or "").lower()
    content_type = resume.content_type or ""

    # Check for PDF
    if content_type == "application/pdf" or filename.endswith(".pdf"):
        try:
            reader = PyPDF2.PdfReader(io.BytesIO(content))
            extracted = " ".join(page.extract_text() or "" for page in reader.pages).strip()
            if extracted:
                return extracted
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}", exc_info=True)
            return ""

    # Check for Images (PNG, JPG, JPEG, WEBP)
    if content_type.startswith("image/") or any(filename.endswith(ext) for ext in [".png", ".jpg", ".jpeg", ".webp"]):
        mime = content_type if content_type.startswith("image/") else "image/png"
        return extract_text_from_image_sync(content, mime)

    return ""
