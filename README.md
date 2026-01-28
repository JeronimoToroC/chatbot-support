# Support Chatbot - AI-Powered Technical Support System

Sistema de soporte técnico automatizado con inteligencia artificial que gestiona tickets de soporte a través de chat conversacional. Los usuarios pueden reportar problemas y consultar el estado de sus tickets usando lenguaje natural, mientras el agente IA analiza la intención, ejecuta acciones en el backend y responde de forma contextual.

## 📋 Descripción del Sistema

El chatbot combina múltiples tecnologías para crear una experiencia de soporte completamente funcional:

- **Backend FastAPI**: APIs REST para gestión de tickets con validación Pydantic y persistencia en PostgreSQL
- **n8n Workflows**: Orquestación de eventos que coordina la interacción entre el usuario, el LLM y el backend
- **Groq LLM**: Inteligencia artificial con function calling para análisis de intención y toma de decisiones
- **PostgreSQL**: Base de datos relacional alojada en Supabase para almacenamiento de tickets
- **Frontend React** (próximamente): Interfaz web con chat widget integrado

## 🏗 Arquitectura

```
Usuario (Chat/API)
    ↓
n8n Webhook → Groq Function Calling → Backend FastAPI → PostgreSQL
    ↓
Respuesta Formateada
```

### Flujo de Interacción

1. Usuario envía mensaje al webhook de n8n
2. n8n consulta a Groq con function calling
3. Groq analiza intención y decide qué función invocar
4. n8n ejecuta la acción en el backend FastAPI
5. Backend persiste/consulta datos en PostgreSQL
6. n8n formatea respuesta y la devuelve al usuario

## 🚀 Quick Start

### Prerequisitos

- Python 3.11+
- Docker & Docker Compose
- PostgreSQL (Supabase account)
- Groq API Key (gratuita)
- ngrok account (tier gratuito)

### Instalación

**1. Clonar repositorio**

```bash
git clone https://github.com/JeronimoToroC/chatbot-support.git
cd chatbot-support
```

**2. Configurar Backend**

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase
```

**3. Configurar Base de Datos**

```bash
# Ejecutar el schema SQL en Supabase
# Ve a: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
# Copia y ejecuta el contenido de: database/tickets.sql
```

**4. Configurar n8n**

```bash
cd ../n8n

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu Groq API key

# Levantar n8n con Docker
docker-compose up -d

# Ver logs
docker-compose logs -f
```

**5. Importar Workflow en n8n**

1. Abrir http://localhost:5678
2. Login con credenciales de .env (admin/admin123)
3. Ir a Settings → Credentials → Add Credential
4. Crear credencial **Header Auth** llamada "Groq":
   - Name: `Authorization`
   - Value: `Bearer YOUR_GROQ_API_KEY`
5. Ir a Workflows → Import from File
6. Seleccionar `n8n/workflows/ai-support-agent-mvp.json`
7. En el nodo "Groq Function Call" seleccionar credencial "Groq"
8. Guardar y activar workflow

**6. Exponer n8n con ngrok**

```bash
# Obtener dominio fijo gratuito en: https://dashboard.ngrok.com
# Exponer n8n
ngrok http --domain=YOUR-DOMAIN.ngrok-free.dev 5678
```

**7. Levantar Backend**

```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🧪 Testing

### Verificar Backend

```bash
# Health check
curl http://localhost:8000/health

# Crear ticket
curl -X POST http://localhost:8000/api/v1/tickets \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test_user",
    "description": "No puedo acceder a mi cuenta",
    "priority": "high"
  }'

# Consultar ticket (reemplazar TICKET_ID)
curl http://localhost:8000/api/v1/tickets/TICKET_ID
```

### Verificar Chatbot

**Request al webhook de n8n:**

```bash
POST https://YOUR-DOMAIN.ngrok-free.dev/webhook/support-chat
Content-Type: application/json

{
  "user_id": "test_user_001",
  "message": "No puedo iniciar sesión en mi cuenta desde ayer, es urgente"
}
```

**Respuesta esperada:**

```json
{
  "response_message": "Ticket creado exitosamente con ID abc-123-def. Estado: open",
  "ticket_id": "abc-123-def",
  "status": "open"
}
```

### Ejemplos de Mensajes

**Crear ticket:**

- "No puedo acceder a mi cuenta desde esta mañana"
- "Tengo un error al procesar pagos"
- "Necesito ayuda con la configuración"

