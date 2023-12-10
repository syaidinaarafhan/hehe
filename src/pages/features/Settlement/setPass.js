import { axiosInstance } from "@/lib/axios";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link, Button, Box, VStack, Image, Stack, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";
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
            router.push('settlement');
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
    <p>Password : {pass}</p>
    </>
    )
}