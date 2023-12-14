import { axiosInstance } from "@/lib/axios";
import { useFormik } from "formik"
import { useRouter } from "next/router";
import { useState, useEffect} from "react";
import { Button, FormControl, FormLabel, Input, Stack, 
    Text, Box, Image, VStack, useToast } from '@chakra-ui/react';
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import ApprovalCodeForm from "@/components/apprCode";
import Card from "@/components/card";
import ConfirmationModal from "@/components/confirmModal";

export default function approvalCode () {

    const router = useRouter();
    const toast = useToast();
    const [appro, setAppro] = useState(null);
    const [confirm, setConfirm] = useState(false);

    const handleAppr = (transactionData) => {
        setConfirm(true)
        setAppro(transactionData);
    }
    const handleConfirm = () => {
        setTimeout(() => {
          setConfirm(false)  
          router.push('release');
        }, 500);
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
            <ConfirmationModal isOpen={confirm} onClose={() => setConfirm(false)} onConfirm={handleConfirm}/>
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