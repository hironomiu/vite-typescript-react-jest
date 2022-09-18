import { User } from '../zod'

export const fetchSignInPost = async (user: User) => {
  console.log(import.meta.env.VITE_API_URL)
  const response = await fetch(
    import.meta.env.VITE_API_URL + '/api/v1/auth/signin',
    {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user }),
    }
  )
  return await response.json()
}
