import { useEffect, useState } from 'react';
import { Link, Button, Box, VStack, Container, Heading, Text, Grid, GridItem, useToast} from "@chakra-ui/react";
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
        <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Login</Heading>
    </Container>
  </Box>
  <div>
     

  <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
    <form onSubmit={handleLogin} style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>
      Nama:
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #222935',
          backgroundColor: 'gray.800',
          borderColor: 'white',
          color: 'white',
          width: '100%', 
          boxSizing: 'border-box', 
          maxWidth: '80%', 
        }}
      />
    </form>
    <form onSubmit={handleLogin} style={{ color: 'gray', marginBottom: '8px', textAlign: 'center' }}>
      Password:
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #222935',
            backgroundColor: 'gray.800',
            borderColor: 'white',
            color: 'white',
            width: '100%', 
            boxSizing: 'border-box', 
            maxWidth: '80%', 
          }}
      />
    </form>
    

<Button type='submit' colorScheme='gray' variant='ghost' color='gray' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        Log-in
      </Button>
  </VStack>
</Box>

<Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>

      
    </div>
    </form>
    


  );
};

