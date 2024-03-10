import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();
const clientId =
  '702891572984-74iafb6n4jrcdb6dmf6fbav8i54grct0.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
