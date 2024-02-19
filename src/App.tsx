import AppLayout from './components/AppLayout';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  if (accessToken) {
    console.log('accessToken:', accessToken);
  }
  return (
    <AppLayout>
      <Login
        setAccessToken={setAccessToken}
        setRefreshToken={setRefreshToken}
        setUser={setUser}
      />
    </AppLayout>
  );
}

export default App;
