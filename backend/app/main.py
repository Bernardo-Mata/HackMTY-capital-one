# ...existing code...
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# importar routers
from .api.endpoints import questions, trivia, diagnostic, feedback

app = FastAPI(title="FinancIA API", version="0.1.0", description="Backend mínimo para hackathon FinancIA")

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# incluir routers (cada archivo define `router`)
app.include_router(questions.router, prefix="", tags=["questions"])
app.include_router(trivia.router, prefix="", tags=["trivia"])
app.include_router(diagnostic.router, prefix="", tags=["diagnostic"])
app.include_router(feedback.router, prefix="", tags=["feedback"])

# Health endpoint (opcional, puedes moverlo a un router si prefieres)
@app.get("/health")
def health():
    return {"status": "ok"}
# ...existing code...