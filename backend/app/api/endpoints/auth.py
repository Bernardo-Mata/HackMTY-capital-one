from fastapi import APIRouter, Header, HTTPException, status, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
import secrets

from app.core import read_store, write_store

router = APIRouter()


class LoginIn(BaseModel):
    user_id: str
    password: Optional[str] = None  # no obligatorio en esta versión simple


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LogoutIn(BaseModel):
    token: Optional[str] = None
    user_id: Optional[str] = None


def get_user_by_token(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    """
    Extrae token del header Authorization: Bearer <token> y busca usuario en el store.
    Lanza 401 si no existe o no es válido.
    """
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authorization header missing")
    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authorization header format")
    token = parts[1]
    store = read_store()
    tokens = store.setdefault("tokens", {})
    user_id = tokens.get(token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    profile = store.get("profiles", {}).get(user_id, {"user_id": user_id})
    return {"user_id": user_id, "profile": profile, "token": token}


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn):
    """
    Login simple: proporciona user_id (y opcional password).
    Genera un token aleatorio y lo guarda en el store mapeado a user_id.
    No es seguro para producción.
    """
    token = secrets.token_urlsafe(32)
    store = read_store()
    store.setdefault("tokens", {})[token] = payload.user_id
    write_store(store)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/session")
def session(current: Dict = Depends(get_user_by_token)):
    """
    Verifica si hay sesión activa según el token en Authorization header.
    Retorna información del usuario logueado.
    """
    return {"authenticated": True, "user": current["profile"], "user_id": current["user_id"]}



@router.post("/logout")
def logout(payload: LogoutIn):
    """
    Logout sencillo sin validar el token por dependencia.
    - Si se envía 'token' en el body se elimina ese token (si existe).
    - Si se envía 'user_id' se eliminan todos los tokens asociados a ese usuario.
    - Si no se envía nada, no hace nada y retorna OK.
    """
    store = read_store()
    tokens = store.get("tokens", {}) or {}
    removed = 0

    if payload.token:
        if payload.token in tokens:
            del tokens[payload.token]
            removed = 1
    elif payload.user_id:
        keys_to_remove = [t for t, u in tokens.items() if u == payload.user_id]
        for k in keys_to_remove:
            del tokens[k]
        removed = len(keys_to_remove)

    store["tokens"] = tokens
    write_store(store)
    return {"message": "logged out", "removed_tokens": removed}
# ...existing code...