from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import uvicorn
import sys
from login import Login

class Server:
    def __init__(self):
        # Configure logging
        self.logger = self.configure_logging()

        # Initialise FastAPI app
        self.app = FastAPI()

        # Instantiate Login class
        self.login_logic = Login()

        # Configure CORS
        self.configure_cors()

        # Add middleware
        self.add_middlewares()

        # Register routes
        self.register_routes()

        # Login function
        Login.handle_login()


    def configure_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[logging.StreamHandler(sys.stdout)]
        )
        return logging.getLogger(__name__)

    def configure_cors(self):
        origins = ["*"]  # In production, replace with actual frontend URL
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def add_middlewares(self):
        @self.app.middleware("http")
        async def log_requests(request: Request, call_next):
            self.logger.info(f"Incoming {request.method} request to {request.url}")
            response = await call_next(request)
            self.logger.info(f"Returning response with status code: {response.status_code}")
            return response

    def register_routes(self):
        @self.app.get("/")
        async def root():
            self.logger.info("Root endpoint accessed")
            return {"message": "Hello World"}

        @self.app.post("/echo")
        async def echo_message(message: Message):
            self.logger.info(f"Received message in echo endpoint: {message.text}")
            try:
                return {"message": f"'{message.text}' sent from server"}
            except Exception as e:
                self.logger.error(f"Error processing message: {str(e)}")
                raise

        # @self.app.post("/login")
        # async def login_data(login: Login):
        #     self.logger.info(f"Received login attempt: {login.username}")
        #     try:
        #         return {"login details": f"'{login.username, login.password}' sent from server"}
        #     except Exception as e:
        #         self.logger.error(f"Error processing login: {str(e)}")
        #         raise

    def run(self, host="0.0.0.0", port=8000):
        self.logger.info("Starting FastAPI server...")
        uvicorn.run(self.app, host=host, port=port, log_level="debug")

class Message(BaseModel):
    text: str

if __name__ == "__main__":
    server = Server()
    server.run()