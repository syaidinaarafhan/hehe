import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useToast, FormControl, FormLabel, Input, Button, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import Card from '@/components/card'


export default function cardI () {
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

    const kartu1 = isiKartu?.namaKartu ?? 'Data gaada'

    const formik = useFormik({
        initialValues: {
            kartu: '',
        },onSubmit: values => {
            if (values.kartu == kartu1) {
                router.push('openCard');
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

    <Box bg="#222935" p={20} style={{ display: 'flex', justifyContent: 'center'}}>
          <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
            <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} pb="70%">
                <FormControl>
                    <FormLabel color="white">Nomor Kartu</FormLabel>
                    <Input
                        type="text"
                        id="kartu"
                        name="kartu"
                        onChange={formik.handleChange}
                        value={formik.values.kartu}
                    />
                </FormControl>

                <Button type="submit" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Submit</Button>
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