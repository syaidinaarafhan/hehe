import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import {useToast, Stack, Text, FormControl,FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Image, VStack,Container, Heading} from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from '@/components/card';

export default function cardE () {
    const router = useRouter();

    const [isiKartu, setIsiKartu] = useState(null);

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
  
    const cardExpiry = userCard && userCard.length > 0 ? userCard[0].cardExp : null;

    const formik = useFormik({
        initialValues: {
            cardExpiry: '',
        },onSubmit: values => {
            if (values.cardExpiry == cardExpiry.toString()) {
                router.push('manualTransaction');
            }else{
            router.push('/dashboard');
            }
        }
    });

    return (
        <>
         <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
            <Container maxW="container.lg" textAlign="center">
              <Heading color="darkgray">Manual</Heading>  
            </Container>
          </Box>
        <Card />

        <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
          <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

            <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} pb="70%">
                <FormControl>
                    <FormLabel color="white" marginBottom="10px">Masa Berlaku</FormLabel>
                    <Input color="white"
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        onChange={formik.handleChange}
                        value={formik.values.cardExpiry}
                    />
                </FormControl>

                <Button type="submit" marginTop="20px" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Konfirmasi</Button>
            </Stack>
        </form>

            </VStack>
        </Box>

        <Box bg="gray.800" color="darkgray" py={6}>
    <Container maxW="container.lg">
      <Text textAlign="center">&copy; 2024 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
    </Container>
  </Box>
        </>
    )
}