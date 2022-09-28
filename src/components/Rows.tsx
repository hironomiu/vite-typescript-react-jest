// TODO: 型
type Props = {
  tableHeader: string[]
  rows: any
}
const Rows = (props: Props) => {
  if (props.tableHeader.length === 0) {
    return (
      <div className="items-center justify-center">
        <h1 className="text-center text-2xl pt-10">None</h1>
      </div>
    )
  }
  return (
    <div className="mt-10">
      <table className="sborder">
        <thead className="border">
          <tr className="border">
            {props.tableHeader?.map((col: string, index: number) => (
              <th
                key={index}
                className="border p-4 bg-blue-200 text-xl font-normal text-gray-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border">
          {props.rows?.map((row: any, i: number) => (
            <tr key={i} className="border">
              {props.tableHeader.map((col: any, j: number) => (
                <td
                  key={'' + i + '-' + j}
                  className="border p-2 text-xl text-gray-600"
                >
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

export default Rows
