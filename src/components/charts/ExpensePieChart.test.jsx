import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import ExpensePieChart from './ExpensePieChart';
import { TrackerContext } from '../../store/tracker-context.jsx';
import {setupModalRoot} from "../../test-utils/SetupModal.js";

setupModalRoot();

describe('<ExpensePieChart />', () => {
  const mockTransactions = [
    { id: '1', type: 'expense', category: 'Food', amount: 50 },
    { id: '2', type: 'expense', category: 'Transport', amount: 30 },
    { id: '3', type: 'income', category: 'Salary', amount: 1000 },
    { id: '4', type: 'expense', category: 'Entertainment', amount: 20 },
  ];

  test('renders pie chart with correct number of expense slices', () => {
    render(
        <TrackerContext.Provider value={{ transactions: mockTransactions }}>
          <ExpensePieChart />
        </TrackerContext.Provider>
    );

    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Transport')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
  });
});
