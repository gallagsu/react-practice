import { shuffle } from 'lodash';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import useLocalStorage from "./UseLocalStorage";

export default function MemoryGame({ images }) {
  // 1) Build your 2× deck
  const allCards = [...images, ...images];

  // 2) State hooks
  const [shuffledCards, setShuffledCards] = useState([]);                     // shuffled full set of cards
  const [flipped,       setFlipped]       = useState([]);                     // indexes currently face-up
  const [matched,       setMatched]       = useState(new Set());              // indexes already matched
  const [guesses,       setGuesses]       = useState(0);                      // count guesses
  const [highScore,     setHighScore]     = useLocalStorage("highscore", 0);  // track high score

  // 3) Shuffle once on mount
  useEffect(() => {
    setShuffledCards(shuffle(allCards));
  }, [images]);

  // 4) Start/reset the game
  function startGame() {
    setMatched(new Set());
    setFlipped([]);
    setShuffledCards(shuffle(allCards));
    setGuesses(0);
  }

  // 5) Handle a card click
  function handleCardClick(idx) {
    // ignore if already flipped/matched, or two are already up
    if (flipped.includes(idx) || matched.has(idx) || flipped.length === 2) {
      return;
    }

    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    // once two cards are flipped, check match/mismatch
    if (nextFlipped.length === 2) {
      
      setGuesses(prev => prev + 1);
      const [a, b] = nextFlipped;
      const isMatch = shuffledCards[a] === shuffledCards[b];

      if (isMatch) {
        // add both indexes to the matched set
        setMatched(prev => new Set(prev).add(a).add(b));
      }

      // clear the flipped array after animation (600ms)
      setTimeout(() => {
        setFlipped([]);
      }, 600);
    }
  }

  // 6) Set high score when the game is finished
  useEffect(() => {
      if (matched.size === 12 && (highScore == 0 || guesses<highScore)) {
        setHighScore(guesses);
      }
    }, [matched.size, guesses]); 

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <button className="startButton" onClick={startGame}>
        Start Game
      </button>
      <p>Guess this round: {guesses}</p>
      <p>High score: {highScore}</p>

      <div className="cardGrid">
        {shuffledCards.map((src, idx) => {
          // is this card face-up?
          const isFlipped = flipped.includes(idx) || matched.has(idx);

          // determine if we should animate this one
          let animation = '';
          if (flipped.length === 2 && flipped.includes(idx)) {
            const [a, b] = flipped;
            animation = shuffledCards[a] === shuffledCards[b]
              ? 'match'
              : 'mismatch';
          }

          //check if the game is over
          if(matched.size === 12) {
            animation = 'surprise';
          }

          // compose your existing CSS classes
          const cardClass = classNames(
            'card',
            animation,              // adds 'match' or 'mismatch' if set
            { revealed: isFlipped } // adds 'revealed' when face-up
          );

          return (
            <div
              key={idx}
              className={cardClass}
              onClick={() => handleCardClick(idx)}
            >
              <img
                src={src}
                alt=""
                className="cardImage"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}