import { useState, useEffect } from "react";
import { useToast, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem, Center} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axios";
import Card from "@/components/card";

export default function Void() {
  const router = useRouter();
  const toast = useToast();
  const [transaction, setTransaction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPinValid, setPinValid] = useState(true);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteTransaction = async () => {
    try {
      await axiosInstance.delete(`/delete/${transaction.id}`);
      
      setConfirmDelete(false);
      setModalOpen(false);
      toast({
        title: 'Transaksi Berhasil Dibatalkan',
        status: 'success'
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };
  
  

  const handleFormSubmit = async (values) => {

    setTransaction({ traceNumber: values.traceNumber });

    setPasswordModalOpen(true);
  };

  const handlePasswordSubmit = () => {

    if (enteredPassword !== '0000') {
      setPinValid(false);
      return;
    }

    setPasswordModalOpen(false);

    const transactionData = async () => {
      try {
        const response = await axiosInstance.get(`/find/${transaction?.traceNumber}`);
        console.log(response);
        const transactionData = response.data.data;
        setModalOpen(false);
        if (!transactionData) {
          toast({
            title: "Data Not Found",
            description: "Transaction data not found.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        } else {
          setModalOpen(true);
          setTransaction(transactionData);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
  
    setTransaction(transactionData);
    setModalOpen(true);
  };

  return (
<>

    <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
  <Container maxW="container.lg" textAlign="center" display="flex" alignItems="center" justifyContent="center">
    <Box flex="1" textAlign="left"> 
      <Heading as="h1" color="darkgray">Void</Heading>
    </Box>
  </Container>
</Box>

<Card/>
<Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

      <Formik initialValues={{ traceNumber: "" }} onSubmit={handleFormSubmit}>
        <Form>
          <FormControl pb="5">
            <FormLabel color="white">traceNumber</FormLabel>
            <Field name="traceNumber" as={Input} type="text" color="white"/>
            <Button type="submit" marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>
                Telusuri
            </Button>
          </FormControl>
        </Form>
      </Formik>

      {transaction && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalOverlay />
          <ModalContent bg="#222935">
            <ModalHeader color= "white" textAlign="Center">Detail Transaksi</ModalHeader>
            <ModalCloseButton />
            <ModalBody color= "white">
              <p>
                <strong>TransactionId:</strong> {transaction.id}
              </p>
              <p>
                <strong>Trace Number:</strong> {transaction.traceNumber}
              </p>
              <p>
                <strong>Tanggal:</strong> {transaction.date}
              </p>
              <p>
                <strong>Batch:</strong> {transaction.batch}
              </p>
              <p>
                <strong>Ref Number:</strong> {transaction.refNumber}
              </p>
              <p>
                <strong>Total Transaksi:</strong> {transaction.totalHarga}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setModalOpen(false)}>Kembali</Button>

              <Button colorScheme="red" ml={3} onClick={() => setConfirmDelete(true)}>
                Hapus
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <ModalOverlay />
        <ModalContent bg="#222935">
            <ModalHeader color= "white">Anda yakin?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button onClick={() => setConfirmDelete(false)}>Tidak</Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteTransaction}>
              Ya
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

        <Modal
            isOpen={isPasswordModalOpen}
            onClose={() => setPasswordModalOpen(false)}
        >
        <ModalOverlay />
        <ModalContent bg="#222935">
            <ModalHeader color= "white">Masukan Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel color="white">Password</FormLabel>
              <Input color="white"
                type="password"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </FormControl>
            {!isPinValid && (
              <p style={{ color: "red" }}>
                Password tidak valid. Coba lagi!
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handlePasswordSubmit}  marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Konfirmasi</Button>
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
    </>
  );
}
