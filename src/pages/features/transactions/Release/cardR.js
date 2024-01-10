import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import {useToast, FormControl,FormLabel, Input, Button, Stack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Image, VStack,Container, Heading,} from "@chakra-ui/react";
import { Component, useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import Card from '@/components/card';

export default function cardI () {
    const router = useRouter();

    const [isiKartu, setIsiKartu] = useState(null);

    const [userCard, setUserCard] = useState(null);

    const toast = useToast()

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

    const noKartu = userCard && userCard.length > 0 ? userCard[0].noKartu : null;

    const formik = useFormik({
        initialValues: {
            kartu: '',
        },onSubmit: values => {
            if (values.kartu == noKartu.toString()) {
                toast({
                    title: 'No Kartu Benar',
                    status: 'success'
                })
                router.push('approvalC');

            }else{
                toast({
                    title: 'No Kartu Salah',
                    status: 'error'
                })
            }
        }
    });

    return (
        <>
        <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
        <Container maxW="container.lg" textAlign="center">
        <Heading color="darkgray">RELEASE</Heading>  
        </Container>
            </Box>
            <Card/>

            <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Text textAlign="left" mb={6}>
            Setelah memahami open card dan offline, ada metode yang dinamakan 'Release', metode ini merupakan penarikan saldo deposit ketika saldo itu tidak digunakan.
            Setelah anda memasukan nomor kartu beserta validasi yang diperlukan, saldo anda akan dikembalikan tanpa potongan.

            </Text>
            <Text textAlign="left" mb={6}>
              Berhati-hatilah ketika anda melakukan transaksi, karena jumlah kegagalan memasukan password hanya dapat dilakukan sebanyak 3 kali.
              </Text>
              </Container>
            </Box>
            </Box>

                <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
                <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} pb="70%">
                <FormControl>
                    <FormLabel color="white">Nomor Kartu</FormLabel>
                    <Input color="white"
                        type="text"
                        id="kartu"
                        name="kartu"
                        onChange={formik.handleChange}
                        value={formik.values.kartu}
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