import { render, screen } from '@testing-library/react'
import SignIn from '../components/SignIn'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

describe('SignIn', () => {
  it('test', async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignIn />
        </RecoilRoot>
      </BrowserRouter>
    )
    expect(screen.getByText('SignIn')).toBeInTheDocument()

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
    await userEvent.type(screen.getByTestId('input-password'), 'password')
    expect(await screen.findByTestId('input-password')).toHaveValue('password')

    // SignIn

    await userEvent.click(screen.getByTestId('input-submit'))
    // TODO: 画面遷移するかどうか調べる（今時点だとしていない）
    expect(await screen.findByTestId('input-submit')).toBeInTheDocument()
    screen.debug()
  })
})
