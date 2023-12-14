import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm ApprovalCode</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onConfirm}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
