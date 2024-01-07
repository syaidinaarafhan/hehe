import { Link, Button, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie';
import Card from "@/components/card";
import { CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

/*
formik -> handle form
yup -> validate
tanstack-query -> manage api calls (cahcing, state, dll);
*/

export default function dashboard() {

  const [userData, setUserData] = useState({name : "Syaidina Maulana", idKartu : "12083827", pin : "123456", nomorKartu: "1287-1927-6457-7158", expKartu: "31-12-2024" });
  const [userCards, setUserCards] = useState(null);

  useEffect(() => {
    axiosInstance.get('/dashboard', {
    })
      .then((response) => {
        const dataUser = response.data;
  
        if (response.status === 200) {
          setUserData(dataUser.user);
        } else {
          console.error(dataUser.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 

  return (
    <>
  <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Dashboard</Heading>
      
    </Container>
  </Box>

  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={0} bg="#222935" p={3} m={5} borderRadius={12} justifyContent="center" alignItems="center">
    
  <GridItem colSpan={{ base: 'auto', md: '2', lg: '1' }} justifyContent="center">
  {userData && <Text color="white">Selamat Datang, {userData.name}! <br/>ID Kartu: {userData.idKartu} <br/>PIN:  {userData.pin} <br/>Nomor Kartu:  {userData.nomorKartu}<br/>Berlaku Hingga: {userData.expKartu}</Text>}    
  </GridItem>
</Grid>

        <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
              <Heading as="h2" size="lg" textAlign="center" mb={4}>
              Haloo!!
            </Heading>
            <Text textAlign="left" mb={6}>
            Pada My-Idisii terdapat berbagai menu dan display card yang akan menunjukan berbagai informasi seperti 
            nama pengguna, ID Kartu, PIN, Nomor Kartu, dan Masa Berlaku kartu. Setiap menu transaksi memiliki fungsi yang dirancang 
            sedemikian rupa agar dapat menyerupai mesin transaksi pada Mesin EDC yang sesungguhnya. Selamat Belajar :D
            </Text>
              </Container>
            </Box>
            </Box>
  <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        <Link href="../features/insertC/insertCard">Insert Card</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        <Link href="../features/transactions/">Transaction</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        <Link href="../features/QR/qr">QR</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        <Link href="../features/Batch/batch">Batch</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        <Link href="../features/Summary/sumpage">Summary</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
        <Link href="../features/Settlement/setPass">Settlement</Link>
      </Button>
    </VStack>
    </Box>
      


        <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
    </>
  )
}
