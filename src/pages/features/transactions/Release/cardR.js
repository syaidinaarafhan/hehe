import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, Input, Stack, Text, Image, Box, VStack } from '@chakra-ui/react';
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
                router.push('approvalC');
            }else{
            router.push('/');
            }
        }
    });

    return (
        <>
        
        <Box flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
            <VStack spacing={3} bg={"#cd6600"} p="-10">
                <Box boxSize="70%">
                    <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
                    objectFit="cover"
                    />
                </Box>

        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} pb="70%">
                <FormControl>
                    <FormLabel>Kartu</FormLabel>
                    <Input
                        type="text"
                        id="kartu"
                        name="kartu"
                        onChange={formik.handleChange}
                        value={formik.values.kartu}
                    />
                </FormControl>

                <Button type="submit" bg="gray">Submit</Button>
            </Stack>
        </form>

            </VStack>
        <Box display="flex" justifyContent="space-between" pt={4}>
            <ArrowLeftIcon color={"white"}></ArrowLeftIcon>
            <HamburgerIcon color={"white"}></HamburgerIcon>
            <ArrowRightIcon color={"white"}></ArrowRightIcon>
        </Box>
        </Box>
        <p>Nama Kartu : {kartu1}</p>
        </>
    )
}