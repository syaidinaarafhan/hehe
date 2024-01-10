import { useToast, FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Link, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { useEffect, useState, Fragment } from 'react';
import { axiosInstance } from "@/lib/axios"
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";

/*
formik -> handle form
yup -> validate
tanstack-query -> manage api calls (cahcing, state, dll);
*/

export default function Home() {

  return (
    <>
     <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
  <Container maxW="container.lg" textAlign="center">
    <Heading color="darkgray">SALE</Heading>  
  </Container>
    </Box>
    <Card />
    <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
          <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
        
          <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
              '&:hover': {
                backgroundColor: 'white',
                color: '#222935',},}}>
                <Link href = "../Summary/audit">Audit</Link>
              </Button>
              <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#222935',},}}>
                <Link href = "../Summary/summary">Summary</Link>
              </Button>
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
