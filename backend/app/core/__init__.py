# ...existing code...
# Re-exportar cosas definidas en core/core.py para importación sencilla
from .core import (
    read_store,
    write_store,
    DiagnosticIn,
    TriviaIn,
    SimulateIn,
    FeedbackIn,
    DIAGNOSTIC_QUESTIONS,
    TRIVIA_QUESTIONS,
    TRIVIA_ANSWER_KEY,
)

__all__ = [
    "read_store",
    "write_store",
    "DiagnosticIn",
    "TriviaIn",
    "SimulateIn",
    "FeedbackIn",
    "DIAGNOSTIC_QUESTIONS",
    "TRIVIA_QUESTIONS",
    "TRIVIA_ANSWER_KEY",
]
# ...existing code...