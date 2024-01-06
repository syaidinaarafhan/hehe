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
  const [userCard, setUserCard] = useState(null);

  const fetchCards = () => {
    axiosInstance
      .get('/cards')
      .then((response) => {
        setUserCard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const renderCard = () => {
    if (userCard) {
      return (
        <div>
          {userCard.map((card) => (
            <div key={card.id}>
              <div>pin = {card.pin}</div>
              <div>nomor kartu = {card.noKartu}</div>
              <div>exp Kartu = {card.cardExp}</div>
              <div>Limit Debit = {card.nominalLimit}</div>
              <div>Limit Deposit = {card.deposit}</div>
            </div>
          ))}
        </div>
      );
    }
  };

  const pin = userCard && userCard.length > 0 ? userCard[0].pin : null;

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
      } else if (values.pin !== pin.toString()) {
        setWrongPinAttempts(wrongPinAttempts + 1);
        if (wrongPinAttempts >= 2) {
          toast({
            title: "Percobaan PIN sudah mencapai batas. Silakan coba lagi nanti.",
            status: "error",
          });
          router.push('/dashboard');
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
                <Input
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
        <Box display="flex" justifyContent="space-between" pt={4}>
          <ArrowLeftIcon color={"white"}></ArrowLeftIcon>
          <HamburgerIcon color={"white"}></HamburgerIcon>
          <ArrowRightIcon color={"white"}></ArrowRightIcon>
        </Box>
      </Box>

    </>
  );
}
