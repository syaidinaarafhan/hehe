import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from 'react';
import {
    useToast,
    FormControl,
    FormLabel,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    VStack,
    Image,
    Tabs,
  } from "@chakra-ui/react";
export default function dataTransaksi() {
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
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                    <Tabs>
                        <Box display="flex" flexDirection="column">
                            <div>Trace Number : {transaction.id},</div>
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