import arrow
from sqlalchemy import Column, Integer, String, DateTime, Text

from app.db.dependencies import Base


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    category = Column(String(256), nullable=False)
    name = Column(String(256), nullable=False)
    description = Column(String(256), nullable=True)
    prompt_text = Column(Text, nullable=True)
    image_url = Column(String(1024), nullable=True)
    price = Column(Integer, nullable=True)
    business_id = Column(Integer, nullable=False)
    created_datetime = Column(DateTime, nullable=False, default=arrow.utcnow().datetime)
    status = Column(Integer, nullable=False, default=1)
    custom_id = Column(Integer, nullable=False)
