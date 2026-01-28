-- Crear tabla de tickets
CREATE TABLE tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'open',
    priority VARCHAR(10) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Índices para performance
CREATE INDEX idx_tickets_user_id ON tickets(user_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_created_at ON tickets(created_at DESC);

-- Comentarios para documentación
COMMENT ON TABLE tickets IS 'Almacena tickets de soporte creados por usuarios';
COMMENT ON COLUMN tickets.status IS 'Estados: open, in_progress, resolved, closed';
COMMENT ON COLUMN tickets.priority IS 'Prioridades: low, medium, high';
COMMENT ON COLUMN tickets.metadata IS 'Datos adicionales en formato JSON';
