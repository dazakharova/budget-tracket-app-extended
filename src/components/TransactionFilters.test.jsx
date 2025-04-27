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

  test('filters transactions by type (income)', async () => {
    await userEvent.click(screen.getByRole('button', { name: /filter transactions/i }));

    await userEvent.selectOptions(screen.getByLabelText(/type/i), 'income');
    await userEvent.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie')).not.toBeInTheDocument();
  });

  test('filters transactions by category (food)', async () => {
    await userEvent.click(screen.getByRole('button', { name: /filter transactions/i }));

    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'food');
    await userEvent.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie')).not.toBeInTheDocument();
  });

  test('filters transactions by min amount', async () => {
    await userEvent.click(screen.getByRole('button', { name: /filter transactions/i }));

    await userEvent.type(screen.getByLabelText(/min amount/i), '1000');
    await userEvent.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.queryByText('Groceries')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie')).not.toBeInTheDocument();
  });

  test('filters transactions by date range', async () => {
    await userEvent.click(screen.getByRole('button', { name: /filter transactions/i }));

    await userEvent.type(screen.getByLabelText(/from/i), '2025-04-01');
    await userEvent.type(screen.getByLabelText(/to/i), '2025-04-30');
    await userEvent.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.queryByText('Movie')).not.toBeInTheDocument();
  });

  test('filters transactions by type, category, and date range together', async () => {
    await userEvent.click(screen.getByRole('button', { name: /filter transactions/i }));

    await userEvent.selectOptions(screen.getByLabelText(/type/i), 'expense');

    await userEvent.selectOptions(screen.getByLabelText(/category/i), 'food');

    await userEvent.type(screen.getByLabelText(/from/i), '2025-04-01');
    await userEvent.type(screen.getByLabelText(/to/i), '2025-04-30');

    await userEvent.click(screen.getByRole('button', { name: /apply filters/i }));

    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
    expect(screen.queryByText('Movie')).not.toBeInTheDocument();
  });

});
