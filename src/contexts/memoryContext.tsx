import { createContext, useState, useContext, useEffect } from 'react';
import { IMemoryCard } from '~/types/index';
import { CardArray } from '~/utils/fakedb';

type MemoryProviderType = {
  children: React.ReactNode;
};

type MemoryContextType = {
  cards: IMemoryCard[];
  setCards: React.Dispatch<React.SetStateAction<IMemoryCard[]>>;
  startGame: () => void;
  turn: number;
  handleCardItemClick: (card: IMemoryCard) => void;
  disabledCards: boolean;
  checkWin: () => boolean;
};

const initialState = {
  cards: CardArray as IMemoryCard[],
  setCards: () => {},
  startGame: () => {},
  turn: 0,
  handleCardItemClick: () => {},
  disabledCards: false,
  checkWin: () => false
};

const MemoryContext = createContext<MemoryContextType>(initialState);

const MemoryProvider = ({ children }: MemoryProviderType) => {
  const [cards, setCards] = useState<any>(initialState.cards);
  const [turn, setTurn] = useState<number>(initialState.turn);
  const [choiceOne, setChoiceOne] = useState<IMemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<IMemoryCard | null>(null);
  const [disabledCards, setDisabledCards] = useState<boolean>(false);

  const checkWin = () => {
    const isWin = cards.every((card: any) => card.isMatched);
    return isWin;
  };

  /**
   * @description
   * This function is used to start the game
   * It shuffles the cards and sets the turn to 0
   * @returns void
   */
  const shuffleCards = () => {
    const shuffledCards = [...CardArray, ...CardArray]
      .sort(() => Math.random() - 0.5)
      .map(card => {
        return { ...card, id: Math.random() };
      });

    setCards(shuffledCards);
  };

  /**
   * @description
   * This function is used to handle the click event on the card
   * It flips the card and checks if the card is a match
   * @param card
   */
  const handleCardItemClick = (card: IMemoryCard) => {
    if (!disabledCards) {
      setCards((prevCard: any) =>
        prevCard.map((c: any) => {
          if (c.id === card.id) {
            card.isFlipped = true;
            return card;
          }
          return c;
        })
      );
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  /**
   * @description
   * This function is used to reset the cards
   * @returns void
   */
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(prevTurn => prevTurn + 1);
    setDisabledCards(false);
  };

  /**
   * @description
   * This function is used to start the game
   * It shuffles the cards and sets the turn to 0
   * @returns void
   */
  const startGame = () => {
    shuffleCards();
    setTurn(0);
  };

  /**
   * @description
   * This function is used to check if the cards are a match
   * @returns void
   */
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabledCards(true);
      if (choiceOne.image === choiceTwo.image) {
        setCards((prevCards: any)=>
          prevCards.map((card: any)=> {
            if (card.id === choiceOne?.id || card.id === choiceTwo?.id) {
              card.isMatched = true;
              card.isFlipped = true;
            }
            return card;
          })
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prevCard: any )=> {
            return prevCard.map((card: any )=> {
              if (!card.isMatched) {
                return { ...card, isFlipped: false };
              }
              return card;
            });
          });
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  /**
   * @description
   * This function is used to check if the cards are a match
   * @returns void
   */
  useEffect(() => {
    shuffleCards();
  }, []);

  const value = {
    cards,
    setCards,
    startGame,
    turn,
    handleCardItemClick,
    disabledCards,
    checkWin
  };

  return (
    <MemoryContext.Provider value={value}>{children}</MemoryContext.Provider>
  );
};

const useMemoryCards = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemoryCards must be used within a MemoryProvider');
  }
  return context;
};

export { MemoryContext, MemoryProvider, useMemoryCards };