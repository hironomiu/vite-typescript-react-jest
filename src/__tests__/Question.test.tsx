import { screen, render } from '@testing-library/react'
import Question from '../components/Question'
import '@testing-library/jest-dom/extend-expect'

const id = 1
const questionMessage = 'test1'

describe('Question', () => {
  it('test', () => {
    render(<Question id={id} questionMessage={questionMessage} />)
    expect(screen.getByText('Question1')).toBeInTheDocument()
    expect(screen.getByText('test1')).toBeInTheDocument()
  })
})
