import {useToast, Stack, Text, FormControl,FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Image, VStack,Container, Heading} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/router";
import Card from "@/components/card";
  
  export default function InsertCard() {

    const router = useRouter()

    const [userCard, setUserCard] = useState(null);

    const useCreateProduct = ({ onSuccess }) => {
      return useMutation({
        mutationFn: async (body) => {
    
          try {
            const transaksiResponse = await axiosInstance.post("/insertCard", body);
          return transaksiResponse;
          } catch (error) {
            console.log("nih errornya "+error)
          }
          
        },
        onSuccess,
      });
    };

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
  
    const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value);
    };
  
    const formik = useFormik({
      initialValues: {
        totalHarga: "",
        pin: "",
      },
      onSubmit: async (values) => {
          const { totalHarga} = formik.values;
        CreateProduct({
          totalHarga: parseInt(totalHarga),
        });
  
        toast({
          title: "Transaction done",
          status: "success",
        });
        formik.setValues({
          totalHarga: "",
          pin: "",
        });
        setModalOpen(false);
      },
    });

    const [insertCardData, setReceiptData] = useState(null);
  
    const { mutate: CreateProduct, isLoading: createProductsIsLoading } =
    useCreateProduct({
      onSuccess: (receiptData) => {
        console.log("Data Receipt:", receiptData);
        setReceiptData(receiptData.data.data);
        refetchProducts();
      },      
    });

    const ReceiptModal = ({ isOpen, onClose, modalReceiptData }) => (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{modalReceiptData ? modalReceiptData.kartu : 'Data tidak tersedia'}</p>
            <p>traceNumber : {modalReceiptData ? modalReceiptData.traceNumber : 'Data tidak tersedia'}</p>
            <p>Tanggal : {modalReceiptData ? modalReceiptData.date : 'Data tidak tersedia'}</p>
            <p>refNumber : {modalReceiptData ? modalReceiptData.refNumber : 'Data tidak tersedia'}</p>
            <p>Total Harga: {modalReceiptData ? modalReceiptData.totalHarga : 'Data tidak tersedia'}</p>
            <Button onClick={() => onClose()}>OK</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  
    return (
      <>

<Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
  <Container maxW="container.lg" textAlign="center">
    <Heading color="darkgray">Manual</Heading>  
  </Container>
    </Box>

<Card/>

          <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
            <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
        <ReceiptModal
          isOpen={insertCardData !== null}
          onClose={() => {
            router.push('/dashboard');
          }}
          modalReceiptData={insertCardData}
        />
    <Box pb="50%">
        <form onSubmit={formik.handleSubmit}>
          <FormControl pb="5">
            <FormLabel color="white">Harga</FormLabel>
            <Input
              color='white'
              type="number"
              onChange={handleFormInput}
              name="totalHarga"
              id="totalHarga"
              value={formik.values.totalHarga}
            />
          </FormControl>
          <Button type="submit" marginTop="20px" marginBottom="20" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Konfirmasi</Button>
        </form>
        </Box>  
          </VStack>
      </Box>
      <Box bg="gray.800" color="darkgray" p={6}>
        <Container maxW="container.lg">
          <Text textAlign="center">&copy; 2024 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
        </Container>
      </Box>
      </>
    );
} 