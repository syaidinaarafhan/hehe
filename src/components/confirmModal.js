import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    bg="gray.800" 
    color="gray.800" 
  >
        <ModalHeader color="gray">Confirm ApprovalCode</ModalHeader>
        <ModalCloseButton />
        <ModalBody marginBottom="10px">
          Are you sure?
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onConfirm} marginTop="20px"colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}}>
            Confirm
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
