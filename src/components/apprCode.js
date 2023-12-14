// ApprovalCodeForm.js
import React from 'react';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';

const ApprovalCodeForm = ({ onTransactionFound }) => {
  const toast = useToast();

  const handleFormSubmit = async (values) => {
    try {
      const response = await axiosInstance.get(`/approvalCode/${values.apprCode}`);
      const transactionData = await response.data;

      if (transactionData) {
        toast({
          title: 'Transaction Found',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });

        onTransactionFound(transactionData);
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const formik = useFormik({
    initialValues: { apprCode: "" },
    onSubmit: handleFormSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl pb="5">
        <FormLabel>approvalCode</FormLabel>
        <Input
          type="text"
          name="apprCode"
          value={formik.values.apprCode}
          onChange={formik.handleChange}
        />
        <Button mt={4} colorScheme="gray" type="submit">
          Find Transaction
        </Button>
      </FormControl>
    </form>
  );
};

export default ApprovalCodeForm;
