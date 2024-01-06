import { Container, Heading, Link, Button, Box, Image, VStack, Toast} from "@chakra-ui/react";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";

export default function index() {
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
              <Button colorScheme='gray' variant='ghost' mb="10px">
                <Link href = "insertC/insertCard">Sale</Link>
              </Button>
              <Button colorScheme='gray' variant='ghost' mb="10px">
                <Link href = "transactions/OpenCard/openCard">Open Card</Link>
              </Button>
              <Button colorScheme='gray' variant='ghost' mb="10px">
                <Link href = "transactions/Offline/approvalC">Offline</Link>
              </Button>
              <Button colorScheme='gray' variant='ghost' mb="10px">
                <Link href = "transactions/Release/approvalC">Release</Link>
              </Button>
              <Button colorScheme='gray' variant='ghost' mb="10px">
                <Link href = "transactions/Manual/cardN">Manual Transaction</Link>
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