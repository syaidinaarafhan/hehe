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

    <Box display="flex" flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto" h="550">
      <VStack spacing={3} bg={"#cd6600"} p="-10" pb={160}>
        <Box boxSize="70%">
          <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
            objectFit="cover"
          />
        </Box>

        <FindTransactionForm onTransactionFound={handleTransactionFound} />

        {transactionData && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h2>Transaction Found:</h2>
              <pre>{JSON.stringify(transactionData, null, 2)}</pre>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => {
                setModalOpen(false);
              }}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

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
