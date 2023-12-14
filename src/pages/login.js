import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { axiosInstance } from '@/lib/axios';
import Cookies from 'js-cookie';

export default function LoginForm () {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/login', {
        name,
        password,
      });

        const data = response.data;

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        toast({
            title: 'Login Success',
            status: 'success',
            duration: 3000,
            isClosable: false,
          });
        router.push('dashboard');
      }
    } catch (error) {
        console.log(error);
        toast({
            title: 'Login Failed',
            description: 'Invalid username or password.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

