import AppLayout from './AppLayout';
import Login from './Login';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AppLayout>
      <Login />
    </AppLayout>
  );
}

export default App;
