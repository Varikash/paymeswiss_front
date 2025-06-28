import React, { useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      }
  
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isOpen]);
  
    if (!isOpen) return null;
  
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }