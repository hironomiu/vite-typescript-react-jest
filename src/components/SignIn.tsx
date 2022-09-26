import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil/global'
import { user, User } from '../zod'
import { fetchSignInPost } from '../queries'
import { useMutation } from '@tanstack/react-query'

const SignIn = () => {
  const navigate = useNavigate()
  const [isSignIn, setIsSignIn] = useRecoilState(isSignInAtom)
  const signInMutation = useMutation((user: User) => fetchSignInPost(user))

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
    <main className="flex flex-col items-center justify-center pt-20">
      <form
        action=""
        className="px-4 flex items-center justify-center flex-col"
        onSubmit={handleSubmit(async (user: User) => {
          const response = signInMutation.mutate(user, {
            onSuccess: async (res: { isSuccess: boolean; message: string }) => {
              if (res.isSuccess) {
                setIsSignIn(true)
              } else {
                alert('not signed')
              }
            },
          })
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
        </div>
        <div className="h-4">
          {errors && (
            <p data-testid="p-error-email" className="text-pink-600 text-sm">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="pt-2 flex items-center">
          <input
            type="password"
            className="border-2 text-2xl p-2 rounded"
            placeholder="Password"
            {...register('password')}
            data-testid="input-password"
          />
        </div>
        <div className="h-4">
          {errors && (
            <p data-testid="p-error-password" className="text-pink-600 text-sm">
              {errors.password?.message}
            </p>
          )}
        </div>
        <input
          type="submit"
          className="mt-2 text-2xl bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 w-64 disabled:cursor-default cursor-pointer"
          value="SignIn"
          disabled={!isValid}
          data-testid="input-submit"
        />
      </form>
    </main>
  )
}

export default SignIn
