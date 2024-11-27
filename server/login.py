from pydantic import BaseModel

class Login():

    def __init__(self, api):
        self.app = api

    def handle_login(self):
        @self.app.post("/login")
        async def login_data(login: Login):
            self.logger.info(f"Received login attempt: {login.username}")
            try:
                return {"login details": f"'{login.username, login.password}' sent from server"}
            except Exception as e:
                self.logger.error(f"Error processing login: {str(e)}")
                raise

class LoginDetails(BaseModel):
    username: str
    password: str