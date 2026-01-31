// src/App.tsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/components/Layout/MainLayout'
import HomePage from '@/components/pages/Home/HomePage'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}

export default App
