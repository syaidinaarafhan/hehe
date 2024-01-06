import React from 'react';
import { useFormik } from 'formik';
import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';

const FindTransactionForm = ({ onTransactionFound }) => {
  const toast = useToast();

  const handleFormSubmit = async (values) => {
    try {
      const response = await axiosInstance.get(`/find/${values.traceNumber}`);
      const transactionData = await response.data.data;

      if (transactionData) {
        toast({
          title: 'Transaction Found',
          status: 'success',
          isClosable: true,
        });

        onTransactionFound(transactionData);
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  };

  const formik = useFormik({
    initialValues: { traceNumber: "" },
    onSubmit: handleFormSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl pb="5">
        <FormLabel>traceNumber</FormLabel>
        <Input
          type="text"
          name="traceNumber"
          value={formik.values.traceNumber}
          onChange={formik.handleChange}
        />
        <Button mt={4} colorScheme="gray" type="submit">
          Find Transaction
        </Button>
      </FormControl>
    </form>
  );
};

export default FindTransactionForm;
