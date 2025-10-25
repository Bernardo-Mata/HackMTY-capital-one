from fastapi import APIRouter, HTTPException
from ...core import TriviaIn, TRIVIA_ANSWER_KEY, read_store, write_store

router = APIRouter()

@router.post("/trivia")
def trivia(payload: TriviaIn):
    """
    Evaluar trivia contra preguntas hardcodeadas y almacenar resultado.
    """
    total_questions = len(TRIVIA_ANSWER_KEY)
    correct = 0
    invalid_ids = []

    for qid, selected in payload.answers.items():
        correct_option = TRIVIA_ANSWER_KEY.get(qid)
        if correct_option is None:
            invalid_ids.append(qid)
            continue
        if selected == correct_option:
            correct += 1

    result = {
        "user_id": payload.user_id,
        "score": correct,
        "total": total_questions,
        "invalid_question_ids": invalid_ids
    }

    store = read_store()
    store["trivias"].setdefault(payload.user_id, []).append(result)
    write_store(store)
    return {"message": "trivia evaluated", "result": result}