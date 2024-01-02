import { useState, useEffect } from "react";
import {Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Text, VStack, Container, Heading } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axios";


export default function Void() {
  const router = useRouter();

  const [transaction, setTransaction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isiKartu, setIsiKartu] = useState(null);
  const [isPinValid, setPinValid] = useState(true);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");

  useEffect(() => {
    axiosInstance.get('/api/getData')
      .then(response => {
        setIsiKartu(response.data.isiKartu);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const pass = isiKartu?.password ?? "Data gaada";

  const handleFormSubmit = async (values) => {

    setTransaction({ traceNumber: values.traceNumber });

    setPasswordModalOpen(true);
  };

  const handlePasswordSubmit = () => {

    if (enteredPassword !== pass) {
      setPinValid(false);
      return;
    }

    setPasswordModalOpen(false);

    const transactionData = async () => {
      try {
        const response = await axiosInstance.get(`/find/${transaction?.traceNumber}`);
        console.log(response);
        const transactionData = response.data;

        setTransaction(transactionData);
        setModalOpen(true);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    setTransaction(transactionData);
    setModalOpen(true);
  };

  return (
<>


    <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">VOID</Heading>
      </Container>
      </Box>

      <Box bg="#222935" p={2} style={{ display: 'flex', justifyContent: 'center'}}>
                <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

      <Formik initialValues={{ traceNumber: "" }} onSubmit={handleFormSubmit}>
        <Form>
          <FormControl pb="5">
            <FormLabel color= "white">Trace Number</FormLabel>
            <Field name="traceNumber" as={Input} type="text" />
            <Button marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}} type="submit">
                Find Transaction
            </Button>
          </FormControl>
        </Form>
      </Formik>

      {transaction && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalContent display= "flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" bg="gray.800" color="gray.800">
              <ModalHeader color="gray">Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h2>Transaction Found:</h2>
              <pre>{JSON.stringify(transaction, null, 2)}</pre>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => {
                setModalOpen(false);
              }}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

        <Modal
            isOpen={isPasswordModalOpen}
            onClose={() => setPasswordModalOpen(false)}
        >
        <ModalContent>
          <ModalHeader>Enter Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
              />
            </FormControl>
            {!isPinValid && (
              <p style={{ color: "red" }}>
                Invalid Password. Please try again
              </p>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handlePasswordSubmit}>Submit Password</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      </VStack>
    </Box>

    <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
    <p>Password : {pass}</p>
    </>
  );
}
