from fastapi import APIRouter, HTTPException
from app.core import FeedbackIn, read_store, write_store

router = APIRouter()

@router.post("/feedback")
def feedback(payload: FeedbackIn):
    """
    Analizar la decisión y devolver un reporte básico de consecuencias y sesgos.
    """
    store = read_store()
    simulations = store["simulations"].get(payload.user_id, [])
    simulation = None
    if payload.simulation_id:
        for s in simulations:
            if s.get("simulation_id") == payload.simulation_id:
                simulation = s
                break
    else:
        if simulations:
            simulation = simulations[-1]

    if not simulation:
        raise HTTPException(status_code=404, detail="simulation not found for user")

    selected = next((o for o in simulation["options"] if o["id"] == payload.selected_option_id), None)
    if not selected:
        raise HTTPException(status_code=400, detail="selected_option_id not valid for this simulation")

    biases = []
    advice = []

    if payload.selected_option_id == 1:
        biases.append("aversión_al_riesgo")
        advice.append("Considera diversificar pequeñas porciones para mejorar retorno sin comprometer liquidez total.")
    elif payload.selected_option_id == 2:
        biases.append("exceso_de_confianza")
        advice.append("Revisa horizonte temporal y tolerancia al riesgo; evita sobreexposición en un solo activo.")
    elif payload.selected_option_id == 3:
        biases.append("preferencia_por_reducción_de_pasivos")
        advice.append("Pagar deuda mejora flujo a futuro; verifica el costo de oportunidad si la tasa de inversión fuera mayor.")

    report = {
        "user_id": payload.user_id,
        "simulation_id": simulation.get("simulation_id"),
        "selected_option": selected,
        "summary": f"Se detectaron {len(biases)} sesgos potenciales.",
        "biases": biases,
        "suggestions": advice,
        "user_reasoning": payload.reasoning or ""
    }

    store["feedbacks"].setdefault(payload.user_id, []).append(report)
    write_store(store)
    return {"message": "feedback generated", "report": report}