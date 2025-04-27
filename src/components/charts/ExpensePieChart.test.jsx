import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import ExpensePieChart from './ExpensePieChart';
import { TrackerContext } from '../../store/tracker-context.jsx';
import { setupModalRoot } from "../../test-utils/SetupModal.js";

setupModalRoot();

describe('<ExpensePieChart />', () => {
  const mockTransactions = [
    { id: '1', type: 'expense', category: 'Food', amount: 50 },
    { id: '2', type: 'expense', category: 'Transport', amount: 30 },
    { id: '3', type: 'income', category: 'Salary', amount: 1000 },
    { id: '4', type: 'expense', category: 'Entertainment', amount: 20 },
  ];

  beforeEach(() => {
    render(
        <TrackerContext.Provider value={{ transactions: mockTransactions }}>
          <ExpensePieChart />
        </TrackerContext.Provider>
    );
  });

  test('renders pie chart with correct expense slices', () => {
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
  });

  test('does not render incomes', () => {
    expect(screen.queryByText('Salary')).not.toBeInTheDocument();
  });

  test('renders correct number of expense categories', () => {
    const categoryElements = screen.getAllByRole('listitem');
    expect(categoryElements.length).toBe(3);
  });

  test('renders correct number of expense categories', () => {
    const categoryElements = screen.getAllByRole('listitem');
    expect(categoryElements.length).toBe(3);
  });
});
