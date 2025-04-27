import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import App from './App.jsx'

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('App component', () => {
  test('renders the correct title', () => {
    render(<App />)

    const title = screen.getByText(/budget tracker/i)
    expect(title).toBeInTheDocument()
  })
})
