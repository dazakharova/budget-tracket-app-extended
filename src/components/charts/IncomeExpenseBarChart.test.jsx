import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import IncomeExpenseBarChart from './IncomeExpenseBarChart';
import { TrackerContext } from '../../store/tracker-context.jsx';
import { setupModalRoot } from '../../test-utils/SetupModal.js';

setupModalRoot();

describe('<IncomeExpenseBarChart />', () => {
  const mockTransactions = [
    { id: '1', type: 'income', amount: 1000, date: '2025-04-01' },
    { id: '2', type: 'expense', amount: 400, date: '2025-04-05' },
    { id: '3', type: 'income', amount: 800, date: '2025-05-03' },
    { id: '4', type: 'expense', amount: 200, date: '2025-05-10' },
  ];

  beforeEach(() => {
    render(
        <TrackerContext.Provider value={{ transactions: mockTransactions }}>
          <IncomeExpenseBarChart />
        </TrackerContext.Provider>
    );
  });

  test('renders bar chart with months', () => {
    expect(screen.getByText('Apr 2025')).toBeInTheDocument();
    expect(screen.getByText('May 2025')).toBeInTheDocument();
  });
});


