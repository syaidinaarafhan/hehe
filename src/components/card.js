import { axiosInstance } from '@/lib/axios';
import { Box, Text, Container } from '@chakra-ui/react';
import { useEffect, useState } from "react";

export default function Card({ onCardPinClick }) {
  const [userCard, setUserCard] = useState(null);

  useEffect(() => {
    // Assuming axiosInstance is properly defined
    axiosInstance
      .get('/cards')
      .then((response) => {
        const cardData = response.data;
        if (response.status === 200) {
          setUserCard(cardData);
        } else {
          console.error('Error fetching user cards:', response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderCard = () => {
    return (
      <div>
        {userCard.map((card) => (
          <Box key={card.id} bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'right' }}>
            <Box bg="gray.800" color="white" py={4} justifyContent="center" borderRadius="lg" boxShadow="md" width="400" marginRight={10}>
              <Container maxW="container.lg">
                <Text color="white" textAlign="left">
                  <span style={{ fontSize: '0.9em' }}>Limit: Rp. {card.nominalLimit}</span>
                  <span style={{ fontSize: '0.9em', marginLeft: '80px'}}>Deposit: Rp. {card.deposit}</span><br />
                  <br />
                </Text>
                <Text color="white" marginRight={40}>
                  <span style={{ fontSize: '0.9em', textAlign: 'right' }}>PIN: {card.pin}</span><br />
                  <span style={{ fontSize: '0.9em', textAlign: 'right' }}> Berlaku Hingga: {card.cardExp}</span><br />
                  <br />
                </Text>
                <Text color="white" textAlign="right">
                  <span style={{ fontWeight: 'Bold', marginBottom: '8px', fontSize: '1em', textAlign: 'center' }}> {card.noKartu}</span><br />
                  <span style={{ fontSize: '1em', textAlign: 'center' }}>Password : 0000</span>
                </Text>
              </Container>
            </Box>
          </Box>
        ))}
      </div>
    );
  };

  return <>{userCard && renderCard()}</>;
}