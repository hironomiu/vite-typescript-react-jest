import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Main from '../components/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom/extend-expect'
import 'cross-fetch/polyfill'
import { setupServer } from 'msw/node'
import { handlers } from '../mock'

const server = setupServer(...handlers)
beforeAll(() => {
  server.listen()
})

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})
describe('Main', () => {
  it('test', async () => {
    render(
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <RecoilRoot>
            <Main />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>
    )

    expect(await screen.findByTestId('submit-icon')).toBeInTheDocument()
  })
})
