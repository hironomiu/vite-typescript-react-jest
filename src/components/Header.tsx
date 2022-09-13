import { useRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil/global'

const Header = () => {
  const [isSignIn, setIsSignIn] = useRecoilState(isSignInAtom)
  const handleClickSignOut = () => {
    setIsSignIn(false)
  }

  return (
    <header className="flex items-center justify-between px-4 h-16 bg-gray-200">
      <div>
        <h1 className="text-3xl font-bold">Header</h1>
      </div>
      <nav>
        <ul className="flex space-x-2">
          <li>hoge</li>
          <li>fuga</li>
          {isSignIn ? (
            <li
              onClick={handleClickSignOut}
              className="hover:cursor-pointer"
              data-testid="li-signout"
            >
              SignOut
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}

export default Header
