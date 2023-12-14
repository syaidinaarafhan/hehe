import { Link, Button, Box, VStack, Image,} from "@chakra-ui/react";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

/*
formik -> handle form
yup -> validate
tanstack-query -> manage api calls (cahcing, state, dll);
*/

export default function Home() {

  return (
    <>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="register">Register</Link>
            </Button>
            <Button colorScheme='gray' variant='ghost'>
              <Link href="login">Login</Link>
            </Button>
    </>
  )
}
