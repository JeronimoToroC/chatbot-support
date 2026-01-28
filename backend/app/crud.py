from sqlalchemy.orm import Session
from sqlalchemy import text
from uuid import UUID
from typing import Optional
from decimal import Decimal
import json

# ============ TICKET CRUD OPERATIONS ============
def create_ticket(
    db: Session,
    user_id: str,
    description: str,
    priority: str = "medium"
) -> dict:
    """Crea un nuevo ticket en la base de datos"""
    query = text("""
        INSERT INTO tickets (user_id, description, priority, status)
        VALUES (:user_id, :description, :priority, 'open')
        RETURNING id, user_id, description, status, priority, created_at, updated_at, metadata
    """)
    
    result = db.execute(
        query,
        {
            "user_id": user_id,
            "description": description,
            "priority": priority
        }
    )
    db.commit()
    
    row = result.fetchone()
    return {
        "id": row[0],
        "user_id": row[1],
        "description": row[2],
        "status": row[3],
        "priority": row[4],
        "created_at": row[5],
        "updated_at": row[6],
        "metadata": row[7] or {}
    }

def get_ticket_by_id(db: Session, ticket_id: UUID) -> Optional[dict]:
    """Obtiene un ticket por su ID"""
    query = text("""
        SELECT id, user_id, description, status, priority, created_at, updated_at, metadata
        FROM tickets
        WHERE id = :ticket_id
    """)
    
    result = db.execute(query, {"ticket_id": str(ticket_id)})
    row = result.fetchone()
    
    if not row:
        return None
    
    return {
        "id": row[0],
        "user_id": row[1],
        "description": row[2],
        "status": row[3],
        "priority": row[4],
        "created_at": row[5],
        "updated_at": row[6],
        "metadata": row[7] or {}
    }