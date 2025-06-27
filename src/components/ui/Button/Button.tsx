import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

export default function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    type = 'button',
    className = '',
}: ButtonProps) {
    const buttonClasses = `${styles.btn} ${styles[`btn-${variant}`]} ${styles[`btn-${size}`]} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClasses}
        >
            {children}
        </button>
    )
}