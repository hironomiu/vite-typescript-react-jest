import {
  useState,
  useCallback,
  useEffect,
  MouseEvent,
  KeyboardEvent,
} from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { fetchSQLPost } from '../queries'
import { useMutation } from '@tanstack/react-query'
import Rows from './Rows'
import Question from './Question'
import { GoTriangleRight } from 'react-icons/go'
import { useParams } from 'react-router-dom'
import { lessonsSelectorFamily } from '../recoil/global'
import { useRecoilValue } from 'recoil'
import { LessonType } from '../types'
import { isSignInAtom } from '../recoil/global'
import { useNavigate } from 'react-router-dom'

const Lesson = () => {
  const sqlPostMutation = useMutation((sql: string) => fetchSQLPost(sql))
  const navigate = useNavigate()
  const params = useParams()
  const isSignIn = useRecoilValue(isSignInAtom)
  const lesson = useRecoilValue<LessonType | undefined>(
    lessonsSelectorFamily(Number(params.id))
  )

  const [tabState, setTabState] = useState(1)
  const [result, setResult] = useState(false)
  const [value, setValue] = useState('')
  const [tableHeader, setTableHeader] = useState<string[]>([])
  const [rows, setRows] = useState([])

  const onChange = useCallback((value: any, viewUpdate: any) => {
    setValue(value)
  }, [])

  const expect = (answer: any, input: any): boolean => {
    if (JSON.stringify(answer) !== JSON.stringify(input)) {
      return false
    }
    return true
  }

  useEffect(() => {
    if (!isSignIn) navigate('/signin')
  }, [navigate, isSignIn])

  useEffect(() => {
    const result1 = expect(lesson?.ansTableHeader, tableHeader)
    const result2 = expect(lesson?.ansRows, rows)
    setResult(result1 && result2)
  }, [tableHeader, rows])

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLDivElement>
  ) => {
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
      {typeof lesson !== 'undefined' ? (
        <Question id={lesson.id} questionMessage={lesson.questionMessage} />
      ) : null}

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
          <Rows tableHeader={lesson?.ansTableHeader} rows={lesson?.ansRows} />
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

export default Lesson
