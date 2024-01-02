import { Link, Button, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";

export default function index() {
    return (
        <>
<Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">Transaksi</Heading>
      
    </Container>
  </Box>

  <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center'}}>
  <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',},}}>
         <Link href = "insertC/cardV">Sale</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',},}}>
         <Link href = "transactions/OpenCard/openCard">Open Card</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',},}}>
         <Link href = "transactions/Offline/approvalC">Offline</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',},}}>
         <Link href = "transactions/Release/cardR">Release</Link>
      </Button>
      <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',},}}>
          <Link href = "transactions/Manual/cardN">Manual Transaction</Link>
      </Button>
    </VStack>
    </Box>
          
          <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
        </>
    )
}