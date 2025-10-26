from fastapi import APIRouter, Header, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
import secrets

from app.core import read_store, write_store

router = APIRouter()


class LoginIn(BaseModel):
    user_id: str
    password: Optional[str] = None  # opcional


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LogoutIn(BaseModel):
    token: Optional[str] = None
    user_id: Optional[str] = None


def validate_bearer(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    """
    Valida header Authorization: Bearer <token> contra store.json.
    Lanza 401 si falta o es inválido.
    """
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization header missing")
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header format")
    token = parts[1]
    store = read_store()
    user_id = store.get("tokens", {}).get(token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    profile = store.get("profiles", {}).get(user_id, {"user_id": user_id})
    return {"user_id": user_id, "profile": profile, "token": token}


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn):
    """
    Genera token simple y lo guarda en store.json (token -> user_id).
    """
    token = secrets.token_urlsafe(32)
    store = read_store()
    store.setdefault("tokens", {})[token] = payload.user_id
    store.setdefault("profiles", {}).setdefault(payload.user_id, {"user_id": payload.user_id})
    write_store(store)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/session")
def session(current: Dict = Depends(validate_bearer)):
    """
    Devuelve info del usuario autenticado según el token del header.
    """
    return {"authenticated": True, "user": current["profile"], "user_id": current["user_id"]}


@router.post("/logout")
def logout(payload: Optional[LogoutIn] = None, authorization: Optional[str] = Header(None)):
    """
    Logout simple:
     - Si hay Authorization header elimina ese token.
     - Si se envía body { token } elimina ese token.
     - Si se envía body { user_id } elimina todos los tokens de ese usuario.
    """
    store = read_store()
    tokens = store.get("tokens", {}) or {}
    removed = 0

    # eliminar token desde header si viene
    if authorization:
        parts = authorization.split()
        if len(parts) == 2 and parts[0].lower() == "bearer":
            t = parts[1]
            if t in tokens:
                del tokens[t]
                removed = 1

    # si se pasó payload en body, procesarlo (anula header behavior si aplica)
    if payload:
        if payload.token:
            if payload.token in tokens:
                del tokens[payload.token]
                removed = max(removed, 1)
        elif payload.user_id:
            keys_to_remove = [t for t, u in tokens.items() if u == payload.user_id]
            for k in keys_to_remove:
                del tokens[k]
            removed = max(removed, len(keys_to_remove))

    store["tokens"] = tokens
    write_store(store)
    return {"message": "logged out", "removed_tokens": removed}