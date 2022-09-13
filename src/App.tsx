import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Layout from './components/Layout'
import Main from './components/Main'
import SignIn from './components/SignIn'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})
const App = () => {
  return (
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  )
}

export default App
