import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil/global'
import { user, User } from '../zod'

const fetchSignInPost = async (user: User) => {
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

const SignIn = () => {
  const navigate = useNavigate()
  const [isSignIn, setIsSignIn] = useRecoilState(isSignInAtom)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: zodResolver(user),
    mode: 'onChange',
  })

  useEffect(() => {
    if (isSignIn) navigate('/')
  }, [isSignIn, navigate])

  return (
    <main className="flex justify-center pt-20">
      <form
        action=""
        className="px-4"
        onSubmit={handleSubmit(async (user: User) => {
          const ret = await fetchSignInPost(user)
          console.log(ret)
          setIsSignIn(true)
        })}
      >
        <div className="flex items-center">
          <input
            type="email"
            className="border-2 text-2xl p-2 rounded"
            placeholder="Email"
            {...register('email')}
            data-testid="input-email"
          />
          <div className="w-80">
            {errors && (
              <p data-testid="p-error-email">{errors.email?.message}</p>
            )}
          </div>
        </div>
        <div className="pt-2 flex items-center">
          <input
            type="password"
            className="border-2 text-2xl p-2 rounded"
            placeholder="Password"
            {...register('password')}
            data-testid="input-password"
          />
          <div className="w-80">
            {errors && (
              <p data-testid="p-error-password">{errors.password?.message}</p>
            )}
          </div>
        </div>
        <input
          type="submit"
          className="mt-2 text-2xl bg-blue-500 p-2 rounded disabled:bg-gray-300 w-36 disabled:cursor-default cursor-pointer"
          value="SignIn"
          disabled={!isValid}
          data-testid="input-submit"
        />
      </form>
    </main>
  )
}

export default SignIn
