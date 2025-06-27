import React from "react";
import styles from './Input.module.css';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    placeholder: string;
}

export default function Input({
    value,
    onChange,
    label,
    placeholder
}: InputProps) {
    return(
        <div className={styles.inputGroup}>
            <input
                type='text'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={styles.input}
                required 
            />
            <label className={styles.userLabel}>{label}</label>
        </div>
    )
}

