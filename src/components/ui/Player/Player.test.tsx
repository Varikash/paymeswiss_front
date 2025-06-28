import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Player from './Player';

describe('Player Component', () => {
  test('renders player name', () => {
    render(<Player name="Alice" isRevealed={false} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  test('renders (you) for current user', () => {
    render(<Player name="Bob" isRevealed={false} isCurrentUser={true} />);
    expect(screen.getByText('(you)')).toBeInTheDocument();
  });

  test('renders empty card when vote is undefined', () => {
    const { container } = render(<Player name="Charlie" isRevealed={false} />);
    expect(container.querySelector('.emptyCard')).toBeInTheDocument();
  });

  test('renders Card when vote is present', () => {
    const { container } = render(<Player name="Dave" vote={5} isRevealed={false} />);
    // Card должен быть, а пустой рамки нет
    expect(container.querySelector('.emptyCard')).not.toBeInTheDocument();
    expect(container.querySelector('.card')).toBeInTheDocument();
  });

  test('passes correct props to Card when revealed', () => {
    const { container } = render(<Player name="Eve" vote={8} isRevealed={true} />);
    // Card должен быть, а пустой рамки нет
    expect(container.querySelector('.emptyCard')).not.toBeInTheDocument();
    expect(container.querySelector('.card')).toBeInTheDocument();
    // Проверяем, что значение карты отображается
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  test('renders player name with title attribute', () => {
    render(<Player name="Long Name User" isRevealed={false} />);
    const nameDiv = screen.getByText('Long Name User');
    expect(nameDiv).toHaveAttribute('title', 'Long Name User');
  });
});