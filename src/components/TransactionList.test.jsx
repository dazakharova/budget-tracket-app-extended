import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import TransactionList from '../components/TransactionList'
import { TrackerContext } from '../store/tracker-context'
import {setupModalRoot} from "../test-utils/SetupModal.js";

setupModalRoot();

const testTransactions = [
  { id: 1, description: 'Groceries', amount: -25, category: 'food', type: 'expense' },
  { id: 2, description: 'Salary', amount: 1000, category: 'salary', type: 'income' }
]

describe('TransactionList component', () => {
  test('renders correct number of transactions', () => {
    render(
        <TrackerContext.Provider value={{ transactions: testTransactions }}>
          <TransactionList />
        </TrackerContext.Provider>
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(testTransactions.length)
  })

  test('shows empty state message when there are no transactions', () => {
    render(
        <TrackerContext.Provider value={{ transactions: [] }}>
          <TransactionList />
        </TrackerContext.Provider>
    )

    expect(screen.queryByText(/no transactions yet/i)).toBeInTheDocument()
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
