import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';


describe('Button Component', () => {
    test('renders button with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });
  
    test('calls onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  
    test('applies correct variant classes', () => {
      const { rerender } = render(<Button variant="primary">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-primary');
  
      rerender(<Button variant="secondary">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  
      rerender(<Button variant="outline">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-outline');
    });
  
    test('applies correct size classes', () => {
      const { rerender } = render(<Button size="sm">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-sm');
  
      rerender(<Button size="md">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-md');
  
      rerender(<Button size="lg">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-lg');
    });
  
    test('is disabled when disabled prop is true', () => {
      render(<Button disabled>Button</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  
    test('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick} disabled>Button</Button>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  
    test('applies custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  
    test('has correct default props', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('btn-primary', 'btn-md');
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute('type', 'button');
    });
  });