import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Transaction from './Transaction.jsx'
import {setupModalRoot} from '../test-utils/SetupModal.js'

setupModalRoot();

describe('Transaction component', () => {
  test('renders correctly', () => {
    const testTransaction = {
      description: 'Prisma',
      type: 'expense',
      amount: 15,
      category: 'Food',
    }
    render(<Transaction data={testTransaction} />)

    expect(screen.getByText('Prisma')).toBeInTheDocument()
    expect(screen.getByText(/15/)).toBeInTheDocument()
    expect(screen.getByText('Food')).toBeInTheDocument()
  })
})