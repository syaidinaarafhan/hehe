import { Link, Button, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie';
import Card from "@/components/card";


export default function Dashboard() {

  const [userData, setUserData] = useState({name : "Syaidina Maulana", idKartu : "12083827", pin : "244345", nomorKartu: "5785-7685-6451-1148", expKartu: "31-12-2024" });
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
      <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
  <Container maxW="container.lg" textAlign="center" display="flex" alignItems="center" justifyContent="center">
    <Box flex="1" textAlign="left"> 
      <Heading as="h1" color="darkgray">Dashboard</Heading>
    </Box>
    <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
      '&:hover': {backgroundColor: 'white',color: '#222935',},}}>
          <Link href="dataTransaksi">History</Link>
        </Button>
  </Container>
</Box>

<Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'right' }}>
  <Card/>
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
          <Text textAlign="center">&copy; 2024 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
        </Container>
      </Box>
      </>
    )
  }