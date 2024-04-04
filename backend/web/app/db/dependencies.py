from typing import Optional

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.resouces.strings.db import DB_INIT_REQUIRED

Base = declarative_base()
DBSessionLocal: Optional[sessionmaker] = None
db_engine: Optional[Engine] = None


def init_db(db_url: str) -> None:
    global DBSessionLocal, db_engine

    db_engine = create_engine(db_url)

    DBSessionLocal = sessionmaker(autoflush=True, bind=db_engine)


def provide_db_session():
    if DBSessionLocal is None:
        raise ImportError(DB_INIT_REQUIRED)
    db_session = DBSessionLocal()
    try:
        yield db_session
    except:
        db_session.rollback()
        raise
    else:
        db_session.commit()
    finally:
        db_session.close()
