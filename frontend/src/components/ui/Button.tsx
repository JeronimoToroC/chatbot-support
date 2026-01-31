import React from 'react'

interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    onClick?: () => void
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    onClick,
    className = '',
}) => {
    const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition duration-200'

    const variantStyles = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    )
}

export default Button
