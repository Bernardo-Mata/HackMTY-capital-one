from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from pydantic import BaseModel
import secrets
import json
import os
from pathlib import Path

router = APIRouter()

# Ruta al archivo de almacenamiento
STORAGE_PATH = Path(__file__).parent.parent.parent / "storage" / "store.json"

class LoginRequest(BaseModel):
    user_id: str
    password: Optional[str] = ""

class RegisterRequest(BaseModel):
    user_id: str
    password: Optional[str] = ""
    email: Optional[str] = None
    full_name: Optional[str] = None

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    message: str

class RegisterResponse(BaseModel):
    user_id: str
    access_token: str
    token_type: str = "bearer"
    message: str

def load_storage():
    """Cargar datos del archivo JSON"""
    try:
        if STORAGE_PATH.exists():
            with open(STORAGE_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {"users": {}, "sessions": {}}
    except Exception as e:
        print(f"Error loading storage: {e}")
        return {"users": {}, "sessions": {}}

def save_storage(data):
    """Guardar datos en el archivo JSON"""
    try:
        STORAGE_PATH.parent.mkdir(parents=True, exist_ok=True)
        with open(STORAGE_PATH, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving storage: {e}")
        raise HTTPException(status_code=500, detail="Error saving data")

def generate_token():
    """Generar token único"""
    return secrets.token_urlsafe(32)

@router.post("/register", response_model=RegisterResponse)
async def register(request: RegisterRequest):
    """
    Endpoint de registro de nuevos usuarios
    
    - **user_id**: Identificador único del usuario (requerido)
    - **password**: Contraseña (opcional)
    - **email**: Correo electrónico (opcional)
    - **full_name**: Nombre completo (opcional)
    
    Retorna un token de acceso para el usuario registrado
    """
    storage = load_storage()
    
    # Validar que el user_id no esté vacío
    if not request.user_id or not request.user_id.strip():
        raise HTTPException(status_code=400, detail="User ID cannot be empty")
    
    # Verificar si el usuario ya existe
    if request.user_id in storage.get("users", {}):
        raise HTTPException(status_code=409, detail="User ID already exists")
    
    # Crear nuevo usuario
    new_user = {
        "user_id": request.user_id,
        "password": request.password or "",  # En producción, hashear la contraseña
        "email": request.email,
        "full_name": request.full_name,
        "created_at": None,  # Puedes agregar datetime.now().isoformat() si importas datetime
        "diagnostic_completed": False,
        "progress": {
            "current_module": None,
            "completed_modules": [],
            "total_score": 0
        }
    }
    
    # Guardar usuario
    if "users" not in storage:
        storage["users"] = {}
    storage["users"][request.user_id] = new_user
    
    # Generar token de sesión
    token = generate_token()
    
    # Guardar sesión
    if "sessions" not in storage:
        storage["sessions"] = {}
    storage["sessions"][token] = {
        "user_id": request.user_id,
        "created_at": None  # datetime.now().isoformat()
    }
    
    # Guardar en archivo
    save_storage(storage)
    
    return RegisterResponse(
        user_id=request.user_id,
        access_token=token,
        token_type="bearer",
        message="User registered successfully"
    )

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Endpoint de login
    
    - **user_id**: Identificador del usuario
    - **password**: Contraseña (opcional por ahora)
    
    Retorna un token de acceso
    """
    storage = load_storage()
    
    # Verificar si el usuario existe
    users = storage.get("users", {})
    if request.user_id not in users:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = users[request.user_id]
    
    # Validar contraseña (si existe)
    if user.get("password") and user["password"] != request.password:
        raise HTTPException(status_code=401, detail="Invalid password")
    
    # Generar token
    token = generate_token()
    
    # Guardar sesión
    if "sessions" not in storage:
        storage["sessions"] = {}
    storage["sessions"][token] = {
        "user_id": request.user_id,
        "created_at": None
    }
    
    save_storage(storage)
    
    return LoginResponse(
        access_token=token,
        token_type="bearer",
        user_id=request.user_id,
        message="Login successful"
    )

@router.post("/logout")
async def logout(authorization: Optional[str] = Header(None)):
    """
    Endpoint de logout
    Invalida el token actual del usuario
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No token provided")
    
    token = authorization.split(" ")[1]
    
    storage = load_storage()
    
    # Eliminar sesión
    if "sessions" in storage and token in storage["sessions"]:
        del storage["sessions"][token]
        save_storage(storage)
        return {"message": "Logout successful", "status": "ok"}
    
    return {"message": "Token not found, but considered logged out", "status": "ok"}

@router.get("/me")
async def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Obtener información del usuario actual
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No token provided")
    
    token = authorization.split(" ")[1]
    storage = load_storage()
    
    # Verificar sesión
    sessions = storage.get("sessions", {})
    if token not in sessions:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user_id = sessions[token]["user_id"]
    
    # Obtener usuario
    users = storage.get("users", {})
    if user_id not in users:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = users[user_id]
    
    # No retornar la contraseña
    user_data = {k: v for k, v in user.items() if k != "password"}
    
    return user_data