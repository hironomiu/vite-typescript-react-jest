import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Main from '../components/Main'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom/extend-expect'

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
  it('test', () => {
    render(
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <RecoilRoot>
            <Main />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>
    )

    expect(screen.getByText('Submit')).toBeInTheDocument()
  })
})
