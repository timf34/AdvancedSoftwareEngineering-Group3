from pydantic import BaseModel

class Login():

    def __init__(self, api, logger):
        self.app = api
        self.logger = logger

    def handle_login(self):
        @self.app.post("/login")
        async def login_data(login: LoginDetails):
            self.logger.info(f"Received login attempt: {login.username} {login.password}")
            try:
                if(self.database_query(login.username, login.password)):
                    return {f"login details accepted: Username:{login.username} Password:{login.password}"}
                return {f"login details incorrect: Username:{login.username} Password:{login.password}"}
            except Exception as e:
                self.logger.error(f"Error processing login: {str(e)}")
                raise
    
    def database_query(self, username, password):
        # query database
        database_user = 'Admin'
        database_pass = 'abc123'
        if database_user == username:
            if database_pass == password:
                return True
            self.logger.error(f'{str(password)} is not a correct password\nPlease try again')
            return False
        self.logger.error(f'{str(username)} is not a correct username\nPlease try again.')
        return False


class LoginDetails(BaseModel):
    username: str
    password: str