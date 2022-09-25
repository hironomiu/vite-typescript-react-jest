import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Header from '../components/Header'
import '@testing-library/jest-dom/extend-expect'

describe('Header', () => {
  it('test', async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <Header />
        </RecoilRoot>
      </BrowserRouter>
    )

    expect(screen.getByText('SQL Training')).toBeInTheDocument()
    expect(screen.queryByText('SignOut')).toBeNull()
  })
})
