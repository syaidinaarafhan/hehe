import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useToast, Text , Box, VStack, Container, Heading} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Formik, Form, Field } from "formik";
import Card from "@/components/card";
import ApprovalCodeForm from '@/components/apprCode';

export default function approvalCode () {

    const router = useRouter();

    const handleAppr = (transactionData) => {
        setTimeout(() => {
          router.push('offline');
        }, 1000);
      };

    return (
        <>
        <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Offline</Heading>  
    </Container>
      </Box>

<Card />

<Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Text textAlign="left" mb={6}>
            Setelah mengenal Open Card, anda akan memehami penggunaan metode Offline. Yaitu penggunaan saldo yang telah didepositkan ketika melakukan Open card.
            Mekanismenya ialah menggunakanvalidasi berupa 'Approval Code' yang didapat dari receipt open card. Setelah approval Code ditelusuri dan data valid, maka transaksi offline akan diproses
            </Text>
            <Text textAlign="left" mb={6}>
              Berhati-hatilah ketika anda melakukan transaksi, karena jumlah kegagalan memasukan password hanya dapat dilakukan sebanyak 3 kali.
              </Text>
              </Container>
            </Box>
            </Box>
<Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
            <ApprovalCodeForm onTransactionFound={handleAppr} />
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