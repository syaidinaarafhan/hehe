import { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Input, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, 
  Box, Image, VStack, Container, Text, Heading, 
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axios";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import FindTransactionForm from "@/components/traceNumber";

export default function Void() {
  const router = useRouter();

  const [transactionData, setTransactionData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleTransactionFound = (data) => {
    // Handle the found transaction data
    setTransactionData(data);
    setModalOpen(true);
  };

  return (
<>
<Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">FIND</Heading>
      </Container>
      </Box>

      <Box bg="#222935" p={2} style={{ display: 'flex', justifyContent: 'center'}}>
                <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
        <FindTransactionForm onTransactionFound={handleTransactionFound} />
        {transactionData && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalOverlay />
          <ModalContent 
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              bg="gray.800" 
              color="gray.800">

              <ModalHeader color="gray">Detail Transaksi</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h2>Transaction Found:</h2>
              <pre>{JSON.stringify(transactionData, null, 2)}</pre>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" marginTop="20px" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}} onClick={() => {
                setModalOpen(false);
              }}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      </VStack>
      

    </Box>
    <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
    </>
  );
}
