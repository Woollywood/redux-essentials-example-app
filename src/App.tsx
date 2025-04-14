import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { Navbar } from '@/components/Navbar'
import { PostMainPage, SinglePostPage, EditPostForm } from '@/features/posts'
import { useAppSelector } from './hooks/store'
import { LoginPage } from './features/auth/LoginPage'
import { UsersList } from './features/users/UsersList'
import { UserPage } from './features/users/UserPage'
import { selectCurrentUser } from './features/users'
import { NotificationsList } from './features/notifications/NotificationsList'

import { ToastContainer } from 'react-tiny-toast'

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser)

  if (!user) {
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
                  <Route path="/users" element={<UsersList />}></Route>
                  <Route path="/users/:userId" element={<UserPage />}></Route>
                  <Route path="/notifications" element={<NotificationsList />}></Route>
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  )
}

export default App
