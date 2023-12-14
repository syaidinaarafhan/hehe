import { useState, useEffect } from "react";
import { Button, FormControl, FormLabel, Input, 
  Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter, 
  Box, Image, VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axios";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

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

    <p>Password : {pass}</p>
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
