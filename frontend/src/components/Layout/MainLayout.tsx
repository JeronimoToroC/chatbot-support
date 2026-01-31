// src/components/layout/MainLayout.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import ChatWidget from '@/components/chat/ChatWidget'

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const handleProductsClick = (e: React.MouseEvent) => {
        e.preventDefault()
        alert('Página de productos próximamente')
    }

    const handleCartClick = (e: React.MouseEvent) => {
        e.preventDefault()
        alert('Carrito de compras próximamente')
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navbar - Sticky */}
            <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition"
                        >
                            AI Store
                        </Link>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-6">
                            <Link to="/" className="text-gray-300 hover:text-white transition">
                                Home
                            </Link>
                            <a
                                href="#"
                                onClick={handleProductsClick}
                                className="text-gray-300 hover:text-white transition cursor-pointer"
                            >
                                Productos
                            </a>
                            <a
                                href="#"
                                onClick={handleCartClick}
                                className="text-gray-300 hover:text-white transition cursor-pointer"
                            >
                                Carrito
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-gray-400 text-sm">
                        © 2026 AI Store - Sistema de automatización con inteligencia artificial
                    </p>
                </div>
            </footer>

            {/* Chat Widget */}
            <ChatWidget />
        </div>
    )
}

export default MainLayout
