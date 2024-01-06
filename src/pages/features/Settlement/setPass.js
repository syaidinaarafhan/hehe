import { axiosInstance } from "@/lib/axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, Button, Box, VStack, Image, Stack, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

export default function setPass() {

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
  <p>Password : 0000</p>
    <Box display="flex" flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto" h="550">
      <VStack spacing={3} bg={"#cd6600"} p="-10" pb={160}>
        <Box boxSize="70%">
          <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
            objectFit="cover"
          />
        </Box>

        <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4}>
            <FormControl pb="5">
                <FormLabel>Password</FormLabel>
                <Input
                    type="text"
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
            <Button type="submit" colorScheme="gray">Submit</Button>
        </Stack>
    </form>

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