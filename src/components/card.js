import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Card({ onCardPinClick }) {
  const [userCard, setUserCard] = useState(null);

  useEffect(() => {
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
          <Box bg="#222935" p={5} style={{ display: 'flex', justifyContent: 'center' }}>
          <Box bg="gray.800" color="white" py={4} justifyContent="center" borderRadius="lg" boxShadow="md" width="400" marginRight={10}>
            <Container maxW="container.lg">
              {userData && (
                <Text color="white" textAlign= "center">
                  <span style={{ fontSize: '0.9em'}}>ID Kartu: {userData.idKartu}</span><br />
                  <br/>
                </Text>
              )} 
              {userData && (
                <Text color="white" marginRight={40} >
                  <span style={{ fontSize: '0.9em', textAlign: 'right' }}>PIN: {userData.pin}</span><br/>
                  <span style={{ fontSize: '0.9em', textAlign: 'right' }}> Berlaku Hingga: {userData.expKartu}</span><br />
                  <br/>
                </Text>
              )} 
              {userData && (
                <Text color="white" textAlign="right">
                  <span style={{ fontWeight: 'Bold', marginBottom: '8px', fontSize: '1em', textAlign: 'center' }}> {userData.nomorKartu}</span><br />
                  <span style={{ fontWeight: 'bold', fontSize: '1.2em', textTransform: 'uppercase', textAlign: 'center' }}>{userData.name}</span>
                </Text>
              )} 
            </Container>
          </Box>
        
        </Box>
        ))}
      </div>
    );
  };

  return <>{userCard && renderCard()}</>;
}
