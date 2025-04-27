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

  test('shows filters panel', () => {
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min Amount')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max Amount')).toBeInTheDocument();
  });

  test('filters transactions by type (income)', async () => {
    await userEvent.selectOptions(screen.getByDisplayValue('Type'), 'income');

    expect(screen.getByRole('list')).toHaveTextContent('Salary');
    expect(screen.getByRole('list')).not.toHaveTextContent('Groceries');
    expect(screen.getByRole('list')).not.toHaveTextContent('Movie');
  });

  test('filters transactions by category (food)', async () => {
    await userEvent.selectOptions(screen.getByDisplayValue('Category'), 'food');

    expect(screen.getByRole('list')).toHaveTextContent('Groceries');
    expect(screen.getByRole('list')).not.toHaveTextContent('Salary');
    expect(screen.getByRole('list')).not.toHaveTextContent('Movie');
  });

  test('filters transactions by min amount', async () => {
    await userEvent.type(screen.getByPlaceholderText('Min Amount'), '1000');

    expect(screen.getByRole('list')).toHaveTextContent('Salary');
    expect(screen.getByRole('list')).not.toHaveTextContent('Groceries');
    expect(screen.getByRole('list')).not.toHaveTextContent('Movie');
  });

  test('filters transactions by date range', async () => {
    await userEvent.type(screen.getByLabelText('start date'), '2025-04-01');
    await userEvent.type(screen.getByLabelText('end date'), '2025-04-30');

    expect(screen.getByRole('list')).toHaveTextContent('Salary');
    expect(screen.getByRole('list')).toHaveTextContent('Groceries');
    expect(screen.getByRole('list')).not.toHaveTextContent('Movie');
  });

  test('filters transactions by type, category, and date range together', async () => {
    await userEvent.selectOptions(screen.getByDisplayValue('Type'), 'expense');
    await userEvent.selectOptions(screen.getByDisplayValue('Category'), 'food');

    await userEvent.type(screen.getByLabelText('start date'), '2025-04-01');
    await userEvent.type(screen.getByLabelText('end date'), '2025-04-30');

    expect(screen.getByRole('list')).toHaveTextContent('Groceries');
    expect(screen.getByRole('list')).not.toHaveTextContent('Salary');
    expect(screen.getByRole('list')).not.toHaveTextContent('Movie');
  });
});
