import { useEffect, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isSignInAtom } from '../recoil/global'

const Layout = () => {
  const navigate = useNavigate()
  const isSignIn = useRecoilValue(isSignInAtom)
  useEffect(() => {
    if (!isSignIn) navigate('/signin')
  }, [isSignIn, navigate])

  return (
    <>
      <Header />
      <Suspense fallback={<div className=" items-center">loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default Layout
