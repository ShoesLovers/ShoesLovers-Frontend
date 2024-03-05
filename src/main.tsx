<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
=======
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
>>>>>>> 62437758ee0d6344507f6998cac90d7479e6e191
);
