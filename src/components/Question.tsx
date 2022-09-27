const Question = (props: { id: number; questionMessage: string }) => {
  return (
    <div className="p-4 my-4 bg-gray-100">
      <h1 className="text-gray-600 text-3xl">Question{props.id}</h1>
      <div className="pt-4">
        <span className="text-gray-600 text-2xl">{props.questionMessage}</span>
      </div>
    </div>
  )
}

export default Question
