import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import NotFoundPage from './pages/NotFoundPage'
import AppLayout from './components/AppLayout'
import Register from './pages/Register'
import MyAccount from './pages/MyAccount'
import Posts from './pages/Posts'
import { PostType, User } from './helpers/types'

const userFromLocal: User = JSON.parse(localStorage.getItem('user') || '{}')

function App() {
  const [user, setUser] = useState<User>(userFromLocal)
  const [isLoggedIn, setIsLoggedIn] = useState(Object.keys(user).length > 0)
  const [posts, setPosts] = useState([] as PostType[])

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <AppLayout
          user={user}
          setUser={setUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ),
      children: [
        {
          path: 'login',
          element: <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />,
        },
        {
          path: 'register',
          element: <Register setUser={setUser} setIsLoggedIn={setIsLoggedIn} />,
        },
        {
          path: 'myaccount',
          element: <MyAccount user={user} setUser={setUser} />,
        },
        {
          path: 'posts',
          element: <Posts posts={posts} setPosts={setPosts} />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: 'red',
              color: 'white',
            },
          },
          style: {
            fontFamily: 'Arial',
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            color: 'white',
          },
        }}
      />
    </>
  )
}

export default App
