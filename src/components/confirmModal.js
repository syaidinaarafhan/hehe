import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="#222935">
        <ModalHeader color="white">Konfirmasi</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Anda yakin?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onConfirm}>
            Konfirmasi
          </Button>
          <Button onClick={onClose}>Kembali</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
