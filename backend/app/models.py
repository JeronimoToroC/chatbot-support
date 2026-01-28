from pydantic import BaseModel, Field, ConfigDict, condecimal
from typing import Optional
from datetime import datetime
from uuid import UUID
from decimal import Decimal

# ============ TICKET SCHEMAS ============
# Request models (lo que recibe la API)
class TicketCreate(BaseModel):
    user_id: str = Field(..., min_length=3, max_length=100, description="Identificador del usuario")
    description: str = Field(..., min_length=10, max_length=500, description="Descripción del problema")
    priority: Optional[str] = Field(default="medium", pattern="^(low|medium|high)$")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "user_id": "user@example.com",
                "description": "No puedo acceder a mi cuenta desde esta mañana",
                "priority": "high"
            }
        }
    )

# Response models (lo que devuelve la API)
class TicketResponse(BaseModel):
    id: UUID
    user_id: str
    description: str
    status: str
    priority: str
    created_at: datetime
    updated_at: datetime
    metadata: Optional[dict] = None

    model_config = ConfigDict(from_attributes=True)

class TicketCreateResponse(BaseModel):
    ticket_id: UUID
    status: str
    message: str

# Health check
class HealthResponse(BaseModel):
    status: str
    version: str
    database: str