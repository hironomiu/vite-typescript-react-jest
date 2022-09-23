import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isSignInAtom } from '../recoil/global'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'

const Main = () => {
  const navigate = useNavigate()
  const isSignIn = useRecoilValue(isSignInAtom)

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
    const response = await fetch('http://127.0.0.1:4141/api/v1/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ sql: value }),
    })
    const json = await response.json()
    setTableHeader(json.header)
    setData(json.rows)
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
