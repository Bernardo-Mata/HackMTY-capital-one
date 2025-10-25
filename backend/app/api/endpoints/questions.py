from fastapi import APIRouter
from app.core import DIAGNOSTIC_QUESTIONS, TRIVIA_QUESTIONS

router = APIRouter()

@router.get("/questions/diagnostic")
def get_diagnostic_questions():
    """Devuelve preguntas de perfilamiento hardcodeadas."""
    return {"questions": DIAGNOSTIC_QUESTIONS}

@router.get("/questions/trivia")
def get_trivia_questions():
    """Devuelve preguntas de trivia hardcodeadas (sin exponer la clave correcta)."""
    public_questions = []
    for q in TRIVIA_QUESTIONS:
        q_copy = {k: v for k, v in q.items() if k != "correct_option"}
        public_questions.append(q_copy)
    return {"questions": public_questions, "total": len(public_questions)}