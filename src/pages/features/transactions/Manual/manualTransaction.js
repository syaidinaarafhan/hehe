import {
    useToast,
    FormControl,
    FormLabel,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
    Box,
    VStack,
  } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCreateProduct } from "@/pages/features/Mutate/useCreateTransaksi";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/router";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";
  
  export default function InsertCard() {

    const router = useRouter()

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
    const [isModalOpen, setModalOpen] = useState(false);
  
    const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value);
    };
  
    const formik = useFormik({
      initialValues: {
        totalHarga: "",
        pin: "",
      },
      onSubmit: async (values) => {
          const { totalHarga} = formik.values;
        CreateProduct({
          totalHarga: parseInt(totalHarga),
        });
  
        toast({
          title: "Transaction done",
          status: "success",
        });
        formik.setValues({
          totalHarga: "",
          pin: "",
        });
        setModalOpen(false);
      },
    });

    const [insertCardData, setReceiptData] = useState(null);
  
    const { mutate: CreateProduct, isLoading: createProductsIsLoading } =
    useCreateProduct({
      onSuccess: (receiptData) => {
        console.log("Data Receipt:", receiptData);
        setReceiptData(receiptData.data.data);
        refetchProducts();
      },      
    });

    const ReceiptModal = ({ isOpen, onClose, modalReceiptData }) => (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Receipt</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{modalReceiptData ? modalReceiptData.kartu : 'Data tidak tersedia'}</p>
            <p>traceNumber : {modalReceiptData ? modalReceiptData.traceNumber : 'Data tidak tersedia'}</p>
            <p>Tanggal : {modalReceiptData ? modalReceiptData.date : 'Data tidak tersedia'}</p>
            <p>refNumber : {modalReceiptData ? modalReceiptData.refNumber : 'Data tidak tersedia'}</p>
            <p>Total Harga: {modalReceiptData ? modalReceiptData.totalHarga : 'Data tidak tersedia'}</p>
            <Button onClick={() => onClose()}>OK</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  
    return (
      <>
      <Box flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
          <VStack spacing={3} bg={"#cd6600"} p="-10">
            <Box boxSize="70%">
                <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
                objectFit="cover"
                />
            </Box>

        <ReceiptModal
          isOpen={insertCardData !== null}
          onClose={() => {
            router.push('/dashboard');
          }}
          modalReceiptData={insertCardData}
        />
    <Box pb="50%">
        <form onSubmit={formik.handleSubmit}>
          <FormControl pb="5">
            <FormLabel>Harga</FormLabel>
            <Input
              type="number"
              onChange={handleFormInput}
              name="totalHarga"
              id="totalHarga"
              value={formik.values.totalHarga}
            />
          </FormControl>
            <Button type="submit" bg="gray">Submit Product</Button>
        </form>
        </Box>  
          </VStack>
      </Box>

      </>
    );
} 