from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, diagnostic, trivia, questions, feedback

app = FastAPI(title="FinancIA API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers - VERIFICAR QUE ESTÉ ESTA LÍNEA
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(diagnostic.router, prefix="/api/diagnostic", tags=["diagnostic"])
app.include_router(trivia.router, prefix="/api/trivia", tags=["trivia"])
app.include_router(questions.router, prefix="/api/questions", tags=["questions"])
app.include_router(feedback.router, prefix="/api/feedback", tags=["feedback"])

@app.get("/")
def read_root():
    return {"message": "FinancIA API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}