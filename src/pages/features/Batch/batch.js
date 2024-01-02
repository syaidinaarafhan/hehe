import { Container, Heading, Link, Button, Box, Image, Text, VStack} from "@chakra-ui/react";import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

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
      <Heading color="darkgray">Summary</Heading>
      </Container>
      </Box>

      <Box bg="#222935" p={2} style={{ display: 'flex', justifyContent: 'center'}}>
                <VStack spacing={3} align="stretch" bg="#222935" p={5} justifyContent="center">
          <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
                  '&:hover': {
                      backgroundColor: 'white', color: '#222935'},
                      }}>
                <Link href = "../Batch/Find/find">Find</Link>
              </Button>
              <Button colorScheme='gray.800' variant='ghost' color='white' sx={{
                  '&:hover': {
                      backgroundColor: 'white', color: '#222935'},
                      }}>
                <Link href = "../Batch/Void/void">Void</Link>
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
