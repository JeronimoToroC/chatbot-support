from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID
from app import models, crud
from app.database import get_db

router = APIRouter(
    prefix="/tickets",
    tags=["tickets"]
)

@router.post(
    "/",
    response_model=models.TicketCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Crear nuevo ticket",
    description="Crea un ticket de soporte con la descripción del problema del usuario"
)
def create_ticket(
    ticket: models.TicketCreate,
    db: Session = Depends(get_db)
):
    try:
        result = crud.create_ticket(
            db=db,
            user_id=ticket.user_id,
            description=ticket.description,
            priority=ticket.priority
        )
        return models.TicketCreateResponse(
            ticket_id=result["id"],
            status=result["status"],
            message="Ticket creado exitosamente"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al crear ticket: {str(e)}"
        )

@router.get(
    "/{ticket_id}",
    response_model=models.TicketResponse,
    summary="Obtener ticket por ID",
    description="Devuelve la información completa de un ticket existente"
)
def get_ticket(
    ticket_id: UUID,
    db: Session = Depends(get_db)
):
    ticket = crud.get_ticket_by_id(db=db, ticket_id=ticket_id)
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ticket {ticket_id} no encontrado"
        )
    return models.TicketResponse(**ticket)