import { axiosInstance } from '@/lib/axios';
import { useToast, FormControl, FormLabel, Stack, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem, ModalFooter} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


export default function Audit() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionIdToSettle, setTransactionIdToSettle] = useState([]);
  const [statusText, setStatusText] = useState('');
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance("/unsettle");
        setTransactions(response.data.data);
        setStatusText(response.data.data.length > 0 ? '' : 'Nothing to settle');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSettlementAll = () => {
    const allTransactionIds = transactions.map((transaction) => transaction.id);
    setTransactionIdToSettle(allTransactionIds);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTransactionIdToSettle([]);
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  const settleTransaction = async () => {
    try {
      if (transactionIdToSettle.length > 0) {
        await axiosInstance.post('/settled', { transactionId: transactionIdToSettle });
        handleModalClose();
        showToast('Settled', 'success');
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error settling transaction:', error);
      showToast('Error settling transaction', 'error');
    }
  };

  return (
    <div>
             <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
              <Container maxW="container.lg" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                <Box flex="1" textAlign="left"> 
                  <Heading as="h1" color="darkgray">Settlement</Heading>
                </Box>
                <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
                  '&:hover': {backgroundColor: 'white',color: '#222935',},}}>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
              </Container>
            </Box>
            <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center' }}>
              {statusText && 
                <Text color='white'>
                    <Heading fontSize= '1.5em' color="darkgray">Seluruh Data Telah Di Settle</Heading>
                </Text>}
                {transactions.length > 0 && (
                  <Button onClick={handleSettlementAll} colorScheme='gray.800' variant='ghost' color='white' sx={{
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#222935',},}}>
                    Settlement
                  </Button>
                )}
                </Box>
                <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center' }}>
              <VStack spacing={6} align="stretch" bg="#222935" p={5} justifyContent="center" maxW="container.lg" width="100%">
                {transactions.map((transaction) => (
                  <Box key={transaction.id} borderRadius="lg" overflow="hidden" boxShadow="md" bg="gray.800" color="white" p={4}>
                            <div>Trace Number : {transaction.traceNumber},</div>
                              <div>Tanggal : {transaction.date},</div>
                              <div>Approval Code : {transaction.apprCode},</div>
                              <div>Batch : {transaction.batch},</div>
                              <div>Ref Number : {transaction.refNumber},</div>
                              <div>Total Harga: {transaction.totalHarga}</div>
                 </Box>
                ))}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent 
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="gray.800" 
            color="gray.800">
          <ModalHeader color="white">Settlement</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color="white">Settlement akan menghilangkan seluruh riwayat transaksi. Anda yakin?</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleModalClose}>Tidak</Button>
            <Button colorScheme="blue" ml={3} onClick={settleTransaction} >
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
