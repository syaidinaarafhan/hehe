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
    Box, VStack, Image
  } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCreateProduct } from "@/pages/features/Mutate/useCreateTransaksi";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/router";
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
  
  export default function InsertCard() {

    const router = useRouter()

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

  const pin1 = isiKartu?.pin ?? 'Data gaada'

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
        if (!formik.values.pin) {
          toast({
            title: "PIN harus diisi",
              status: "error",
          });
        }else if (values.pin !== pin1) {
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
         }else{
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
         }
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
            setReceiptData(0);
            router.push('/');
          }}
          modalReceiptData={insertCardData}
        />
      <Box pb="50%">
        <form onSubmit={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}>
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
          {createProductsIsLoading ? (
            <Spinner />
          ) : (
            <Button type="submit" bg="gray">Submit Product</Button>
          )}
        </form>
        </Box>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter PIN</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>PIN</FormLabel>
                <Input
                  type="password"
                  onChange={handleFormInput}
                  name="pin"
                  id="pin"
                  value={formik.values.pin}
                />
              </FormControl>
              <Button type="button" onClick={formik.submitForm}>
                Confirm
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>

          </VStack>
          <Box display="flex" justifyContent="space-between" pt={4}>
            <ArrowLeftIcon color={"white"}></ArrowLeftIcon>
            <HamburgerIcon color={"white"}></HamburgerIcon>
            <ArrowRightIcon color={"white"}></ArrowRightIcon>
          </Box>
        </Box>

        <p>{pin1}</p>
      </>
    );
  }
  