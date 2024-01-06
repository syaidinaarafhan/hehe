import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, Input, Stack, Text, Box, Image, VStack } from '@chakra-ui/react';
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
        <Card />

        <Box display="flex" flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
            <VStack spacing={3} bg={"#cd6600"} p="-10">
                <Box boxSize="70%">
                    <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
                    objectFit="cover"
                    />
                </Box>

            <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4} pb="70%">
                <FormControl>
                    <FormLabel>cardExpiry</FormLabel>
                    <Input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        onChange={formik.handleChange}
                        value={formik.values.cardExpiry}
                    />
                </FormControl>

                <Button type="submit">Submit</Button>
            </Stack>
        </form>

            </VStack>
        <Box display="flex" justifyContent="space-between" pt={4}>
            <ArrowLeftIcon color={"white"}></ArrowLeftIcon>
            <HamburgerIcon color={"white"}></HamburgerIcon>
            <ArrowRightIcon color={"white"}></ArrowRightIcon>
          </Box>
        </Box>
        </>
    )
}