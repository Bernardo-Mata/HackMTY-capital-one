from fastapi import APIRouter, HTTPException
from app.core import DiagnosticIn, SimulateIn, read_store, write_store

router = APIRouter()

@router.post("/diagnostic")
def diagnostic(payload: DiagnosticIn):
    """Guardar perfil básico del usuario."""
    store = read_store()
    store["profiles"][payload.user_id] = payload.dict()
    write_store(store)
    return {"message": "diagnostic saved", "profile": payload.dict()}

@router.post("/simulate")
def simulate(payload: SimulateIn):
    """Generar un escenario simulado (plantilla, sin IA)."""
    store = read_store()
    profile = store["profiles"].get(payload.user_id, {})
    experience = profile.get("experience_level", "beginner")

    scenario = {
        "simulation_id": f"sim_{payload.user_id}_{len(store['simulations'].get(payload.user_id, [])) + 1}",
        "title": "Simulación: Gestión de ahorro vs inversión",
        "description": (
            "Tienes un excedente mensual y debes decidir entre mantener liquidez, "
            "invertir en renta variable o pagar parte de tu deuda."
        ),
        "options": [
            {"id": 1, "text": "Mantener la mayor parte en liquidez (baja rentabilidad, alta seguridad)"},
            {"id": 2, "text": "Invertir 30% en renta variable (riesgo moderado, posible mayor retorno)"},
            {"id": 3, "text": "Pagar deuda de alto interés (reduce pasivos, mejora flujo futuro)"}
        ],
        "meta": {"user_experience": experience}
    }

    store["simulations"].setdefault(payload.user_id, []).append(scenario)
    write_store(store)
    return {"message": "simulation generated", "scenario": scenario}