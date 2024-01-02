import { axiosInstance } from "@/lib/axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, Button, Box, VStack, Image, Stack, FormControl, FormLabel, Input, useToast, Container, Text, Heading} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export default function setPass() {

    const router = useRouter();
    const toast = useToast();

    const [isiKartu, setIsiKartu] = useState(null);
    const [isPinValid, setPinValid] = useState(true);
    const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
    const [enteredPassword, setEnteredPassword] = useState("");

  useEffect(() => {
    axiosInstance.get('/api/getData')
      .then(response => {
        setIsiKartu(response.data.isiKartu);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const pass = isiKartu?.password ?? "Data gaada";

  const formik = useFormik({
    initialValues: {
        password: '',
    },onSubmit: values => {
        if (values.password == pass) {
          toast({
            title: "Password Benar!!",
            status: "success",
          });
            router.push('unsettle');
        }else{
          setPinValid(false);
          toast({
            title: "Password tidak sesuai, Silahkan coba lagi",
            status: "error",
          });
          return;
        }
    }
});

return (
    <>
    <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Insert Card</Heading>  
    </Container>
      </Box>
      <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">

        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
            <FormControl pb="5">
                <FormLabel color="white">Password</FormLabel>
                <Input color="white"
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
            </FormControl>
            {!isPinValid && (
              <p style={{ color: "red" }}>

              </p>
            )}
           <Button type="button" onClick={formik.submitForm} marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>Confirm</Button>
        </Stack>
    </form>

    </VStack>
    </Box>

    <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
    <p>Password : {pass}</p>
    </>
    )
}