import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import IncomeExpenseLineChart from './IncomeExpenseLineChart';
import { TrackerContext } from '../../store/tracker-context.jsx';
import { setupModalRoot } from '../../test-utils/SetupModal.js';

setupModalRoot();

describe('<IncomeExpenseLineChart />', () => {
  const mockTransactions = [
    { id: '1', type: 'income', amount: 1200, date: '2025-03-01' },
    { id: '2', type: 'expense', amount: 500, date: '2025-03-05' },
    { id: '3', type: 'income', amount: 1000, date: '2025-04-10' },
    { id: '4', type: 'expense', amount: 300, date: '2025-04-20' },
  ];

  beforeEach(() => {
    render(
        <TrackerContext.Provider value={{ transactions: mockTransactions }}>
          <IncomeExpenseLineChart />
        </TrackerContext.Provider>
    );
  });

  test('renders months on x-axis', () => {
    expect(screen.getByText('Mar 2025')).toBeInTheDocument();
    expect(screen.getByText('Apr 2025')).toBeInTheDocument();
  });

  test('renders legend items for income and expense', () => {
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('Expense')).toBeInTheDocument();
  });
});

describe('<IncomeExpenseLineChart /> with no transactions', () => {
  test('shows "No data to display" when there are no transactions', () => {
    render(
        <TrackerContext.Provider value={{ transactions: [] }}>
          <IncomeExpenseLineChart />
        </TrackerContext.Provider>
    );

    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });
});
