import arrow
from sqlalchemy import Column, Integer, String, DateTime

from app.db.dependencies import Base


class Business(Base):
    __tablename__ = "businesses"

    id = Column(Integer, primary_key=True)
    name = Column(String(256), nullable=True)
    description = Column(String(256), nullable=True)
    prompt = Column(String(1024), nullable=True)
    image_url = Column(String(1024), nullable=True)
    owner_user_id = Column(Integer, nullable=False)
    created_datetime = Column(DateTime, nullable=False, default=arrow.utcnow().datetime)
    updated_datetime = Column(
        DateTime,
        nullable=False,
        default=arrow.utcnow().datetime,
        onupdate=arrow.utcnow().datetime,
    )
    status = Column(Integer, nullable=False, default=1)


class BusinessPrompt(Base):
    __tablename__ = "business_prompts"

    id = Column(Integer, primary_key=True)
    business_id = Column(Integer, nullable=False)
    prompt_text = Column(String, nullable=False)
    created_datetime = Column(DateTime, nullable=False, default=arrow.utcnow().datetime)
    status = Column(Integer, nullable=False, default=1)