**Consultar ticket:**

- "¿Cuál es el estado del ticket abc-123-def?"
- "Consulta el ticket xyz-789"
- "¿Cómo va mi ticket 12345?"

## 📁 Estructura del Proyecto

```
chatbot-support/
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   │   └── tickets.py       # Endpoints HTTP de tickets
│   │   ├── __init__.py
│   │   ├── main.py              # Aplicación FastAPI principal
│   │   ├── database.py          # Configuración PostgreSQL
│   │   ├── models.py            # Schemas Pydantic
│   │   └── crud.py              # Operaciones de base de datos
│   ├── .env.example
│   └── requirements.txt
├── database/
│   └── tickets.sql              # Schema de tabla tickets
├── n8n/
│   ├── workflows/
│   │   └── ai-support-agent-mvp.json  # Workflow completo
│   ├── docker-compose.yml
│   └── .env.example
└── README.md
```

## 🔧 Tecnologías

| Capa              | Tecnología | Versión       | Propósito                             |
| ----------------- | ---------- | ------------- | ------------------------------------- |
| **Backend**       | FastAPI    | Latest        | Framework web async para APIs REST    |
| **Backend**       | Uvicorn    | Latest        | Servidor ASGI de alto rendimiento     |
| **Backend**       | SQLAlchemy | Latest        | ORM para abstracción de base de datos |
| **Backend**       | Pydantic   | Latest        | Validación de datos y schemas         |
| **Orquestación**  | n8n        | Latest        | Workflow engine visual self-hosted    |
| **IA**            | Groq       | LLaMA 3.3-70b | LLM con function calling              |
| **Base de Datos** | PostgreSQL | 15.x          | DB relacional en Supabase             |
| **Túnel**         | ngrok      | Latest        | Exposición de localhost a internet    |

## 🔐 Variables de Entorno

### Backend (.env)

```env
DATABASE_URL=postgresql://user:password@host:5432/database
APP_NAME=Support Chatbot API
APP_VERSION=1.0.0
ENVIRONMENT=development
API_V1_PREFIX=/api/v1
```

### n8n (.env)

```env
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password
WEBHOOK_URL=https://your-domain.ngrok-free.dev/
GROQ_API_KEY=your_groq_api_key
```

## 📊 Base de Datos

### Tabla: tickets

| Campo       | Tipo         | Descripción                                 |
| ----------- | ------------ | ------------------------------------------- |
| id          | UUID         | Identificador único                         |
| user_id     | VARCHAR(100) | Usuario que reporta                         |
| description | TEXT         | Descripción del problema                    |
| status      | VARCHAR(20)  | Estado: open, in_progress, resolved, closed |
| priority    | VARCHAR(10)  | Prioridad: low, medium, high                |
| created_at  | TIMESTAMPTZ  | Fecha de creación                           |
| updated_at  | TIMESTAMPTZ  | Última actualización                        |
| metadata    | JSONB        | Datos adicionales flexibles                 |

## 🤖 Function Calling

El sistema usa function calling de Groq para tomar decisiones:

### Funciones Disponibles

**create_support_ticket**

- Crea nuevo ticket cuando el usuario reporta un problema
- Parámetros: user_id, description, priority

**get_ticket_status**

- Consulta estado de ticket existente
- Parámetros: ticket_id

## 🛠 Comandos Útiles

```bash
# Backend
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000

# n8n
cd n8n
docker-compose up -d              # Levantar
docker-compose logs -f            # Ver logs
docker-compose down               # Detener
docker-compose restart            # Reiniciar

# ngrok
ngrok http --domain=YOUR-DOMAIN.ngrok-free.dev 5678

# Ver dashboard de ngrok
# http://localhost:4040
```

## 🚧 Próximas Funcionalidades

- [ ] Frontend React con chat widget
- [ ] Integración WhatsApp Business API
- [ ] Integración Twilio para voz
- [ ] Sistema de autenticación JWT
- [ ] Actualización de tickets
- [ ] Asignación de tickets a agentes
- [ ] Dashboard de analytics
- [ ] Multi-idioma

## 📝 Licencia

MIT

## 👤 Autor

Jerónimo Toro - [GitHub](https://github.com/JeronimoToroC)


## 🔗 Links Útiles

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [n8n Docs](https://docs.n8n.io/)
- [Groq API Docs](https://console.groq.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [ngrok Docs](https://ngrok.com/docs)
