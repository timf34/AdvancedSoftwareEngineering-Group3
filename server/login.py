from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
import uvicorn
import sys

class Login():
    def __init__(self):
        pass

    def get(self, function):
        pass

if __name__ == '__main__':
    user_details = Login.get('details')