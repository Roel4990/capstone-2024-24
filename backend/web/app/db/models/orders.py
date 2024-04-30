import arrow
from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text, UUID

from app.db.dependencies import Base


class Session(Base):
    __tablename__ = "sessions"

    id = Column(UUID, primary_key=True)
    business_id = Column(Integer, ForeignKey("businesses.id"), nullable=False)
    created_datetime = Column(DateTime, nullable=False, default=arrow.utcnow().datetime)
    status = Column(Integer, nullable=False, default=1)


class SessionQuery(Base):
    __tablename__ = "session_queries"

    id = Column(Integer, primary_key=True)
    session_id = Column(UUID, ForeignKey("sessions.id"), nullable=False)
    query = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    created_datetime = Column(DateTime, nullable=False, default=arrow.utcnow().datetime)
    status = Column(Integer, nullable=False, default=1)
