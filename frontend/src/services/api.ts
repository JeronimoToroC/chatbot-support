import axios, { AxiosInstance, AxiosError } from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || ''

// Instancia de axios para el backend FastAPI
export const backendApi: AxiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Instancia de axios para n8n webhooks
export const n8nApi: AxiosInstance = axios.create({
    baseURL: N8N_WEBHOOK_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptor de respuestas para backend
backendApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.error('Backend API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    },
)

// Interceptor de respuestas para n8n
n8nApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.error('n8n Webhook Error:', error.response?.data || error.message)
        return Promise.reject(error)
    },
)

// Chat con n8n a través del backend proxy
export const sendMessageToN8n = async (message: string, userId: string) => {
    try {
        const response = await backendApi.post('/api/v1/chat', {
            user_id: userId,
            message: message,
        })
        return response.data
    } catch (error) {
        console.error('Error sending message to backend:', error)
        throw error
    }
}

export default backendApi
