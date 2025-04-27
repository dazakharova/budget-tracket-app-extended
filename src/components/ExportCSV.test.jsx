import { render, screen } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import { TrackerContext } from '../store/tracker-context.jsx';
import ExportCSV from '../components/ExportCSV.jsx';
import { setupModalRoot } from "../test-utils/SetupModal.js";

setupModalRoot();

describe('<ExportCSV />', () => {
  const mockTransactions = [
    { id: '1', type: 'income', description: 'Salary', amount: 2000, category: 'salary', date: '2025-04-01' },
    { id: '2', type: 'expense', description: 'Groceries', amount: -150, category: 'food', date: '2025-04-03' },
  ];

  beforeEach(() => {
    render(
        <TrackerContext.Provider value={{ transactions: mockTransactions }}>
          <ExportCSV />
        </TrackerContext.Provider>
    );
  });

  test('renders Export button and CSVLink', () => {
    const exportButton = screen.getByRole('button', { name: /export as csv/i });
    expect(exportButton).toBeInTheDocument();

    const csvLink = screen.getByRole('link', { name: /export as csv/i });
    expect(csvLink).toHaveAttribute('download');
    expect(csvLink).toHaveAttribute('href');
  });

  test('csv link has correct file name', () => {
    const csvLink = screen.getByRole('link', { name: /export as csv/i });
    expect(csvLink).toHaveAttribute('download', 'transactions.csv');
  });
});
