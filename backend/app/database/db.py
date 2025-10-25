from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

DATABASE_URL = os.environ.get("DATABASE_URL") or "sqlite:///./financia.db"

# Para SQLite en Windows, usa check_same_thread=False
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency para endpoints
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()