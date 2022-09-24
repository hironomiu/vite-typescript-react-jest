import { useRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil/global'
import { GoSignOut } from 'react-icons/go'

const Header = () => {
  const [isSignIn, setIsSignIn] = useRecoilState(isSignInAtom)
  const handleClickSignOut = () => {
    setIsSignIn(false)
  }

  return (
    <header className="flex items-center justify-between px-4 h-20 bg-blue-400">
      <div>
        <h1 className="text-3xl text-white">SQL Training</h1>
      </div>
      <nav>
        <ul className="flex space-x-2">
          {isSignIn ? (
            <li
              onClick={handleClickSignOut}
              className="hover:cursor-pointer"
              data-testid="li-signout"
            >
              <GoSignOut
                className="text-4xl text-white"
                data-testid="signout-icon"
              />
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}

export default Header
