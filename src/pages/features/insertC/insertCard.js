  import { useToast, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
  import { useFormik } from "formik";
  import { useCreateProduct } from "@/pages/features/Mutate/useCreateTransaksi";
  import { useEffect, useState } from "react";
  import { axiosInstance } from "@/lib/axios";
  import { useRouter } from "next/router";
  import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
  import Card from '@/components/card'
  import ReceiptModal from "@/components/receipt";
    
    export default function InsertCard() {

      const router = useRouter()

      const [isiKartu, setIsiKartu] = useState(null);

      const [wrongPinAttempts, setWrongPinAttempts] = useState(0);

      useEffect(() => {
        axiosInstance.get('/api/getData')
        .then(response => {
            setIsiKartu(response.data.isiKartu);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    const pin1 = isiKartu?.pin ?? 'Data gaada'

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
          if (!formik.values.pin) {
            toast({
              title: "PIN harus diisi",
                status: "error",
            });
          }else if (values.pin !== pin1) {
            setWrongPinAttempts(wrongPinAttempts + 1);
        if (wrongPinAttempts >= 2) {
          toast({
            title: "Percobaan PIN sudah mencapai batas. Silakan coba lagi nanti.",
            status: "error",
          });
          router.push('/');
        } else {
          toast({
            title: "PIN tidak sesuai. Percobaan ke-" + (wrongPinAttempts + 1),
            status: "error",
          });
        }
          }else{
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
          });
          setModalOpen(false);
          }
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
    
      return (
        <>

      <Card />
        
      <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Insert Card</Heading>  
    </Container>
      </Box>

      <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

          <ReceiptModal
            isOpen={insertCardData !== null}
            onClose={() => {
              setReceiptData(0);
              router.push('../../dashboard');
            }}
            modalReceiptData={insertCardData}
          />
      <Box pb="50%">
          <form onSubmit={(e) => {
            e.preventDefault();
            setModalOpen(true);
          }} >
            <FormControl pb="5">
              <FormLabel color="white" marginBottom="15px">Masukan nominal</FormLabel>
              <Input color="white"
                type="number"
                onChange={handleFormInput}
                name="totalHarga"
                id="totalHarga"
                value={formik.values.totalHarga}
              />
            </FormControl>
              <Button type="submit" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Konfirmasi</Button>
          </form>
      </Box>
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

              <ModalHeader color="gray">Masukan PIN</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel color="white" marginBottom="10px">PIN</FormLabel>
                  <Input color="white"
                    type="password"
                    onChange={handleFormInput}
                    name="pin"
                    id="pin"
                    value={formik.values.pin}
                  />
                </FormControl>
                <Button type="button" onClick={formik.submitForm} marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>
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
          <p>Pin : {pin1}</p>
        </>
      );
    }
    