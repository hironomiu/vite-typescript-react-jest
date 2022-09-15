import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Main from '../components/Main'
import '@testing-library/jest-dom/extend-expect'

describe('Main', () => {
  it('test', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <Main />
        </RecoilRoot>
      </BrowserRouter>
    )

    expect(screen.getByText('Main')).toBeInTheDocument()
  })
})
