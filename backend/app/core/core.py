# ...existing code...
from pathlib import Path
import json
from typing import Dict, Any
from pydantic import BaseModel, Field
from typing import Optional

# Almacenamiento simple (JSON)
APP_DIR = Path(__file__).resolve().parent
STORAGE_DIR = APP_DIR / "storage"
STORE_PATH = STORAGE_DIR / "store.json"
STORAGE_DIR.mkdir(parents=True, exist_ok=True)

if not STORE_PATH.exists():
    STORE_PATH.write_text(json.dumps({"profiles": {}, "trivias": {}, "simulations": {}, "feedbacks": {}}), encoding="utf-8")

def read_store() -> Dict[str, Any]:
    try:
        return json.loads(STORE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {"profiles": {}, "trivias": {}, "simulations": {}, "feedbacks": {}}

def write_store(data: Dict[str, Any]) -> None:
    STORE_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


# Modelos mínimos usados por los endpoints
class DiagnosticIn(BaseModel):
    user_id: str
    answers: Dict[str, Any] = Field(default_factory=dict)

class TriviaIn(BaseModel):
    user_id: str
    answers: Dict[str, int]

class SimulateIn(BaseModel):
    user_id: str

class FeedbackIn(BaseModel):
    user_id: str
    simulation_id: Optional[str] = None
    selected_option_id: int
    reasoning: Optional[str] = None


# Datos hardcodeados (preguntas)
DIAGNOSTIC_QUESTIONS = [
    {
        "id": "age",
        "type": "number",
        "text": "¿Cuál es tu edad?",
        "placeholder": "Ej: 30"
    },
    {
        "id": "experience_level",
        "type": "single_choice",
        "text": "¿Cuál es tu nivel de experiencia financiera?",
        "options": [
            {"id": "beginner", "text": "Principiante"},
            {"id": "intermediate", "text": "Intermedio"},
            {"id": "advanced", "text": "Avanzado"}
        ]
    },
    {
        "id": "goals",
        "type": "multi_choice",
        "text": "Selecciona tus objetivos financieros principales",
        "options": [
            {"id": "ahorro", "text": "Ahorro"},
            {"id": "inversion", "text": "Inversión"},
            {"id": "retiro", "text": "Preparar retiro"},
            {"id": "reducir_deuda", "text": "Reducir deuda"}
        ]
    }
]

TRIVIA_QUESTIONS = [
    {
        "id": "q1",
        "text": "¿Qué es la diversificación?",
        "options": [
            {"id": 1, "text": "Invertir todo en un solo activo"},
            {"id": 2, "text": "Repartir inversiones entre varios activos"},
            {"id": 3, "text": "Guardar todo el dinero en efectivo"}
        ],
        "correct_option": 2
    },
    {
        "id": "q2",
        "text": "¿Qué significa 'liquidez'?",
        "options": [
            {"id": 1, "text": "Facilidad para convertir un activo en efectivo sin pérdida significativa"},
            {"id": 2, "text": "Mayor rentabilidad siempre"},
            {"id": 3, "text": "Impuesto sobre las inversiones"}
        ],
        "correct_option": 1
    },
    {
        "id": "q3",
        "text": "¿Qué es una tasa de interés alta en una deuda?",
        "options": [
            {"id": 1, "text": "Beneficio para el deudor"},
            {"id": 2, "text": "Costo mayor por el dinero prestado"},
            {"id": 3, "text": "Significa menor riesgo"}
        ],
        "correct_option": 2
    }
]

TRIVIA_ANSWER_KEY = {q["id"]: q["correct_option"] for q in TRIVIA_QUESTIONS}
