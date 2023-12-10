import { axiosInstance } from '@/lib/axios';
import { TabList, Tabs, Box, Tab } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function audit() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
          try {
            const response = await axiosInstance("/audit");
            setTransactions(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchTransactions();
      }, []);

    return (
        <>
        <div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <Tabs>
               <Box display="flex" flexDirection="column">
                <TabList>

                Kartu: {transaction.kartu}
                Total Harga: {transaction.totalHarga}
                Trace Number : {transaction.traceNumber},
                
                </TabList>
                </Box>
            </Tabs>
            
            
            
            
          </li>
        ))}
      </ul>
    </div>
        </>
    )
}