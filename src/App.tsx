import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import AppLayout from './components/AppLayout';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import PostsList from './pages/PostsList';
import { User } from './helpers/types';
import HomePage from './pages/HomePage';

const userFromLocal: User = JSON.parse(localStorage.getItem('user') || '{}');

function App() {
  const [user, setUser] = useState<User>(userFromLocal);
  const [isLoggedIn, setIsLoggedIn] = useState(Object.keys(user).length > 0);

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
          element: (
            <Login
              setUser={setUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          ),
        },
        {
          path: 'register',
          element: (
            <Register
              setUser={setUser}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          ),
        },
        {
          path: 'myaccount',
          element: (
            <MyAccount user={user} setUser={setUser} isLoggedIn={isLoggedIn} />
          ),
        },
        {
          path: 'posts',
          element: <PostsList isLoggedIn={isLoggedIn} user={user} />,
        },

        {
          path: '/',
          element: <HomePage />,
        },
      ],
      errorElement: <NotFoundPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 1500,
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: 'red',
              color: 'white',
            },
          },
          style: {
            fontFamily: 'Arial',
            fontSize: '15px',
            maxWidth: '500px',
            padding: '16px 24px',
            color: 'white',
          },
        }}
      />
    </>
  );
}

export default App;
