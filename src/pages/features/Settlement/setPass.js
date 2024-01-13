import { axiosInstance } from "@/lib/axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useToast, FormControl, FormLabel, Stack, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export default function SetPass() {

    const router = useRouter();
    const toast = useToast();

    const [isPinValid, setPinValid] = useState(true);


  const formik = useFormik({
    initialValues: {
        password: '',
    },onSubmit: values => {
        if (values.password == '0000') {
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
  <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
                  <Container maxW="container.lg" textAlign="center" display="flex" alignItems="center" justifyContent="center">
                    <Box flex="1" textAlign="left"> 
                      <Heading as="h1" color="darkgray">Summary</Heading>
                    </Box>
                  </Container>
                </Box>

     <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center' }}>
              <VStack spacing={6} align="stretch" bg="#222935" p={5} justifyContent="center" maxW="container.lg" width="100%">
        <form onSubmit={formik.handleSubmit}>
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
            <Button type="submit" colorScheme='gray.800' variant='ghost' color='white' sx={{
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#222935',},}}>Submit</Button>
        
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