import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, FormControl, FormLabel, Input, 
  Text, Box, VStack, Modal, Image, 
  useToast, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton, Container, Heading} from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";
import ReceiptModal from "@/components/receipt";
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import { useOfflineTransaksi } from '../../Mutate/useOfflineTransaksi';
  
  export default function InsertCard() {

    const router = useRouter()

    const [isiKartu, setIsiKartu] = useState(null);

    const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value);
    };

    const [wrongPinAttempts, setWrongPinAttempts] = useState(0);

    const [userCard, setUserCard] = useState(null);

    const fetchCards = () => {
      axiosInstance
        .get('/cards')
        .then((response) => {
          setUserCard(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      fetchCards();
    }, []);

    const renderCard = () => {
      if (userCard) {
        return (
          <div>
            {userCard.map((card) => (
              <div key={card.id}>
                <div>pin = {card.pin}</div>
                <div>nomor kartu = {card.noKartu}</div>
                <div>exp Kartu = {card.cardExp}</div>
                <div>Limit Debit = {card.nominalLimit}</div>
                <div>Limit Deposit = {card.deposit}</div>
              </div>
            ))}
          </div>
        );
      }
    };

    const pin = userCard && userCard.length > 0 ? userCard[0].pin : null;

    const toast = useToast();

    const [isModalOpen, setModalOpen] = useState(false);

    const formik = useFormik({
      initialValues: {
        amount: "",
      },
      onSubmit: async (values) => {
        if (!formik.values.pin) {
          toast({
            title: "PIN harus diisi",
              status: "error",
          });
        }else if (values.pin !== pin.toString()) {
          setWrongPinAttempts(wrongPinAttempts + 1);
      if (wrongPinAttempts >= 2) {
        toast({
          title: "Percobaan PIN sudah mencapai batas. Silakan coba lagi nanti.",
          status: "error",
        });
        router.push('/dashboard');
      } else {
        toast({
          title: "PIN tidak sesuai. Percobaan ke-" + (wrongPinAttempts + 1),
          status: "error",
        });
      }
        }else{
          const { amount} = formik.values;
        CreateProduct({
          amount: parseInt(amount),
        });
  
        toast({
          title: "Transaction done",
          status: "success",
        });
        formik.setValues({
          amount: "",
        });
        setModalOpen(false);
        }
      },
    });

    const [insertCardData, setReceiptData] = useState(null);
    
      const { mutate: CreateProduct, isLoading: createProductsIsLoading } =
      useOfflineTransaksi({
        onSuccess: (receiptData) => {
          console.log("Data Receipt:", receiptData);
          setReceiptData(receiptData.data.data);
          refetchProducts();
        },      
      });
  
    return (
      <>
      <Card />

      <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Offline</Heading>  
    </Container>
      </Box>
        <Box flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
          <VStack spacing={3} bg={"#cd6600"} p="-10">
            

        <ReceiptModal
          isOpen={insertCardData !== null}
          onClose={() => {
            setReceiptData(0);
            router.push('/dashboard');
          }}
          modalReceiptData={insertCardData}
        />
      <Box pb="50%">
      <Formik
        initialValues={{ amount: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.amount) {
            errors.amount = 'Required';
          } else if (isNaN(values.amount)) {
            errors.amount = 'Must be a number';
          }
          return errors;
        }}
      >
        <form onSubmit={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }} >
            <FormControl pb="5">
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                onChange={handleFormInput}
                name="amount"
                id="amount"
                value={formik.values.amount}
              />
            </FormControl>
              <Button type="submit" bg="gray" >Submit Product</Button>
          </form>
      </Formik>
        </Box>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Enter PIN</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>PIN</FormLabel>
                  <Input
                    type="password"
                    onChange={handleFormInput}
                    name="pin"
                    id="pin"
                    value={formik.values.pin}
                  />
                </FormControl>
                <Button type="button" onClick={formik.submitForm}>
                  Confirm
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
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
