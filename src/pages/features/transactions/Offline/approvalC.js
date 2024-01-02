import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useToast, Text , Box, VStack, Container, Heading} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { Formik, Form, Field } from "formik";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";
import ApprovalCodeForm from '@/components/apprCode';

export default function approvalCode () {

    const router = useRouter();
    const toast = useToast();
    const [appro, setAppro] = useState(null)

    const handleAppr = (transactionData) => {
        setAppro(transactionData);
    
        // Delay 1 detik sebelum meroute
        setTimeout(() => {
          router.push('offline');
        }, 1000);
      };

    return (
        <>
        <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">OFFLINE</Heading>  
    </Container>
      </Box>

<Card />
<Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
            <ApprovalCodeForm onTransactionFound={handleAppr} />
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