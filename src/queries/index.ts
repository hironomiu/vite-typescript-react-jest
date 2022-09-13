import { User } from '../zod'

export const fetchSignInPost = async (user: User) => {
  const response = await fetch('http://127.0.0.1:4141/api/v1/auth/signin', {
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
