import { Link, Button, Box, VStack, Container, Heading, Text, Image} from "@chakra-ui/react";
import lphImage from './logo/lph.png';
/*
formik -> handle form
yup -> validate
tanstack-query -> manage api calls (cahcing, state, dll);
*/

export default function Home() {

  return (
    <div>
           <Box bg="gray.800" py={6} px={4} boxShadow="lg" width="100%">
    <Container maxW="container.lg" textAlign="center">
      <Heading color="darkgray">SELAMAT DATANG</Heading>
      
    </Container>
  </Box>
  


            <Box bg="#222935" p={10} style={{ display: 'flex', justifyContent: 'center'}}>
            <Box bg="gray.800" color="white" py={4}>
              <Container maxW="container.lg">
            <Heading as="h2" size="lg" textAlign="center" mb={4}>
              My-Idisii
            </Heading>
            <Text textAlign="left" mb={6}>
            My-Idisii merupakan sebuah aplikasi berbasis web yang dikembangkan oleh mahasiswa D3 Rekayasa Perangkat Lunak Aplikasi 
            untuk mempermudah kegiatan pembelajaran menggunakan simulasi mesin EDC (Electronic Data Capture). Tujuan utama dari pengembangan aplikasi ini adalah untuk memungkinkan para pengguna, termasuk mahasiswa, praktisi, atau siapa pun yang tertarik, mempelajari dan memahami secara mendalam bagaimana mesin EDC beroperasi dalam berbagai konteks.</Text>
            <Text>
            Aplikasi ini menyediakan berbagai simulasi yang mendetail dan interaktif, memungkinkan pengguna untuk secara praktis memahami proses kerja dari mesin EDC. Melalui fitur-fitur yang tersedia, pengguna dapat mengakses beragam informasi yang berkaitan dengan penggunaan mesin EDC, mulai dari proses transaksi hingga manajemen data yang terkait.</Text>
            <Text>My-Idisii bukan hanya sekadar aplikasi belajar, tetapi juga merupakan platform yang mendukung pemahaman mendalam terkait peran serta pentingnya teknologi EDC dalam era digital saat ini. 
            Dengan adanya platform ini, diharapkan para pengguna akan semakin percaya diri dan terampil dalam menerapkan pengetahuan yang didapat dalam kegiatan sehari-hari, termasuk dalam lingkup bisnis, transaksi keuangan, serta pemanfaatan teknologi informasi secara luas.
            </Text>
              </Container>
            </Box>
            </Box>

           <Box bg="#222935" p={2} style={{ display: 'flex', justifyContent: 'center'}}>
                <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
                <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
                  '&:hover': {
                      backgroundColor: 'white', color: '#222935'},
                      }}>
                    <Link href="register">Registrasi</Link>
                  </Button>
                <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
                  '&:hover': {
                      backgroundColor: 'white', color: '#222935'},
                      }}>
                    <Link href="login">Log-in</Link>
                  </Button>
                  </VStack>
            </Box>

            <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2024 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
    </div>
  )
}

