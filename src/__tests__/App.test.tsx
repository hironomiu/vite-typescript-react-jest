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
  it('SignInが成功し画面遷移', async () => {
    render(<App />)
    expect(screen.getByText('SignIn')).toBeInTheDocument()
    await app.type(screen.getByTestId('input-email'), 'hanako@example.com')
    await app.type(screen.getByTestId('input-password'), 'password')

    // MEMO: SignIn成功
    await app.click(screen.getByTestId('input-submit'))

    expect(await screen.findByText('loading...')).toBeInTheDocument()

    expect(await screen.findByText('Lesson Menu')).toBeInTheDocument()
    expect(screen.getByTestId('signout-icon')).toBeInTheDocument()

    // MEMO: 画面遷移（Lesson1）
    await app.click(screen.getByText('Lesson:1'))

    expect(await screen.findByText('Question1')).toBeInTheDocument()
    expect(
      await screen.findByText(
        'mock test1 想定結果と同じ実行結果を取得しましょう'
      )
    ).toBeInTheDocument()

    await app.click(screen.getByTestId('execution-result-button'))
    expect(await screen.findByText('None')).toBeInTheDocument()

    // TODO: TypeError: textRange(...).getClientRects is not a function
    // await app.click(screen.getByTestId('example-answer-button'))
    // expect(screen.getByTestId('codemirror')).toBeInTheDocument()

    // MEMO: 画面遷移（Lesson2）
    await app.click(screen.getByText('SQL Training'))
    await app.click(screen.getByText('Lesson:2'))

    expect(await screen.findByText('Question2')).toBeInTheDocument()
    expect(
      await screen.findByText(
        'mock test2 想定結果と同じ実行結果を取得しましょう'
      )
    ).toBeInTheDocument()

    // MEMO: 実行結果のタブに遷移（SQLは実行していないのでNoneが返る
    await app.click(screen.getByText('実行結果'))
    expect(await screen.findByText('None')).toBeInTheDocument()

    // MEMO: Home Clickで遷移
    await app.click(screen.getByTestId('home-link'))
    expect(await screen.getByText('Lesson Menu')).toBeInTheDocument()
    // MEMO: SignOut成功
    await app.click(screen.getByTestId('li-signout'))

    expect(await screen.findByText('SignIn')).toBeInTheDocument()
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
  })

  it('SignInが失敗しアラート表示', async () => {
    window.alert = jest.fn()
    render(<App />)
    expect(screen.getByText('SignIn')).toBeInTheDocument()
    await app.type(screen.getByTestId('input-email'), 'hanako@example.com')
    await app.type(screen.getByTestId('input-password'), 'badpassword')

    // MEMO: SignIns失敗
    await app.click(screen.getByTestId('input-submit'))

    expect(await screen.findByText('SignIn')).toBeInTheDocument()
    // MEMO: alertを出力してるのでそれを捕捉しメッセージを突き合わせ
    expect(window.alert).toHaveBeenCalledWith('not signed')
  })
})
