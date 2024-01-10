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
          title: 'Transaksi Ditemukan',
          status: 'success',
          isClosable: true,
        });

        onTransactionFound(transactionData);
      }else {
        toast({
          title: 'Transaksi Tidak Ditemukan',
          status: 'error',
          isClosable: true,
        });
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
      <FormLabel color="white" marginBottom="10px">Trace Number</FormLabel>
        <Input color="white"
          type="text"
          name="traceNumber"
          value={formik.values.traceNumber}
          onChange={formik.handleChange}
        />
        <Button marginTop="20px" colorScheme='gray.800' variant='ghost' color='white' sx={{'&:hover': {backgroundColor: 'white', color: '#222935' },}} type="submit" >Telusuri</Button>
      </FormControl>
    </form>
  );
};

export default FindTransactionForm;
