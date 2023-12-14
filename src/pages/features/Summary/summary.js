import { useState, useEffect } from 'react';
import { Box, Text, Button, useToast } from '@chakra-ui/react';
import { axiosInstance } from '@/lib/axios';

const Summary = () => {
  const toast = useToast();
  const [totalHarga, setTotalHarga] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/summary');
        setTotalHarga(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch summary data',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, []);

  return (
      <Text fontSize="lg" mb={4}>
        Total Harga: {totalHarga ?? 'Loading...'}
      </Text>
  );
};

export default Summary;
