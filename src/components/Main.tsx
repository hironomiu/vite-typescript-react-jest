import { useEffect, useState, useCallback, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isSignInAtom } from '../recoil/global'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { fetchSQLPost, fetchHelloGet } from '../queries'
import { useMutation, useQuery } from '@tanstack/react-query'

const useQueryHello = () =>
  useQuery({ queryKey: ['hello'], queryFn: fetchHelloGet, cacheTime: 0 })

const Main = () => {
  const navigate = useNavigate()
  const isSignIn = useRecoilValue(isSignInAtom)

  const sqlPostMutation = useMutation((sql: string) => fetchSQLPost(sql))

  const { data, refetch } = useQueryHello()

  console.log(data)

  const [value, setValue] = useState('')
  const [tableHeader, setTableHeader] = useState<string[]>([])
  const [rows, setRows] = useState<string[]>([])
  const onChange = useCallback((value: any, viewUpdate: any) => {
    setValue(value)
  }, [])

  const handleClick = async (e: any) => {
    e.preventDefault()
    sqlPostMutation.mutate(value, {
      onSuccess: (json: any) => {
        if (json.isSuccess) {
          setTableHeader(json.header)
          setRows(json.rows)
        } else {
          console.log(json)
        }
      },
      onError: (json: any) => {
        console.log(json)
      },
    })
  }

  return (
    <div className="flex p-4">
      <div>
        <button onClick={() => refetch()}>refetch</button>
        <button
          onClick={handleClick}
          className="bg-blue-400 py-2 px-4 rounded mb-4"
        >
          Submit
        </button>
        <CodeMirror
          value=""
          height="300px"
          width="600px"
          extensions={[sql()]}
          onChange={onChange}
          className=" text-lg"
        />
      </div>
      <table className="mx-4 border">
        <thead className="border">
          <tr className="border">
            {tableHeader?.map((col, index) => (
              <th key={index} className="border-black p-4 bg-gray-200">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border">
          {rows?.map((row: any, i) => (
            <tr key={i} className="border">
              {tableHeader.map((col, j) => (
                <td key={'' + i + '-' + j} className="border">
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Main
