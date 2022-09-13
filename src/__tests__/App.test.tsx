import { render, screen } from '@testing-library/react'
import App from '../App'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import 'cross-fetch/polyfill'
import { setupServer } from 'msw/node'
import { handlers } from '../mock'

const server = setupServer(...handlers)
const app = userEvent.setup()
beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  app.clear
})

afterAll(() => {
  server.close()
})

describe('App', () => {
  it('test', async () => {
    render(<App />)
    expect(screen.getByText('SignIn')).toBeInTheDocument()
    await app.type(screen.getByTestId('input-email'), 'hanako@example.com')
    await app.type(screen.getByTestId('input-password'), 'password')
    await app.click(screen.getByTestId('input-submit'))

    expect(await screen.findByText('Main')).toBeInTheDocument()

    await app.click(screen.getByTestId('li-signout'))

    expect(await screen.findByText('SignIn')).toBeInTheDocument()
  })
})
