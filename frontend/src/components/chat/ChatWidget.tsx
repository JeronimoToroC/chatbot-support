// src/components/chat/ChatWidget.tsx
import React, { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/globalStates/useChatStore'
import { sendMessageToN8n } from '@/services/api'

const ChatWidget: React.FC = () => {
    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { messages, isOpen, isLoading, addMessage, setIsOpen, setIsLoading, userId } =
        useChatStore()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessage = inputValue.trim()
        setInputValue('')
        addMessage(userMessage, 'user')
        setIsLoading(true)

        try {
            const response = await sendMessageToN8n(userMessage, userId)
            addMessage(response.response_message || response.message || 'Respuesta recibida', 'bot')
        } catch (error) {
            addMessage('Error: No pude conectar con el asistente. Intenta nuevamente.', 'bot')
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-96 h-[500px] mb-4 flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 p-4 rounded-t-lg flex items-center justify-between">
                        <h3 className="text-white font-bold">Asistente AI</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 && (
                            <div className="text-gray-400 text-center text-sm">
                                ¡Hola! Soy tu asistente. ¿En qué puedo ayudarte?
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-100'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg">
                                    <span className="animate-pulse">Escribiendo...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu mensaje..."
                                disabled={isLoading}
                                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            />
                            <button
                                onClick={handleSendMessage}
                                disabled={isLoading || !inputValue.trim()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition"
            >
                💬
            </button>
        </div>
    )
}

export default ChatWidget
