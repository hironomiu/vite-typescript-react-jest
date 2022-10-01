import { screen, render } from '@testing-library/react'
import Question from '../components/Question'
import '@testing-library/jest-dom/extend-expect'

describe('Question', () => {
  it('test', () => {
    const id = 1
    const questionMessage = 'test1'
    render(<Question id={id} questionMessage={questionMessage} />)
    expect(screen.getByText('Question1')).toBeInTheDocument()
    expect(screen.getByText('test1')).toBeInTheDocument()
  })
  it('全角', () => {
    const id = 1
    const questionMessage = 'テスト１'
    render(<Question id={id} questionMessage={questionMessage} />)
    expect(screen.getByText('Question1')).toBeInTheDocument()
    expect(screen.getByText('テスト１')).toBeInTheDocument()
  })
})
