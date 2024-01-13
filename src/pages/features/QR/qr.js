import { useToast, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from 'qrcode.react';
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";
import ReceiptModal from "@/components/receipt";


  export default function InsertCard() {

    const router = useRouter()
    const toast = useToast();

    const [isReceiptOpen, setReceiptOpen] = useState(null);
    const [isQrModalOpen, setQrModalOpen] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState(null);
    const [insertCardData, setReceiptData] = useState(null);
  
    const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value);
    };

    const formik = useFormik({
      initialValues: {
        totalHarga: "",
      },
      onSubmit: async () => {
        const { totalHarga } = formik.values;
  
        const qrCodeData = {
          totalHarga: parseInt(totalHarga),
        };
  
        const qrCodeString = JSON.stringify(qrCodeData);
        setQrCodeValue(qrCodeString);
  
        setQrModalOpen(true);
      },
    });
  
    const QrCodeModal = ({ isOpen, onClose, qrCodeValue }) => {
      const handleClose = () => {
        CreateProduct({
          totalHarga: parseInt(formik.values.totalHarga),
        });
  
        toast({
          title: "Transaction done",
          status: "success",
        });
  
        formik.setValues({
          totalHarga: "",
        });
  
        onClose();
  
        setReceiptOpen(true);
      };
  
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
  <ModalOverlay />
  <ModalContent
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    bg="gray.800" 
    color="gray.800" 
  >
    <ModalHeader color="gray">QR Code</ModalHeader>
    <ModalCloseButton />
    <ModalBody marginBottom="10px">
      {qrCodeValue && (
        <QRCode value={qrCodeValue}/>
      )}
      <Button onClick={handleClose} marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>
        Tampilkan Receipt</Button>
    </ModalBody>
  </ModalContent>
        </Modal>
      );
    };

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
  
    const { mutate: CreateProduct, isLoading: createProductsIsLoading } = useCreateProduct({
      onSuccess: (receiptData) => {
        console.log("Data Receipt:", receiptData);
        setReceiptData(receiptData.data.data);
        refetchProducts();
      },
    });
  
    return (
      <>

<Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">QR</Heading>
      
    </Container>
  </Box>

  <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Text textAlign="left" mb={6}>
            Menu Kode QR menjadi pintu gerbang bagi pengguna untuk mengakses informasi dengan cepat dan efisien. Di sini, pengguna dapat mengeksplorasi fungsi QR Code yang memungkinkan akses instan ke berbagai sumber daya pembelajaran terkait mesin EDC. Menu ini memungkinkan pengguna untuk memindai dan menghasilkan kode QR yang terkait dengan materi pembelajaran, modul simulasi, atau sumber informasi lainnya. Pengguna dapat dengan mudah mengeksplorasi dan membaca konten edukatif dengan menggunakan teknologi QR Code yang efektif ini. Melalui menu ini, pengguna dapat memperluas pemahaman mereka tentang mekanisme dan aplikasi praktis dari mesin EDC dalam kehidupan sehari-hari.
            </Text>
              </Container>
            </Box>
            </Box>

  <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

      
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => {
          router.push('/dashboard');
        }}
        modalReceiptData={insertCardData}
      />

      <QrCodeModal isOpen={isQrModalOpen} onClose={() => 
        setQrModalOpen(false)} 
        qrCodeValue={qrCodeValue} 
      />
  <Box pb="50%">
      <form onSubmit={formik.handleSubmit}>
        <FormControl pb="5">
          <FormLabel color='white'>Masukan Nominal</FormLabel>
          <Input
            type="number"
            onChange={handleFormInput}
            name="totalHarga"
            id="totalHarga"
            value={formik.values.totalHarga}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #222935',
              backgroundColor: 'grey.800',
              borderColor: 'white',
              color: 'white',
              width: '100%', 
              boxSizing: 'border-box', 
              maxWidth: '80%', 
            }}
          />
        </FormControl>
          <Button type="submit" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>
        Tampilkan QR</Button>
      </form>
      </Box>
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