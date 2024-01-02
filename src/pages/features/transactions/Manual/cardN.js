import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import {useToast, Card, Stack, Text, FormControl,FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Image, VStack,Container, Heading,} from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export default function cardN () {
    const router = useRouter();

    const [isiKartu, setIsiKartu] = useState(null);

    useEffect(() => {
        axiosInstance.get('/api/getData')
        .then(response => {
            setIsiKartu(response.data.isiKartu);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

    const cardNumber = isiKartu?.noKartu ?? 'Data gaada'

    const formik = useFormik({
        initialValues: {
            noKartu: '',
        },onSubmit: values => {
            if (values.noKartu == cardNumber) {
                router.push('cardE');
            }else{
            router.push('/');
            }
        }
    });

    return (
        <>
        <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Open Card</Heading>  
    </Container>
      </Box>

<Card />
<Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">


            <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} pb="70%">
                <FormControl>
                <FormLabel color="white" marginBottom="10px">Nomor Kartu</FormLabel>
                  <Input color="white"
                        type="text"
                        id="noKartu"
                        name="noKartu"
                        onChange={formik.handleChange}
                        value={formik.values.noKartu}
                    />
                </FormControl>

                <Button type="submit" marginTop="20px" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Konfirmasi</Button>
            </Stack>
        </form>

            </VStack>
            </Box>
      <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
        <p>No Kartu : {cardNumber}</p>
        </>
    )
}