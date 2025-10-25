# FinancIA — Documentación rápida (para el equipo frontend)

Resumen breve
- FinancIA es una API ligera en FastAPI que soporta:
  - Preguntas de diagnóstico (perfil del usuario).
  - Trivia (evaluación de conocimientos).
  - Generación simple de simulaciones.
  - Feedback sobre decisiones en simulaciones.
- Esta guía explica qué hace el backend, cómo probarlo desde Swagger y cómo debe enviar el frontend la información.

Estructura principal (resumida)
- backend/app/main.py — punto de entrada de la API (FastAPI).
- backend/app/api/endpoints/ — routers por funcionalidad:
  - questions.py — GET preguntas diagnósticas y trivia (sin claves).
  - trivia.py — POST para evaluar respuestas de trivia.
  - diagnostic.py — POST para guardar diagnóstico y POST para generar simulación.
  - feedback.py — POST para generar feedback sobre una simulación.
- backend/app/core/ — lógica y modelos (core/core.py) y re-export en core/__init__.py.
- backend/app/storage/ y backend/storage/ — almacenamiento local JSON (ya añadido al .gitignore para no versionarlo).

Cómo ejecutar el backend (Windows)
1. Abrir PowerShell o CMD.
2. Ir a la carpeta `backend`:
   cd c:\bernardo\FreeLance\HackathonTEC\FinancIA\backend
3. (Opcional) Activar el virtualenv si lo tienen:
   - PowerShell: .\.venv\Scripts\Activate.ps1
   - CMD: .\.venv\Scripts\activate.bat
4. Ejecutar:
   uvicorn app.main:app --reload --port 8000
5. Abrir la documentación interactiva (Swagger UI):
   http://127.0.0.1:8000/docs

Notas importantes
- Ejecutar uvicorn desde la carpeta `backend` es necesario para que el paquete `app` se importe correctamente.
- Todas las rutas usan JSON; enviar header `Content-Type: application/json`.
- CORS: si el frontend corre en otro origen, agregar ese origen en `main.py` (lista `origins`).

EndPoints principales (ejemplos claros para frontend)

GET /questions/diagnostic
- Descripción: Obtener preguntas de diagnóstico (perfil).
- Body: ninguno.
- Respuesta: { "questions": [ ... ] }

GET /questions/trivia
- Descripción: Obtener preguntas de trivia (sin la clave correcta).
- Body: ninguno.
- Respuesta: { "questions": [ ... ], "total": N }

POST /diagnostic
- Descripción: Guardar perfil/diagnóstico del usuario.
- Body ejemplo:
  {
    "user_id": "user123",
    "answers": {
      "age": 30,
      "experience_level": "beginner",
      "goals": ["ahorro", "inversion"]
    }
  }

POST /trivia
- Descripción: Enviar respuestas de trivia para evaluar.
- Body ejemplo:
  {
    "user_id": "user123",
    "answers": { "q1": 2, "q2": 1, "q3": 2 }
  }
- Respuesta: incluye score y lista de preguntas inválidas si las hay.

POST /simulate
- Descripción: Generar una simulación simple para el usuario (plantilla).
- Body ejemplo:
  { "user_id": "user123" }
- Respuesta: escenario con `simulation_id` y `options`.

POST /feedback
- Descripción: Pedir retroalimentación sobre la opción elegida en una simulación.
- Body ejemplo:
  {
    "user_id": "user123",
    "simulation_id": "sim_user123_1",    // opcional: si no se envía se usa la última
    "selected_option_id": 2,
    "reasoning": "Quiero mayor retorno"
  }
- Respuesta: reporte con sesgos detectados y sugerencias.

Cómo llamar desde el frontend (fetch / axios)
- Ejemplo fetch:
  const res = await fetch("http://127.0.0.1:8000/trivia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: "u1", answers: { q1: 2 } })
  });
  const json = await res.json();

Errores comunes y soluciones rápidas
- 422 Unprocessable Entity: JSON no coincide con el esquema esperado (revisar body).
- CORS blocked: agregar dominio del frontend en `main.py` -> origins.
- ImportError al iniciar uvicorn: asegúrate de ejecutar desde `backend` para que `app` sea importable.

Control de versiones / archivos a ignorar
- El repo ya incluye un `.gitignore` en la raíz con reglas para:
  - node_modules, carpetas de build del frontend.
  - entornos virtuales (venv/.venv).
  - archivos generados: `backend/app/storage/`, `backend/storage/`, `store.json`.
- No subir datos de almacenamiento ni dependencias locales.

Cómo contribuir rápido (añadir endpoint)
1. Crear archivo nuevo en `backend/app/api/endpoints/` con `router = APIRouter()`.
2. Definir rutas con @router.get/post/...
3. Importar el router en `backend/app/main.py` usando:
   from .api.endpoints import myfile
   app.include_router(myfile.router, prefix="", tags=["mi-tag"])
4. Probar en /docs.

Contacto y ayuda
- Si algo falla al iniciar uvicorn pega el traceback completo en el canal y se revisa.
- Puedo crear snippets de fetch/axios para cada endpoint si los necesitan listos para pegar.

Fin
- Esta documentación es suficiente para que el frontend consuma la API y colabore con el backend. Para dudas puntuales o para proporcionar snippets concretos de frontend, indicar framework (React / Vue / Svelte) y genero los ejemplos.