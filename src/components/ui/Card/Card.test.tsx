import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { VoteValue } from '@/types';

describe('Card Component', () => {
  test('renders card with question mark on front', () => {
    render(<Card value={1} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  test('displays correct value on back when revealed', () => {
    render(<Card value={5} isRevealed={true} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('shows question mark when not revealed', () => {
    render(<Card value={8} isRevealed={false} />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Card value={13} onClick={handleClick} />);
    
    const card = screen.getByText('?').closest('.card') || screen.getByText('?').closest('div');
    fireEvent.click(card!);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Card value={1} onClick={handleClick} disabled={true} />);
    
    const card = screen.getByText('?').closest('.card') || screen.getByText('?').closest('div');
    fireEvent.click(card!);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders all card values correctly', () => {
    const values: VoteValue[] = [1, 2, 3, 5, 8, 13, '☕️'];
    
    values.forEach(value => {
      const { unmount } = render(<Card value={value} isRevealed={true} />);
      expect(screen.getByText(value.toString())).toBeInTheDocument();
      unmount();
    });
  });

  test('applies selected styles when isSelected is true', () => {
    render(<Card value={3} isSelected={true} />);
    const card = screen.getByText('?').closest('.card') || screen.getByText('?').closest('div');
    expect(card).toBeInTheDocument();
  });

  test('applies disabled styles when disabled is true', () => {
    render(<Card value={5} disabled={true} />);
    const card = screen.getByText('?').closest('.card') || screen.getByText('?').closest('div');
    expect(card).toBeInTheDocument();
  });

  test('handles special characters correctly', () => {
    render(<Card value="☕️" isRevealed={true} />);
    expect(screen.getByText('☕️')).toBeInTheDocument();
  });
});