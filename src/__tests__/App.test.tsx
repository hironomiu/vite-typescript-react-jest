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
        'mock test 想定結果と同じ実行結果を取得しましょう'
      )
    ).toBeInTheDocument()

    // MEMO: 実行結果のタブに遷移（SQLは実行していないのでNoneが返る
    await app.click(screen.getByText('実行結果'))
    expect(await screen.findByText('None')).toBeInTheDocument()

    // MEMO: SignOut成功
    await app.click(screen.getByTestId('li-signout'))

    expect(await screen.findByText('SignIn')).toBeInTheDocument()
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
