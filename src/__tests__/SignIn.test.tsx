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
    await userEvent.type(screen.getByTestId('input-email'), 'hoge')
    expect(await screen.findByTestId('input-email')).toHaveValue('hoge')
  })
})
