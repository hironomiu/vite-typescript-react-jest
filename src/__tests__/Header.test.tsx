import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import Header from '../components/Header'
import '@testing-library/jest-dom/extend-expect'

describe('Header', () => {
  it('test', async () => {
    render(
      <RecoilRoot>
        <Header />
      </RecoilRoot>
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.queryByText('SignOut')).toBeNull()
  })
})
