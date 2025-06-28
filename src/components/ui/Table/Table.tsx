import React from 'react';
import styles from './Table.module.css';
import Button from '@/components/ui/Button/Button';

interface TableProps {
    button: React.ReactElement<typeof Button>;
}

export default function Table({ button }: TableProps) {
    return (
      <div className={styles.table}>
        {button}
      </div>
    );
}