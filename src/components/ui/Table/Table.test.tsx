import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Table from './Table';
import Button from '../Button/Button';

describe('Table Component', () => {
  test('renders the button inside the table', () => {
    render(
      <Table button={<Button onClick={() => {}}>Show cards</Button>} />
    );
    expect(screen.getByRole('button', { name: 'Show cards' })).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(
      <Table button={<Button onClick={handleClick}>Show cards</Button>} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show cards' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies correct styles to the table', () => {
    render(
      <Table button={<Button onClick={() => {}}>Show cards</Button>} />
    );
    const table = screen.getByRole('button', { name: 'Show cards' }).closest('div');
    expect(table).toHaveClass('table');
  });
});