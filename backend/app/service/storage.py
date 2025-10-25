import json
from pathlib import Path
from typing import Dict, List, Optional, Any
# ---------------------------
# Config y almacenamiento simple (JSON)
# ---------------------------
APP_DIR = Path(__file__).resolve().parent
STORAGE_DIR = APP_DIR / "storage"
STORE_PATH = STORAGE_DIR / "store.json"
STORAGE_DIR.mkdir(parents=True, exist_ok=True)

# Inicializar archivo si no existe
if not STORE_PATH.exists():
    STORE_PATH.write_text(json.dumps({"profiles": {}, "trivias": {}, "simulations": {}, "feedbacks": {}}))

def read_store() -> Dict[str, Any]:
    try:
        return json.loads(STORE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {"profiles": {}, "trivias": {}, "simulations": {}, "feedbacks": {}}

def write_store(data: Dict[str, Any]) -> None:
    STORE_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
