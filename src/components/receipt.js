import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Text, Heading } from "@chakra-ui/react";

const ReceiptModal = ({ isOpen, onClose, modalReceiptData }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent display="flex" flexDirection="column"justifyContent="center" bg="gray.800" color="gray.800">
      <ModalHeader ></ModalHeader>
      <Heading color="white" as= 'h5' textAlign="center" >Receipt</Heading>
      <ModalCloseButton />
      <ModalBody marginBottom="10px" color="white" alignItems="left" >
        <Text marginTop='5'>traceNumber : {modalReceiptData ? modalReceiptData.traceNumber : 'Data tidak tersedia'}</Text>
        <Text>Tanggal : {modalReceiptData ? modalReceiptData.date : 'Data tidak tersedia'}</Text>
        <Text fontWeight= "Bold" textAlign= "right" fontSize= '1.2em' marginTop= '5'>Total Transaksi: {modalReceiptData ? modalReceiptData.totalHarga : 'Rp.2000'}</Text>
        <Button onClick={() => onClose()} marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>OK</Button>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ReceiptModal;
