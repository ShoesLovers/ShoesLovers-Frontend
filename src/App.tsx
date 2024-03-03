import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import AppLayout from './components/AppLayout';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'myaccount',
        element: <MyAccount />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);
function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
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
    </QueryClientProvider>
  );
}

export default App;
