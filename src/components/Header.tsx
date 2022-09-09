import React from 'react'

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 h-16 bg-gray-200">
      <div>
        <h1 className="text-3xl font-bold">Header</h1>
      </div>
      <nav>
        <ul className="flex">
          <li>hoge</li>
          <li>fuga</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
