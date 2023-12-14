import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function register() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [registrationResult, setRegistrationResult] = useState(null);
    const route = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post('/register', { name, password });
      setRegistrationResult(response.data);
      route.push('/');
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationResult({ success: false, error: 'Registration Failed' });
    }
  };
    return(
        <>
        <div>
      <h1>Register</h1>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleRegister}>Register</button>

      {registrationResult && (
        <div>
          {registrationResult.success ? (
            <p>Registration successful! User: {JSON.stringify(registrationResult.user)}</p>
          ) : (
            <p>Registration failed. Error: {registrationResult.error}</p>
          )}
        </div>
      )}
    </div>
        </>
    )
}