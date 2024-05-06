import os
from flask import Flask # type: ignore
from flask_cors import CORS # type: ignore
from prisma import Prisma, register # type: ignore
from dotenv import load_dotenv # type: ignore
from routes.report import report_blueprint
from routes.chat import chat_blueprint

load_dotenv()

db = Prisma()
db.connect()
register(db)
app = Flask(__name__)
CORS(app)

@app.get('/health')
def home():
    return "Server healthy!"

app.register_blueprint(report_blueprint, url_prefix='/report')
app.register_blueprint(chat_blueprint, url_prefix='/chat')


if __name__ == "__main__":
  app.run(debug=(os.getenv('DEBUG', 'False') == 'True'), port=int(os.getenv('PORT',5000)), threaded=True)