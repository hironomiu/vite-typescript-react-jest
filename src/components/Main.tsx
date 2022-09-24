import { useState, useCallback, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { fetchSQLPost, fetchHelloGet } from '../queries'
import { useMutation, useQuery } from '@tanstack/react-query'
import Rows from './Rows'
import Question from './Question'
import { GoTriangleRight } from 'react-icons/go'

const useQueryHello = () =>
  useQuery({ queryKey: ['hello'], queryFn: fetchHelloGet, cacheTime: 0 })

const Main = () => {
  const sqlPostMutation = useMutation((sql: string) => fetchSQLPost(sql))
  const { data, refetch } = useQueryHello()

  const [tabState, setTabState] = useState(1)

  const [result, setResult] = useState(false)
  const [value, setValue] = useState('')
  const [tableHeader, setTableHeader] = useState<string[]>([])
  const [rows, setRows] = useState([])
  const onChange = useCallback((value: any, viewUpdate: any) => {
    setValue(value)
  }, [])

  const [ansTableHeader] = useState<string[]>(['id', 'nickname'])
  const [ansRows] = useState([
    { id: 1, nickname: '太郎' },
    { id: 2, nickname: '花子' },
  ])

  const expect = (answer: any, input: any): boolean => {
    if (JSON.stringify(answer) !== JSON.stringify(input)) {
      return false
    }
    return true
  }

  useEffect(() => {
    const result1 = expect(ansTableHeader, tableHeader)
    const result2 = expect(ansRows, rows)
    setResult(result1 && result2)
  }, [tableHeader, rows])

  const handleClick = async (e: any) => {
    e.preventDefault()
    sqlPostMutation.mutate(value, {
      onSuccess: (json: any) => {
        if (json.isSuccess) {
          setTableHeader(json.header)
          setRows(json.rows)
        } else {
          alert('失敗')
        }
      },
      onError: (json: any) => {
        alert('エラー')
      },
    })
  }

  return (
    <main className="flex flex-col p-4">
      <Question />

      <div className="flex justify-between items-center my-4 h-10">
        {tableHeader.length > 0 && rows.length > 0 ? (
          result ? (
            <h1 className="text-3xl font-bold">正解</h1>
          ) : (
            <h1 className="text-3xl font-bold text-red-600">不正解</h1>
          )
        ) : (
          <h1></h1>
        )}
        <button
          onClick={handleClick}
          className="bg-blue-500 py-2 px-4 rounded text-white"
        >
          <GoTriangleRight data-testid="submit-icon" />
        </button>
      </div>
      <CodeMirror
        value=""
        height="400px"
        width="100%"
        theme="dark"
        extensions={[sql()]}
        onChange={onChange}
        className="text-lg"
        onKeyDown={(event) => {
          if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            handleClick(event)
          }
        }}
      />

      <div className="bg-white my-4">
        <nav className="flex flex-col sm:flex-row">
          <button
            className={
              tabState === 1
                ? 'py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500 text-xl'
                : 'text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none'
            }
            onClick={() => setTabState(1)}
          >
            想定結果
          </button>
          <button
            className={
              tabState === 2
                ? 'py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500 text-xl'
                : 'text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none'
            }
            onClick={() => setTabState(2)}
          >
            実行結果
          </button>
          <button
            className={
              tabState === 3
                ? 'py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500 text-xl'
                : 'text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none'
            }
            onClick={() => setTabState(3)}
          >
            回答例
          </button>
        </nav>

        {tabState === 1 ? (
          <Rows tableHeader={ansTableHeader} rows={ansRows} />
        ) : null}
        {tabState === 2 ? <Rows tableHeader={tableHeader} rows={rows} /> : null}
        {tabState === 3 ? (
          <CodeMirror
            value="select id,nickname from users"
            height="400px"
            width="100%"
            theme="dark"
            readOnly={true}
            extensions={[sql()]}
            className="my-10 text-lg"
          />
        ) : null}
      </div>
    </main>
  )
}

export default Main
