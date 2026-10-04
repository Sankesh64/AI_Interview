import os
import logging
from fastapi import APIRouter, Request, HTTPException, status
from fastapi.responses import RedirectResponse
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

oauth = OAuth()
if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET:
    oauth.register(
        name="google",
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={"scope": "openid email profile"}
    )
else:
    logger.warning("Google OAuth credentials missing in environment variables.")

@router.get("/google/login")
async def google_login(request: Request):
    if "google" not in oauth._registry:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google OAuth is not configured on server"
        )
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/google/callback", name="google_callback")
async def google_callback(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
        user = token.get("userinfo")
        if not user:
            user = await oauth.google.parse_id_token(request, token)

        if not user or not user.get("sub"):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Google identity could not be verified",
            )
        
        # Store user details in session
        request.session["user"] = {
            "id": user["sub"],
            "email": user.get("email"),
            "name": user.get("name"),
            "picture": user.get("picture"),
        }
        return RedirectResponse(
            url=f"{FRONTEND_URL}/dashboard",
            status_code=status.HTTP_303_SEE_OTHER,
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Google auth callback error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google sign-in failed",
        )

@router.get("/me")
async def current_user(request: Request):
    user = request.session.get("user")
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
    return {"user": user}

@router.post("/logout")
async def logout(request: Request):
    request.session.clear()
    return {"message": "Logged out successfully"}
