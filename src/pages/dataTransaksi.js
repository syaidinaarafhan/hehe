import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from 'react';
import { Box, VStack, Container, Heading, Text} from "@chakra-ui/react";

export default function DataTransaksi() {
    const [transactions, setTransactions] = useState([]);
    const [statusText, setStatusText] = useState('');
    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await axiosInstance.get("/getDataById");
            setTransactions(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchTransactions();
      }, []);

      const renderTransaction = () => {
        if (transactions) {
          return (
            <div>
              <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
              <Container maxW="container.lg" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                <Box flex="1" textAlign="left"> 
                  <Heading as="h1" color="darkgray">Riwayat Transaksi</Heading>
                </Box>
              </Container>
            </Box>

            <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Text textAlign="left" mb={6}>
            Berikut merupakan beberapa riwayat transaksi yang telah anda lakukan.
            </Text>
              </Container>
            </Box>
            </Box>

            <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center' }}>
              <VStack spacing={6} align="stretch" bg="#222935" p={5} justifyContent="center" maxW="container.lg" width="100%">
                {transactions.map((transaction) => (
                  <Box key={transaction.id} borderRadius="lg" overflow="hidden" boxShadow="md" bg="gray.800" color="white" p={4}>
                            <div>Id Transaksi : {transaction.id},</div>
                            <div>Trace Number : {transaction.traceNumber},</div>
                            <div>Tanggal : {transaction.date},</div>
                            <div>Approval Code : {transaction.apprCode},</div>
                            <div>Batch : {transaction.batch},</div>
                            <div>Ref Number : {transaction.refNumber},</div>
                            <div>Total Harga: {transaction.totalHarga}</div>
                            </Box>
                ))}
              </VStack>
            </Box>
              <Box bg="gray.800" color="darkgray" py={6}>
                    <Container maxW="container.lg">
                      <Text textAlign="center">&copy; 2024 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
                    </Container>
                  </Box>
            </div>
          );
        }
      };

    return (
        <>
            {statusText && <Text>{statusText}</Text>}
            <div>{renderTransaction()}</div>
        </>
    )
    }