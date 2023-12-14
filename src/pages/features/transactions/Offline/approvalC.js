import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, Input, Stack, useToast, Text , Box, VStack, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
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

        <Card />
        <Box flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
          <VStack spacing={3} bg={"#cd6600"} p="-10">
            <Box boxSize="70%">
                <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
                objectFit="cover"
                />
            </Box>
            <ApprovalCodeForm onTransactionFound={handleAppr} />
          </VStack>
          <Box display="flex" justifyContent="space-between" pt={4}>
            <ArrowLeftIcon color={"white"}></ArrowLeftIcon>
            <HamburgerIcon color={"white"}></HamburgerIcon>
            <ArrowRightIcon color={"white"}></ArrowRightIcon>
          </Box>
        </Box>
        </>
    )
}