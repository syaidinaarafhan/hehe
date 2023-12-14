import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button } from "@chakra-ui/react";

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

export default ReceiptModal;
