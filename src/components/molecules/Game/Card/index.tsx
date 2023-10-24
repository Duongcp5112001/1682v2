import React from 'react';
import { IMemoryCard } from '~/types/index';
import cover from '~/assets/images/cover.png'
import styles from './styles.module.scss'
type ICardProps = {
  card: IMemoryCard;
  onClick: (card: IMemoryCard) => void;
  disabled: boolean;
};

const Card = (props: ICardProps) => {
  const { card, onClick, disabled } = props;
  const className = `${card.isFlipped ? styles.flipped : ''}`;

  const handleClick = () => {
    if (!disabled) {
      onClick(card);
    }
  };

  return (
    <div className={styles.card}>
      <div className={className}>
        <img className={styles.front} src={card.image} alt={card.name} />
        <img
          className={styles.back}
          src={cover}
          alt='Card Cover'
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;