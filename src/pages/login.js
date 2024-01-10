import { useEffect, useState } from 'react';
import { Link, Button, Box, VStack, Container, Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { axiosInstance } from '@/lib/axios';
import Cookies from 'js-cookie';

export default function LoginForm() {
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

      <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Heading as="h2" size="lg" textAlign="center" mb={4}>
          
            </Heading>
            <Text textAlign="left" mb={6}>
            My-Idisii memberikan akses yang aman dan terenkripsi untuk para pengguna yang ingin menjelajahi sumber daya pembelajaran yang disediakan. Di sini, pengguna diajak untuk memasukkan informasi login mereka, memasuki lingkungan yang aman dan terkendali untuk mengakses simulasi mesin EDC dan konten pembelajaran yang kaya. Halaman login ini memainkan peran penting dalam menjaga keamanan dan privasi pengguna, menyediakan pintu gerbang untuk pengetahuan yang mendalam tentang teknologi EDC. Dengan memasuki halaman ini, pengguna dapat mulai mengeksplorasi dunia simulasi mesin EDC serta meningkatkan pemahaman mereka tentang konsep-konsep yang terkait.
            </Text>
              </Container>
            </Box>
            </Box>


      <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center', marginBottom: 'auto' }}>
        <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #222935',
              backgroundColor: '#222935', 
              borderColor: 'white',
              color: 'white',
              width: '100%', 
              boxSizing: 'border-box', 
              maxWidth: '80%', 

            }}
            placeholder="Nama"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #222935',
              backgroundColor: '#222935',
              borderColor: 'white',
              color: 'white',
              width: '100%',
              boxSizing: 'border-box',
              maxWidth: '80%',
            }}
            placeholder="Password"
          />

         
<Button type='submit' colorScheme='gray' variant='ghost' color='white' sx={{
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
          <Text textAlign="center">&copy; 2024 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
        </Container>
      </Box>
    </form>
  );
};