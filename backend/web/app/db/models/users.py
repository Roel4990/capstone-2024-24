import arrow
from sqlalchemy import Column, Integer, String, DateTime, func

from app.db.dependencies import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String(256), nullable=True)
    email = Column(String(256), nullable=False)
    password = Column(String(256), nullable=False)
    status = Column(Integer, nullable=False, default=1)

    updated_datetime = Column(DateTime, nullable=False, default=arrow.utcnow().datetime)
    created_datetime = Column(DateTime, nullable=False, default=arrow.utcnow().datetime)
