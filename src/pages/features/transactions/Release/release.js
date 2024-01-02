import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRelease } from "../../Mutate/useRelease";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/router";
import { ArrowLeftIcon, HamburgerIcon, ArrowRightIcon } from '@chakra-ui/icons';
import Card from "@/components/card";
import ReceiptModal from "@/components/receipt";

export default function InsertCard() {
  const router = useRouter();

  const [isiKartu, setIsiKartu] = useState(null);
  const [wrongPinAttempts, setWrongPinAttempts] = useState(0);

  useEffect(() => {
    axiosInstance.get('/api/getData')
      .then(response => {
        setIsiKartu(response.data.isiKartu);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const pin1 = isiKartu?.pin ?? 'Data gaada';
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      pin: "",
    },
    onSubmit: async (values) => {
      if (!formik.values.pin) {
        toast({
          title: "PIN harus diisi",
          status: "error",
        });
      } else if (values.pin !== pin1) {
        setWrongPinAttempts(wrongPinAttempts + 1);
        if (wrongPinAttempts >= 2) {
          toast({
            title: "Percobaan PIN sudah mencapai batas. Silakan coba lagi nanti.",
            status: "error",
          });
          router.push('/');
        } else {
          toast({
            title: "PIN tidak sesuai. Percobaan ke-" + (wrongPinAttempts + 1),
            status: "error",
          });
        }
      } else {
        CreateProduct({});
        toast({
          title: "Transaction done",
          status: "success",
        });
        setReceiptData(0);
        router.push('/dashboard');
      }
    },
  });

  const [insertCardData, setReceiptData] = useState(null);

  const { mutate: CreateProduct, isLoading: createProductsIsLoading } =
    useRelease({
      onSuccess: (receiptData) => {
        console.log("Data Receipt:", receiptData);
        setReceiptData(receiptData.data.data);
        refetchProducts();
      },
    });

  return (
    <>
      <Card />
      <Box flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
        <VStack spacing={3} bg={"#cd6600"} p="-10">
          <Box boxSize="70%">
            <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
              objectFit="cover"
            />
          </Box>

          <Box pb="50%">
            <form onSubmit={formik.handleSubmit}>
              <FormControl pb="5">
                <FormLabel>PIN</FormLabel>
                <Input color="white"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="pin"
                  id="pin"
                  value={formik.values.pin}
                />
              </FormControl>
              {createProductsIsLoading ? (
                <Spinner />
              ) : (
                <Button type="submit" bg="gray">Submit Product</Button>
              )}
            </form>
          </Box>
        </VStack>
       
      </Box>
      <Box bg="gray.800" color="darkgray" py={6}>
      <Container maxW="container.lg">
        <Text textAlign="center">&copy; 2023 Syaidina Arafhan & Atthariq Maulana. All rights reserved.</Text>
      </Container>
    </Box>
    </>
  );
}
