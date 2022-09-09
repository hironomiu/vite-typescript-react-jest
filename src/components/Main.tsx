import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isSignInAtom } from '../recoil/global'

const Main = () => {
  const navigate = useNavigate()
  const isSignIn = useRecoilValue(isSignInAtom)

  useEffect(() => {
    if (!isSignIn) navigate('/signin')
  }, [isSignIn, navigate])

  return <main>Main</main>
}

export default Main
