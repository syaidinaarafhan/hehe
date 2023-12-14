import { Link, Button, Box, VStack, Image,} from "@chakra-ui/react";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import Cookies from 'js-cookie';
import Card from "@/components/card";

/*
formik -> handle form
yup -> validate
tanstack-query -> manage api calls (cahcing, state, dll);
*/

export default function dashboard() {

  const [userData, setUserData] = useState(null);
  const [userCards, setUserCards] = useState(null);

  useEffect(() => {
    axiosInstance.get('/dashboard', {
    })
      .then((response) => {
        const dataUser = response.data;
  
        if (response.status === 200) {
          setUserData(dataUser.user);
        } else {
          console.error(dataUser.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
    <div>
        <h1>Dashboard</h1>
        {userData && <p>Welcome, {userData.name}!</p>}
      </div>
      <Card />
        <Box display="flex" flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
          <VStack spacing={3} bg={"#cd6600"} p="-10">
          <Box boxSize="70%">
            <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
              objectFit="cover"
            />
          </Box>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="../features/insertC/insertCard">Insert Card</Link>
            </Button>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="../features/transactions/">Transaction</Link>
            </Button>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="../features/QR/qr">QR</Link>
            </Button>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="../features/Batch/batch">Batch</Link>
            </Button>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="../features/Summary/sumpage">Summary</Link>
            </Button>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="../features/Settlement/setPass">Settlement</Link>
            </Button>
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
