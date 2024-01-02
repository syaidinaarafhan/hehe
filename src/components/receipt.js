import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from "@chakra-ui/react";

const ReceiptModal = ({ isOpen, onClose, modalReceiptData }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" bg="gray.800" color="gray.800">
      <ModalHeader color="gray">Receipt</ModalHeader>
      <ModalCloseButton />
      <ModalBody marginBottom="10px" color="white" alignItems="left" >
        <p>{modalReceiptData ? modalReceiptData.kartu : 'Data tidak tersedia'}</p>
        <p>traceNumber : {modalReceiptData ? modalReceiptData.traceNumber : 'Data tidak tersedia'}</p>
        <p>Tanggal : {modalReceiptData ? modalReceiptData.date : 'Data tidak tersedia'}</p>
        <p>refNumber : {modalReceiptData ? modalReceiptData.refNumber : 'Data tidak tersedia'}</p>
        <p>Total Harga: {modalReceiptData ? modalReceiptData.totalHarga : 'Data tidak tersedia'}</p>
        <Button onClick={() => onClose()} marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>OK</Button>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ReceiptModal;
