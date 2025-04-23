import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TrackerContext } from '../store/tracker-context'
import TransactionForm from './TransactionForm'

describe('TransactionForm', () => {
  it('calls addTransaction when form is submitted', async () => {
    const addTransactionMock = vi.fn()

    render(
        <TrackerContext.Provider value={{ addTransaction: addTransactionMock }}>
          <TransactionForm />
        </TrackerContext.Provider>
    )

    await userEvent.type(screen.getByLabelText(/description/i), 'Groceries')
    await userEvent.type(screen.getByLabelText(/sum/i), '42.5')

    await userEvent.click(screen.getByRole('button', { name: /add transaction/i }))

    expect(addTransactionMock).toHaveBeenCalledTimes(1)
    expect(addTransactionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          description: 'Groceries',
          amount: 42.5,
          category: 'salary',
        })
    )
  })
})
