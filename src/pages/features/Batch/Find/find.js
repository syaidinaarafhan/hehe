import { useState } from "react";
import { Button, FormControl, FormLabel, 
  Input, Modal, ModalOverlay, ModalContent, ModalHeader, 
  ModalCloseButton, ModalBody, ModalFooter,
  Box, Image, VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export default function Find() {

    const router = useRouter();

  const [transaction, setTransaction] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:2000/transaksis/find/${values.traceNumber}`);
      const transactionData = await response.json();
      setTransaction(transactionData);

      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto" h="550">
      <VStack spacing={3} bg={"#cd6600"} p="-10" pb={160}>
        <Box boxSize="70%">
          <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
            objectFit="cover"
          />
        </Box>

    <div>

      <Formik initialValues={{ traceNumber: "" }} onSubmit={handleFormSubmit}>
        <Form>
          <FormControl pb="5">
            <FormLabel>traceNumber</FormLabel>
            <Field name="traceNumber" as={Input} type="text" />
          </FormControl>
          <Button mt={4} colorScheme="gray" type="submit">
            Find Transaction
          </Button>
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
                router.push('/');
              }}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>

      </VStack>
      <Box display="flex" justifyContent="space-between" pt={4}>
            <ArrowLeftIcon color={"white"}></ArrowLeftIcon>
            <HamburgerIcon color={"white"}></HamburgerIcon>
            <ArrowRightIcon color={"white"}></ArrowRightIcon>
          </Box>
    </Box>

  );
}
