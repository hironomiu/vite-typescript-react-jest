import { render, screen } from '@testing-library/react'
import Rows from '../components/Rows'
import '@testing-library/jest-dom/extend-expect'

describe('Rows', () => {
  it('test', () => {
    render(
      <Rows
        tableHeader={['id', 'nickname']}
        rows={[
          { id: 1, nickname: '太郎' },
          { id: 2, nickname: '花子' },
        ]}
      />
    )

    expect(screen.getByTestId('th-id')).toBeInTheDocument()
    expect(screen.getByTestId('th-nickname')).toBeInTheDocument()
    expect(screen.getByTestId('td-id-0-0')).toBeInTheDocument()
    expect(screen.getByTestId('td-nickname-0-1')).toBeInTheDocument()
    expect(screen.getByTestId('td-id-1-0')).toBeInTheDocument()
    expect(screen.getByTestId('td-nickname-1-1')).toBeInTheDocument()
    // MEMO: 上のdata-testidの中身のテスト
    expect(screen.getByTestId('th-id').textContent).toBe('id')
    expect(screen.getByTestId('th-nickname').textContent).toBe('nickname')
    expect(screen.getByTestId('td-id-0-0').textContent).toBe('1')
    expect(screen.getByTestId('td-nickname-0-1').textContent).toBe('太郎')
    expect(screen.getByTestId('td-id-1-0').textContent).toBe('2')
    expect(screen.getByTestId('td-nickname-1-1').textContent).toBe('花子')
  })
})
