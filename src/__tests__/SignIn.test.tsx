import { render, screen } from '@testing-library/react'
import SignIn from '../components/SignIn'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import '@testing-library/jest-dom/extend-expect'

describe('SignIn', () => {
  it('test', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignIn />
        </RecoilRoot>
      </BrowserRouter>
    )
    expect(screen.getByText('SignIn')).toBeInTheDocument()
  })
})
