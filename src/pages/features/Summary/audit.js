import { axiosInstance } from '@/lib/axios';
import { useToast, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";

import { useEffect, useState } from 'react';


export default function Audit() {
  const [transactions, setTransactions] = useState([]);


    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await axiosInstance("/audit");
            setTransactions(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchTransactions();
      }, []);

    return (
        <>
             <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
              <Container maxW="container.lg" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                <Box flex="1" textAlign="left"> 
                  <Heading as="h1" color="darkgray">Audit</Heading>
                </Box>
                <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
                  '&:hover': {backgroundColor: 'white',color: '#222935',},}}>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
              </Container>
            </Box>
      
                <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center' }}>
              <VStack spacing={6} align="stretch" bg="#222935" p={5} justifyContent="center" maxW="container.lg" width="100%">
                {transactions.map((transaction) => (
                  <Box key={transaction.id} borderRadius="lg" overflow="hidden" boxShadow="md" bg="gray.800" color="white" p={4}>
                            <div>Kartu: {transaction.kartu}</div>
                  <div>Total Harga: {transaction.totalHarga}</div>
                  <div>Trace Number : {transaction.traceNumber}</div>
                            </Box>
                ))}
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