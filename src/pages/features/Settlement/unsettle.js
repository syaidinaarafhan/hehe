import { axiosInstance } from '@/lib/axios';
import { Tabs, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Audit() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionIdToSettle, setTransactionIdToSettle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance("/unsettle");
        setTransactions(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSettlement = (transactionId) => {
    setIsModalOpen(true);
    setTransactionIdToSettle(transactionId);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTransactionIdToSettle(null);
  };

  const showToast = () => {
  };

  const settleTransaction = async () => {
    try {
      await axiosInstance.post('/settled', { transactionId: transactionIdToSettle });
      handleModalClose();
      showToast();
    } catch (error) {
      console.error('Error settling transaction:', error);
    }
  };

  return (
    <div>
      <ul>
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
                <div>Settled?: {transaction.settlement}</div>

                {!transaction.settlement && (
                  <Button onClick={() => handleSettlement(transaction.id)}>
                    Settlement
                  </Button>
                )}

                <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Do you want to settle?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={settleTransaction}>
                        Yes
                      </Button>
                      <Button onClick={handleModalClose}>No</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Tabs>
          </li>
        ))}
      </ul>
    </div>
  );
}
