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
          title: 'Transaksi Ditemukan',
          status: 'success',
          isClosable: true,
        });

        onTransactionFound(transactionData);
      }
    } catch (error) {
      toast({
        title: 'Transaksi Tidak Ditemukan',
        status: 'error',
        isClosable: true,
      });
      console.error("Error fetching transaction data:", error);
    }
  };

  const formik = useFormik({
    initialValues: { apprCode: "" },
    onSubmit: handleFormSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl pb="8">
            <FormLabel color="white" marginBottom="15px">approval Code</FormLabel>
            <Input color="white"
              type="number"
              name="apprCode"
            value={formik.values.apprCode}
            onChange={formik.handleChange}
            />
          </FormControl>



        <Button type='submit' colorScheme='gray' variant='ghost' color='white' marginBottom= '10' sx={{
    '&:hover': {
      backgroundColor: 'white',
      color: '#222935',
    },
  }}>
          Find Transaction
        </Button>

    </form>
  );
};

export default ApprovalCodeForm;
