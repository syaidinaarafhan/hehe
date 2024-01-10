import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

<Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Heading as="h2" size="lg" textAlign="center" mb={4}>
              Hallo!
            </Heading>
            <Text textAlign="left" mb={6}>
            Di sini, anda dapat membuat akun baru dengan mengisi informasi yang diperlukan untuk memulai perjalanan pembelajaran yang menarik. Melalui halaman pendaftaran ini, anda diajak untuk memberikan detail identitas yang diperlukan, sehingga mereka dapat mengakses semua fitur dan konten edukatif yang disediakan oleh platform My-Idisii. Halaman pendaftaran adalah langkah pertama untuk menjadi bagian dari komunitas pembelajaran kami, di mana anda dapat menjelajahi simulasi mesin EDC, belajar konsep-konsep penting, dan mengembangkan pemahaman yang mendalam tentang teknologi ini.
            </Text>
              </Container>
            </Box>
            </Box>

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
      backgroundColor: '#222935', 
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
    backgroundColor: '#222935', 
    borderColor: 'white',
    color: 'white',
    width: '100%', 
    boxSizing: 'border-box', 
    maxWidth: '80%', 
  }}
/>
</form>


<Button  onClick={handleRegister} colorScheme='gray' variant='ghost' color='white' sx={{
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
    <Text textAlign="center">&copy; 2024 Syaidina Maulana. All rights reserved.</Text>
  </Container>
</Box>

  
</div>
    </>
)


}
