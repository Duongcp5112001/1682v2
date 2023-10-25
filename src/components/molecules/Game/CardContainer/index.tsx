import Card from '~/components/molecules/Game/Card';
import { useMemoryCards } from '~/contexts/memoryContext';
import { message  } from 'antd'
import styles from './styles.module.scss'

const CardContainer = () => {
  const { cards, handleCardItemClick, disabledCards, checkWin, turn, startGame } = useMemoryCards();
  if (checkWin()) {
    message.success('You won')
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '1rem',
      margin: '20px auto',
      maxWidth: 'fit-content'
    }}>
      {cards.map((card, index) => (
        <Card
          card={card}
          key={card?.id || index}
          onClick={handleCardItemClick}
          disabled={disabledCards}
        />
      ))}
    </div>
  );
};

export default CardContainer;