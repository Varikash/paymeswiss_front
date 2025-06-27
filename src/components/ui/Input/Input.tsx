import React from "react";
import styles from './Input.module.css';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
}

export default function Input({
    value,
    onChange,
    label,
}: InputProps) {

    const isValid = value.length >= 3 && value.length <= 15;
    const showError = value.length > 0 && !isValid;

    return(
        <div className={styles.inputGroup}>
            <input
                id='username-input'
                type='text'
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.length <= 15) {
                      onChange(newValue);
                    }
                  }}
                className={styles.input}
                minLength={3}
                maxLength={15}
                required 
            />
            <label htmlFor='username-input' className={styles.userLabel}>{label}</label>
            {showError && (
                <div className={styles.errorMessage}>
                    Minimum 3 characters
                </div>
             )}
        </div>
    )
}

