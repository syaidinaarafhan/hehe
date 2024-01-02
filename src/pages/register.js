import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';
import regisPage from './regisPage';
import {Link, Button, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from '@chakra-ui/react'

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
        <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Register</Heading>
    </Container>
  </Box>
  <div>
     

  <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
    <form style={{ color: 'white', marginBottom: '8px', textAlign: 'center' }}>
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
    <form style={{ color: 'white', marginBottom: '8px', textAlign: 'center' }}>
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
    

<Button  onClick={handleRegister} colorScheme='gray' variant='ghost' color='gray' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        Registrasi
      </Button>

      {registrationResult && (
  <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'gray.800', borderRadius: '5px' }}>
    {registrationResult.success ? (
      <p style={{ color: 'white' }}>Registrasi Berhasil :D<br/> User: {JSON.stringify(registrationResult.user)}</p>
    ) : (
      <p style={{ color: 'red' }}>Registrasi Gagal :( <br/> Error: {registrationResult.error}</p>
    )}
  </div>
)}

  </VStack>

</Box>

      
      <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Maulana. All rights reserved.</Text>
      </Container>
    </Box>

      
    </div>
        </>
    )

    
}
