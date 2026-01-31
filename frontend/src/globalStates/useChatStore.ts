// src/globalStates/useChatStore.ts
import { create } from 'zustand'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

interface ChatStore {
    messages: Message[]
    isOpen: boolean
    isLoading: boolean
    userId: string

    // Actions
    addMessage: (text: string, sender: 'user' | 'bot') => void
    setIsOpen: (isOpen: boolean) => void
    setIsLoading: (isLoading: boolean) => void
    clearMessages: () => void
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    isOpen: false,
    isLoading: false,
    userId: 'user_' + Math.random().toString(36).substr(2, 9),

    addMessage: (text, sender) =>
        set((state) => ({
            messages: [
                ...state.messages,
                {
                    id: Date.now().toString(),
                    text,
                    sender,
                    timestamp: new Date(),
                },
            ],
        })),

    setIsOpen: (isOpen) => set({ isOpen }),

    setIsLoading: (isLoading) => set({ isLoading }),

    clearMessages: () => set({ messages: [] }),
}))
