from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tickets
from app.database import engine
from sqlalchemy import text
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title=os.getenv('APP_NAME', 'Support Chatbot API'),
    version=os.getenv('APP_VERSION', '1.0.0'),
    description='API REST para sistema de soporte técnico con chatbot IA'
)

# CORS - Permitir acceso desde frontend y n8n
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# Router de tickets
app.include_router(tickets.router, prefix='/api/v1')

@app.get('/')
async def root():
    return {
        'message': 'Support Chatbot API',
        'version': os.getenv('APP_VERSION', '1.0.0'),
        'docs': '/docs',
        'health': '/health'
    }

@app.get('/health')
async def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text('SELECT 1'))
        return {
            'status': 'healthy',
            'database': 'connected',
            'version': os.getenv('APP_VERSION', '1.0.0')
        }
    except Exception as e:
        return {
            'status': 'unhealthy',
            'database': 'error',
            'error': str(e)
        }
