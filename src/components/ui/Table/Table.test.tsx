import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

describe('Table', () => {
  const mockOnStartTimer = jest.fn();

  beforeEach(() => {
    mockOnStartTimer.mockClear();
  });

  it('renders button and children when timer is not active', () => {
    render(
      <Table
        button={<button>Start Timer</button>}
        isTimerActive={false}
        remainingTime={0}
        timerProgress={0}
        onStartTimer={mockOnStartTimer}
        isHost={true}
      >
        <p>Table content</p>
      </Table>
    );

    expect(screen.getByText('Start Timer')).toBeInTheDocument();
    expect(screen.getByText('Table content')).toBeInTheDocument();
  });

  it('renders timer when timer is active', () => {
    render(
      <Table
        button={<button>Start Timer</button>}
        isTimerActive={true}
        remainingTime={45}
        timerProgress={0}
        onStartTimer={mockOnStartTimer}
        isHost={true}
      />
    );

    expect(screen.getByText('0:45')).toBeInTheDocument();
    expect(screen.queryByText('Start Timer')).not.toBeInTheDocument();
  });

  it('formats time correctly', () => {
    render(
      <Table
        button={<button>Start Timer</button>}
        isTimerActive={true}
        remainingTime={65}
        timerProgress={0}
        onStartTimer={mockOnStartTimer}
        isHost={true}
      />
    );

    expect(screen.getByText('1:05')).toBeInTheDocument();
  });

  it('formats time with leading zero for seconds', () => {
    render(
      <Table
        button={<button>Start Timer</button>}
        isTimerActive={true}
        remainingTime={61}
        timerProgress={0}
        onStartTimer={mockOnStartTimer}
        isHost={true}
      />
    );

    expect(screen.getByText('1:01')).toBeInTheDocument();
  });

  it('shows progress bar when timer is active', () => {
    render(
      <Table
        button={<button>Start Timer</button>}
        isTimerActive={true}
        remainingTime={30}
        timerProgress={33.33}
        onStartTimer={mockOnStartTimer}
        isHost={true}
      />
    );

    const progressBar = screen.getByRole('progressbar') || document.querySelector('.progressBar');
    expect(progressBar).toBeInTheDocument();
  });

  it('does not show button or children when timer is active', () => {
    render(
      <Table
        button={<button>Start Timer</button>}
        isTimerActive={true}
        remainingTime={45}
        timerProgress={0}
        onStartTimer={mockOnStartTimer}
        isHost={true}
      >
        <p>Table content</p>
      </Table>
    );

    expect(screen.queryByText('Start Timer')).not.toBeInTheDocument();
    expect(screen.queryByText('Table content')).not.toBeInTheDocument();
  });

  it('handles zero remaining time', () => {
    render(
      <Table
        button={<button>Start Timer</button>}
        isTimerActive={true}
        remainingTime={0}
        timerProgress={100}
        onStartTimer={mockOnStartTimer}
        isHost={true}
      />
    );

    expect(screen.getByText('0:00')).toBeInTheDocument();
  });
});