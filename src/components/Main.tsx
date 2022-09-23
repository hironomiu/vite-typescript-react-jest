import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isSignInAtom } from '../recoil/global'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import { fetchSQLPost } from '../queries'
import { useMutation } from '@tanstack/react-query'
const Main = () => {
  const navigate = useNavigate()
  const isSignIn = useRecoilValue(isSignInAtom)

  const sqlPostMutation = useMutation((sql: string) => fetchSQLPost(sql))

  useEffect(() => {
    if (!isSignIn) navigate('/signin')
  }, [isSignIn, navigate])

  const [value, setValue] = useState('')
  const [tableHeader, setTableHeader] = useState<string[]>([])
  const [data, setData] = useState<string[]>([])
  const onChange = useCallback((value: any, viewUpdate: any) => {
    setValue(value)
  }, [])

  const handleClick = async () => {
    sqlPostMutation.mutate(value, {
      onSuccess: (json: any) => {
        if (json.isSuccess) {
          setTableHeader(json.header)
          setData(json.rows)
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
          {data?.map((row: any, i) => (
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
