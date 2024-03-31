try:
    import unzip_requirements
except ImportError:
    pass

from mangum import Mangum

from .main import app

handler = Mangum(app)
