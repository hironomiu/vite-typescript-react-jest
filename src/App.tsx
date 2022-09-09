import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Layout from './components/Layout'
import Main from './components/Main'
import SignIn from './components/SignIn'

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
