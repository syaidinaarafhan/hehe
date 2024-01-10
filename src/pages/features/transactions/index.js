import { Link, Button, Box, VStack, Image, Container, Heading, Text, Grid, GridItem} from "@chakra-ui/react";
import Card from "@/components/card";

export default function index() {
    return (
        <>
<Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%" display="flex" alignItems="center" justifyContent="space-between">
  <Container maxW="container.lg" textAlign="center" display="flex" alignItems="center" justifyContent="center">
    <Box flex="1" textAlign="left"> 
      <Heading as="h1" color="darkgray">Transaction</Heading>
    </Box>
    <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
      '&:hover': {backgroundColor: 'white',color: '#222935',},}}>
          <Link href="../dataTransaksi">History</Link>
        </Button>
  </Container>
</Box>

  <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
              <Heading as="h2" size="lg" textAlign="center" mb={4}>
              My-Idisii
            </Heading>
            <Text textAlign="left" mb={6}>
            Terdapat berbagai metode transaksi yang dapat dilakukan oleh anda. Seluruh pembayaran akan 
            dilakukan via kartu kredit, sehingga setiap transaksi yang dilakukan akan mengurangi jumlah saldo anda.
            Ketika akan melakukan transaksi, pastikan seluruh validasi dan otentikasi yang anda inputkan sudah benar, 
            agar aplikasi proses berjalannya transaksi tidak terhambat
            </Text>
              </Container>
            </Box>
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
        <Text textAlign="center">&copy; 2024 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
        </>
    )
}