import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './components/Login';
import NotFoundPage from './components/NotFoundPage';
import AppLayout from './components/AppLayout';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Login />
      </AppLayout>
    ),
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
