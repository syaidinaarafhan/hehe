import { axiosInstance } from '@/lib/axios';
import { Tabs, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, useToast } from '@chakra-ui/react';
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
      {statusText && <Text>{statusText}</Text>}
      {transactions.length > 0 && (
        <Button onClick={handleSettlementAll}>
          Settlement
        </Button>
      )}
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Tabs>
              <Box display="flex" flexDirection="column">
                <div>Trace Number : {transaction.traceNumber},</div>
                <div>Tanggal : {transaction.date},</div>
                <div>Approval Code : {transaction.apprCode},</div>
                <div>Batch : {transaction.batch},</div>
                <div>Ref Number : {transaction.refNumber},</div>
                <div>Total Harga: {transaction.totalHarga}</div>
              </Box>
            </Tabs>
          </li>
        ))}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Do you want to settle?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={settleTransaction} >
              Yes
            </Button>
            <Button onClick={handleModalClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
