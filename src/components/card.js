import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Card() {
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
          <div key={card.id}>
          <div>pin = {card.pin}</div>
          <div>nomor kartu = {card.noKartu}</div>
          <div>exp Kartu = {card.cardExp}</div>
          <div>Limit Debit = {card.nominalLimit}</div>
          <div>Limit Deposit = {card.deposit}</div>
        </div>
        ))}
      </div>

      
    );
  };

  return <>{userCard && renderCard()}</>;
}
