import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
    test('renders input with label', () => {
      render(<Input value="" onChange={() => {}} label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });
  
    test('displays the value correctly', () => {
      render(<Input value="John" onChange={() => {}} label="Name" />);
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    });
  
    test('calls onChange when typing', () => {
      const handleChange = jest.fn();
      render(<Input value="" onChange={handleChange} label="Name" />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'New value' } });
      
      expect(handleChange).toHaveBeenCalledWith('New value');
    });
  
    test('renders label text', () => {
      render(<Input value="" onChange={() => {}} label="Your name" />);
      expect(screen.getByText('Your name')).toBeInTheDocument();
    });
  
    test('has correct input attributes', () => {
      render(<Input value="" onChange={() => {}} label="Name" />);
      const input = screen.getByRole('textbox');
      
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('minLength', '3');
      expect(input).toHaveAttribute('maxLength', '15');
    });
  
    test('shows error for short value', () => {
      render(<Input value="Jo" onChange={() => {}} label="Name" />);
      expect(screen.getByText('Minimum 3 characters')).toBeInTheDocument();
    });
  
    test('does not show error for valid length', () => {
      render(<Input value="John" onChange={() => {}} label="Name" />);
      expect(screen.queryByText('Minimum 3 characters')).not.toBeInTheDocument();
    });
  
    test('does not show error for empty value', () => {
      render(<Input value="" onChange={() => {}} label="Name" />);
      expect(screen.queryByText('Minimum 3 characters')).not.toBeInTheDocument();
    });
  
    test('prevents input longer than 15 characters', () => {
      const handleChange = jest.fn();
      render(<Input value="123456789012345" onChange={handleChange} label="Name" />);
      
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '1234567890123456' } });
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });