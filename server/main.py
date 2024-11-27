from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import uvicorn
import sys
from apis.weatherApi import weatherAPI

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

class Message(BaseModel):
    text: str

app = FastAPI()

# Configure CORS
origins = ["*"]  # In production, replace with actual frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming {request.method} request to {request.url}")
    response = await call_next(request)
    logger.info(f"Returning response with status code: {response.status_code}")
    return response

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/echo")
async def echo_message(message: Message):
    logger.info(f"Received message in echo endpoint: {message.text}")
    return {"message": f"'{message.text}' sent from server"}

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


connection_manager = ConnectionManager()


@app.websocket("/ws/location")
async def websocket_endpoint(websocket: WebSocket):
    await connection_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            logging.info(f"Received data: {data}")
            await connection_manager.broadcast(f"Received location: {data}")
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)
        logging.info("WebSocket disconnected")
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        await websocket.close(code=1006)

weather = weatherAPI()
@app.get("/weather")
async def root():
    logger.info(f"Received function call from client")
    try:
        return weather.get(lat='-6.266155', lng='53.350140') # Dublin
    except Exception as e:
        logger.error("Error hitting weather endpoint")
        raise


if __name__ == "__main__":
    logger.info("Starting FastAPI server...")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
