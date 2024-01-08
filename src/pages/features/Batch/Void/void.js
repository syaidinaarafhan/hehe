import { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Input, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, 
  Box, Image, VStack, useToast
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axios";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

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
            title: "Missing TraceNumber",
            status: "error",
            duration: '3000',
            isClosable: true,
          });
        } else {
          toast({
            title: 'Transaction Found',
            status: 'success',
            isClosable: true,
          });
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

    <p>Password : 0000</p>
    <Box display="flex" flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto" h="550">
      <VStack spacing={3} bg={"#cd6600"} p="-10" pb={160}>
        <Box boxSize="70%">
          <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
            objectFit="cover"
          />
        </Box>

      <Formik initialValues={{ traceNumber: "" }} onSubmit={handleFormSubmit}>
        <Form>
          <FormControl pb="5">
            <FormLabel>traceNumber</FormLabel>
            <Field name="traceNumber" as={Input} type="text" />
            <Button mt={4} colorScheme="gray" type="submit">
                Find Transaction
            </Button>
          </FormControl>
        </Form>
      </Formik>

      {transaction && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                <strong>Price:</strong> {transaction.totalHarga}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setModalOpen(false)}>Close</Button>

              <Button colorScheme="red" ml={3} onClick={() => setConfirmDelete(true)}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button colorScheme="red" ml={3} onClick={handleDeleteTransaction}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

        <Modal
            isOpen={isPasswordModalOpen}
            onClose={() => setPasswordModalOpen(false)}
        >
        <ModalOverlay />
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
      <Box display="flex" justifyContent="space-between" pt={4}>
            <ArrowLeftIcon color={"white"}></ArrowLeftIcon>
            <HamburgerIcon color={"white"}></HamburgerIcon>
            <ArrowRightIcon color={"white"}></ArrowRightIcon>
          </Box>
    </Box>
    </>
  );
}
