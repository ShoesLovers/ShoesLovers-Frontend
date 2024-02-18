import AppLayout from './components/AppLayout';
import Login from './components/Login';
// import { useState } from 'react';

function App() {
  // const [user, setUser] = useState(null);

  return (
    <AppLayout>
      <Login />
    </AppLayout>
  );
}

export default App;
