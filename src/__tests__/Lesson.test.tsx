import { screen, render } from '@testing-library/react'
import Lesson from '../components/Lesson'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
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

describe('Lesson', () => {
  it('test', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <QueryClientProvider client={client}>
            <Lesson />
          </QueryClientProvider>
        </RecoilRoot>
      </BrowserRouter>
    )

    // TODO: テスト書く(ただしパスパラメータが渡っていない状態なので要確認)
    expect(screen.getByText('想定結果')).toBeInTheDocument()
  })
})
