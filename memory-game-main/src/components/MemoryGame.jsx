import { shuffle } from 'lodash';
import { useState, useEffect } from 'react';

const MemoryGame = ({ images }) => {

  const allcards = [...images, ...images];
  const [shuffledCards, setShuffledCards] = useState([]);
  useEffect(() => { setShuffledCards(shuffle(allcards)); }, []);

  return (
    <div>
      <h1>Memory Game</h1>
      <div className="cardGrid">
        {shuffledCards.map((image) => (
          <div className="card">
            <img
            src={image}
            className="shuffledCards"
          />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;

