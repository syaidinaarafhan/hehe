import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Button, Container, Heading, FormControl, FormLabel, Input, Stack, Text , Box, VStack, Image} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

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
                router.push('insertCard');
            }else{
            router.push('/');
            }
        }
    });

    return (
        <>
         <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">SALE</Heading>  
    </Container>
      </Box>

<Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} pb="70%">
            <FormControl pb="5">
              <FormLabel color="white" marginBottom="15px">Kartu</FormLabel>
              <Input color="white"
                        type="text"
                        id="kartu"
                        name="kartu"
                        onChange={formik.handleChange}
                        value={formik.values.kartu}
                    />
                </FormControl>
                <Button type="submit" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Konfirmasi</Button>
                <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Text textAlign="left" mb={6}>
           Sale merupakan metode yang sering kita gunakan dalam transaksi sehari hari. biasanya diawali dengan validasi kartu pengguna dengan istilah 'gesek',
           lalu kasir akan memasukan nominal pembelian, dan terakhir validasi pembayaran menggunakan password pengguna.</Text>
            <Text textAlign="left" mb={6}>
              Berhati-hatilah ketika anda melakukan transaksi, karena jumlah kegagalan memasukan password hanya dapat dilakukan sebanyak 3 kali.
              </Text>
              </Container>
            </Box>
            </Box>
            </Stack>
        </form>   
          </VStack>
          
        </Box>

        <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>

        <p>Nama Kartu : {kartu1}</p>
        </>
    )
}