import { render, screen, waitFor } from '@testing-library/react'
import SignIn from '../components/SignIn'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import 'cross-fetch/polyfill'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

describe('SignIn', () => {
  it('test', async () => {
    render(
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <RecoilRoot>
            <SignIn />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>
    )
    expect(screen.getByText('SignIn')).toBeInTheDocument()
    expect(screen.getByTestId('input-submit')).toBeDisabled()

    // Email
    expect(screen.getByTestId('input-email')).toHaveValue('')
    expect(screen.getByTestId('p-error-email').textContent).toBe('')
    await userEvent.type(screen.getByTestId('input-email'), 'hoge')
    expect(
      await screen.findByText('Emailを入力してください。')
    ).toBeInTheDocument()
    expect(screen.getByTestId('p-error-email').textContent).toBe(
      'Emailを入力してください。'
    )

    expect(screen.getByTestId('p-error-email')).toBeInTheDocument()
    expect(await screen.findByTestId('input-email')).toHaveValue('hoge')
    await userEvent.type(
      screen.getByTestId('input-email'),
      '{backspace}{backspace}{backspace}{backspace}'
    )
    await userEvent.type(
      screen.getByTestId('input-email'),
      'hanako@example.com'
    )
    expect(await screen.findByTestId('input-email')).toHaveValue(
      'hanako@example.com'
    )

    // Password
    expect(screen.getByTestId('input-password')).toHaveValue('')
    await userEvent.type(
      screen.getByTestId('input-password'),
      'password{enter}'
    )
    expect(await screen.findByTestId('input-password')).toHaveValue('password')

    // SignIn(submit)
    expect(screen.getByTestId('input-submit')).toBeEnabled()
  })
})
