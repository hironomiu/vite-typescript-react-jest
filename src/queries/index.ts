import { User } from '../zod'
import { VITE_API_URL } from '../config'

export const fetchSignInPost = async (user: User) => {
  console.log(VITE_API_URL)
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
