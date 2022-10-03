import { screen, render } from '@testing-library/react'
import Lesson from '../components/Lesson'
import { BrowserRouter, Route, MemoryRouter } from 'react-router-dom'
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

    // TODO: テスト書く(ただしパスパラメータが渡っていない(undefined)状態なので要確認)
    expect(screen.getByText('想定結果')).toBeInTheDocument()
    expect(screen.getByText('実行結果')).toBeInTheDocument()
    expect(screen.getByText('回答例')).toBeInTheDocument()
  })
})
