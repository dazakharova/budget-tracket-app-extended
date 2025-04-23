import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App.jsx'

describe('App component', () => {
  it('renders the correct title', () => {
    render(<App />)

    const title = screen.getByText(/budget tracker/i)
    expect(title).toBeInTheDocument()
  })
})
