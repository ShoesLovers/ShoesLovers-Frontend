interface LoginProps {
  email: string;
  password: string;
}
export default async function LoginAPI({ email, password }: LoginProps) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  return data;
}
