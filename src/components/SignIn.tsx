import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil/global'

const user = z.object({
  email: z.string().email({ message: 'Emailを入力してください。' }),
  password: z.string().min(8, { message: '8文字以上です' }),
})

type User = z.infer<typeof user>

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
        onSubmit={handleSubmit(async () => {
          setIsSignIn(true)
        })}
      >
        <div className="flex items-center">
          <input
            type="email"
            className="border-2 text-2xl p-2 rounded"
            placeholder="Email"
            {...register('email')}
          />
          <div className="w-80">{errors && <p>{errors.email?.message}</p>}</div>
        </div>
        <div className="pt-2 flex items-center">
          <input
            type="password"
            className="border-2 text-2xl p-2 rounded"
            placeholder="Password"
            {...register('password')}
          />
          <div className="w-80">
            {errors && <p>{errors.password?.message}</p>}
          </div>
        </div>
        <input
          type="submit"
          className="mt-2 text-2xl bg-blue-500 p-2 rounded disabled:bg-gray-300 w-36 disabled:cursor-default cursor-pointer"
          disabled={!isValid}
        />
      </form>
    </main>
  )
}

export default SignIn
