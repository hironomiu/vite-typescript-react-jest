import { useEffect, Suspense } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Header from './Header'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isSignInAtom } from '../recoil/global'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isSignIn = useRecoilValue(isSignInAtom)
  console.log(location)
  useEffect(() => {
    if (!isSignIn) navigate('/signin')
  }, [isSignIn, navigate])

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <Suspense
        fallback={
          <div className="flex text-3xl justify-center items-center pt-10">
            loading...
          </div>
        }
      >
        <Outlet />
        {isSignIn && location.pathname.match('/lesson') ? (
          <div className="flex items-center justify-center mt-auto mb-8">
            <Link to="/" className="border-b border-blue-500 text-blue-500">
              Home
            </Link>
          </div>
        ) : null}
      </Suspense>
    </div>
  )
}

export default Layout
