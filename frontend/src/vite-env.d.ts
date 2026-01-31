/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string
    readonly VITE_N8N_WEBHOOK_URL: string
    readonly VITE_ENVIRONMENT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
