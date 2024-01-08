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
    Box,
    Image,
    VStack,
  } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCreateProduct } from "@/pages/features/Mutate/useCreateTransaksi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from 'qrcode.react';
import { HamburgerIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import Card from "@/components/card";
import ReceiptModal from "@/components/receipt";


  export default function InsertCard() {

    const router = useRouter()
    const toast = useToast();

    const [isReceiptOpen, setReceiptOpen] = useState(null);
    const [isQrModalOpen, setQrModalOpen] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState(null);
    const [insertCardData, setReceiptData] = useState(null);
  
    const handleFormInput = (event) => {
      formik.setFieldValue(event.target.name, event.target.value);
    };

    const formik = useFormik({
      initialValues: {
        totalHarga: "",
      },
      onSubmit: async () => {
        const { totalHarga } = formik.values;
  
        const qrCodeData = {
          totalHarga: parseInt(totalHarga),
        };
  
        const qrCodeString = JSON.stringify(qrCodeData);
        setQrCodeValue(qrCodeString);
  
        setQrModalOpen(true);
      },
    });
  
    const QrCodeModal = ({ isOpen, onClose, qrCodeValue }) => {
      const handleClose = () => {
        CreateProduct({
          totalHarga: parseInt(formik.values.totalHarga),
        });
  
        toast({
          title: "Transaction done",
          status: "success",
        });
  
        formik.setValues({
          totalHarga: "",
        });
  
        onClose();
  
        setReceiptOpen(true);
      };
  
      return (
        <Modal isOpen={isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>QR Code</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {qrCodeValue && <QRCode value={qrCodeValue} />}
              <Button onClick={handleClose}>OK</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      );
    };
  
    const { mutate: CreateProduct, isLoading: createProductsIsLoading } = useCreateProduct({
      onSuccess: (receiptData) => {
        console.log("Data Receipt:", receiptData);
        setReceiptData(receiptData.data.data);
        refetchProducts();
      },
    });
  
    return (
      <>
      <Card/>
        <Box display="flex" flexDirection="column" bg="black" pb="10" pt="7" pr={3} pl={3} m={100} w="auto">
          <VStack spacing={3} bg={"#cd6600"} p="-10">
          <Box boxSize="70%">
            <Image src='http://pinisichoir.mhs.unm.ac.id/wp-content/uploads/sites/4/2018/02/Bank-Mandiri-Logo-Vector-Image.png'
              objectFit="cover"
            />
          </Box>

      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => {
          router.push('/dashboard');
        }}
        modalReceiptData={insertCardData}
      />

      <QrCodeModal isOpen={isQrModalOpen} onClose={() => 
        setQrModalOpen(false)} 
        qrCodeValue={qrCodeValue} 
      />
  <Box pb="50%">
      <form onSubmit={formik.handleSubmit}>
        <FormControl pb="5">
          <FormLabel>Amout</FormLabel>
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
