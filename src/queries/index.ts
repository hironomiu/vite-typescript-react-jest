import { User } from '../zod'
import { VITE_API_URL } from '../config'

export const fetchSignInPost = async (user: User) => {
  const response = await fetch(new URL('/api/v1/auth/signin', VITE_API_URL), {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...user }),
  })
  return await response.json()
}

export const fetchSQLPost = async (sql: string) => {
  const response = await fetch(new URL('/api/v1/hello', VITE_API_URL), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ sql: sql }),
  })
  return await response.json()
}

export const fetchHelloGet = async () => {
  const response = await fetch(new URL('/api/v1/hello', VITE_API_URL))
  return await response.json()
}

export const fetchLessonsGet = async () => {
  const response = await fetch(new URL('/api/v1/lessons', VITE_API_URL))
  return await response.json()
}
