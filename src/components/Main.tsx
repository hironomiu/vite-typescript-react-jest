import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { lessonsAtom } from '../recoil/global'
import { useQuery } from '@tanstack/react-query'
import { fetchLessonsGet } from '../queries'

const useQueryLessons = () =>
  useQuery({ queryKey: ['lessons'], queryFn: fetchLessonsGet, cacheTime: 3000 })

const Main = () => {
  const { data } = useQueryLessons()
  const [lessons, setLessons] = useRecoilState(lessonsAtom)

  useEffect(() => {
    setLessons(data)
  }, [data])

  return (
    <main className="flex flex-col items-center justify-center text-2xl">
      <h1 className="py-10 text-3xl">Lesson Menu</h1>
      {lessons.map((lesson) => (
        <Link
          to={'/lesson/' + lesson.id}
          className="bg-blue-400 w-40 py-3 text-center rounded my-4 text-white"
          key={lesson.id}
        >
          Lesson:{lesson.id}
        </Link>
      ))}
    </main>
  )
}

export default Main
