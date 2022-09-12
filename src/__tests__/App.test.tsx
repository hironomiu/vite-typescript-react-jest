import { render, screen } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import 'cross-fetch/polyfill'
import { setupServer } from 'msw/node'
import { handlers } from '../mock'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('App', () => {
  it('test', async () => {
    render(<App />)
    expect(screen.getByText('Header')).toBeInTheDocument()
    await userEvent.type(
      screen.getByTestId('input-email'),
      'hanako@example.com'
    )
    await userEvent.type(screen.getByTestId('input-password'), 'password')
    await userEvent.click(screen.getByTestId('input-submit'))

    expect(await screen.findByText('Main')).toBeInTheDocument()
  })
})
