from sqlalchemy import Column, Integer, String, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from .db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, unique=True, index=True, nullable=False)  # tu user_id string
    profile = Column(JSON, nullable=True)  # guardamos el dict de perfil

    tokens = relationship("Token", back_populates="user", cascade="all, delete-orphan")
    simulations = relationship("Simulation", back_populates="user", cascade="all, delete-orphan")
    trivias = relationship("TriviaResult", back_populates="user", cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="user", cascade="all, delete-orphan")

class Token(Base):
    __tablename__ = "tokens"
    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="tokens")

class TriviaResult(Base):
    __tablename__ = "trivia_results"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer)
    total = Column(Integer)
    details = Column(JSON)  # guardar respuestas, invalid ids...
    user = relationship("User", back_populates="trivias")

class Simulation(Base):
    __tablename__ = "simulations"
    id = Column(Integer, primary_key=True, index=True)
    simulation_id = Column(String, index=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(Text)
    options = Column(JSON)
    meta = Column(JSON)
    user = relationship("User", back_populates="simulations")

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    simulation_id = Column(String, nullable=True)
    selected_option = Column(JSON)
    summary = Column(String)
    biases = Column(JSON)
    suggestions = Column(JSON)
    reasoning = Column(Text, nullable=True)
    user = relationship("User", back_populates="feedbacks")