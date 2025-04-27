import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import TransactionList from '../components/TransactionList';
import { TrackerContext } from '../store/tracker-context.jsx';
import {setupModalRoot} from "../test-utils/SetupModal.js";

setupModalRoot()

describe('TransactionList integration', () => {
  const mockTransactions = [
    { id: '1', description: 'Salary', amount: 2000, category: 'salary', type: 'income', date: '2025-04-01' },
    { id: '2', description: 'Groceries', amount: -150, category: 'food', type: 'expense', date: '2025-04-03' },
    { id: '3', description: 'Movie', amount: -20, category: 'entertainment', type: 'expense', date: '2025-05-05' },
  ];

  beforeEach(() => {
    render(
        <TrackerContext.Provider value={{ transactions: mockTransactions }}>
          <TransactionList />
        </TrackerContext.Provider>
    );
  });

  test('shows filters panel after clicking "Filter Transactions" button', async () => {

    const filterButton = screen.getByRole('button', { name: /filter transactions/i });
    expect(filterButton).toBeInTheDocument();

    await userEvent.click(filterButton);

    expect(screen.getByText(/filter transactions/i)).toBeInTheDocument();
  });
});
