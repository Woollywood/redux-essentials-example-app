import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from '@/components/Navbar'
import { PostMainPage, SinglePostPage, EditPostForm } from '@/features/posts'
import { useAppSelector } from './hooks/store'
import { selectCurrentUsername } from './features/auth'
import { LoginPage } from './features/auth/LoginPage'

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const username = useAppSelector(selectCurrentUsername)

  if (!username) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/posts" element={<PostMainPage />}></Route>
                  <Route path="/posts/:postId" element={<SinglePostPage />}></Route>
                  <Route path="/editPost/:postId" element={<EditPostForm />}></Route>
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
