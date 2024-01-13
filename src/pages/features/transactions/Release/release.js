import { useToast, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/router";
import Card from "@/components/card";
import { useMutation } from "@tanstack/react-query";

export default function InsertCard() {
  const router = useRouter();

  const [isiKartu, setIsiKartu] = useState(null);
  const [wrongPinAttempts, setWrongPinAttempts] = useState(0);
  const [userCard, setUserCard] = useState(null);

  const useRelease = ({ onSuccess }) => {
    return useMutation({
      mutationFn: async (body) => {
  
        try {
          const transaksiResponse = await axiosInstance.post("/release", body);
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

  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    onSubmit: async (values) => {
      if (!formik.values.pin) {
        toast({
          title: "PIN harus diisi",
          status: "error",
        });
      } else if (values.pin !== pin.toString()) {
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
      } else {
        CreateProduct({});
        toast({
          title: "Transaction done",
          status: "success",
        });
        setReceiptData(0);
        router.push('/dashboard');
      }
    },
  });

  const [insertCardData, setReceiptData] = useState(null);

  const { mutate: CreateProduct, isLoading: createProductsIsLoading } =
    useRelease({
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
    <Heading color="darkgray">Offline</Heading>  
  </Container>
    </Box>
      <Card/>
      <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
            <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
          <Box pb="50%">
            <form onSubmit={formik.handleSubmit}>
            <FormControl pb="5">
              <FormLabel color="white">PIN</FormLabel>
              <Input
                  type="password"
                  color="white"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="pin"
                  id="pin"
                  value={formik.values.pin}
                />
              </FormControl> 
              {createProductsIsLoading ? (
                <Spinner />
              ) : (
                <Button type="submit" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Konfirmasi</Button>
              )}
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
