// src/components/pages/Home/HomePage.tsx
import React from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const HomePage: React.FC = () => {
    return (
        <div className="bg-gray-900 text-white">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Bienvenido a AI Store</h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Tu tienda inteligente con asistencia 24/7 impulsada por inteligencia artificial
                </p>
                <div className="flex gap-4 justify-center">
                    <Button variant="primary">Explorar Productos</Button>
                    <Button variant="outline">Hablar con Asistente</Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card>
                            <h3 className="text-xl font-bold mb-3 text-blue-500">
                                🤖 Asistencia 24/7
                            </h3>
                            <p className="text-gray-300">
                                Nuestro agente de IA está disponible en todo momento para ayudarte
                                con tus compras y consultas.
                            </p>
                        </Card>
                        <Card>
                            <h3 className="text-xl font-bold mb-3 text-blue-500">
                                ⚡ Compra Rápida
                            </h3>
                            <p className="text-gray-300">
                                Realiza pedidos completos mediante chat sin necesidad de navegar por
                                múltiples páginas.
                            </p>
                        </Card>
                        <Card>
                            <h3 className="text-xl font-bold mb-3 text-blue-500">
                                🎯 Soporte Inteligente
                            </h3>
                            <p className="text-gray-300">
                                Reporta problemas y consulta el estado de tus tickets de forma
                                conversacional.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona?</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    <Card>
                        <div className="flex items-start gap-4">
                            <span className="text-3xl font-bold text-blue-500">1</span>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Inicia una conversación</h3>
                                <p className="text-gray-300">
                                    Abre el chat y habla con nuestro asistente como lo harías con un
                                    vendedor real.
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-start gap-4">
                            <span className="text-3xl font-bold text-blue-500">2</span>
                            <div>
                                <h3 className="text-xl font-bold mb-2">El asistente te ayuda</h3>
                                <p className="text-gray-300">
                                    Busca productos, agrega al carrito, consulta estados de pedidos
                                    o reporta problemas.
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-start gap-4">
                            <span className="text-3xl font-bold text-blue-500">3</span>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Completa tu compra</h3>
                                <p className="text-gray-300">
                                    Realiza el checkout directamente desde el chat o navega de forma
                                    tradicional.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* CTA Final */}
            <section className="bg-blue-600 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
                    <p className="text-xl mb-8">Prueba nuestra asistente inteligente ahora mismo</p>
                    <Button variant="secondary">Abrir Chat Asistente</Button>
                </div>
            </section>
        </div>
    )
}

export default HomePage
