import { Button } from 'antd';
import React from 'react'
import CardContainer from '~/components/molecules/Game/CardContainer'
import { useMemoryCards } from '~/contexts/memoryContext';

const Game = () => {
  const { startGame, turn } = useMemoryCards();
  return (
    <div>
      <div className='text-center'>
        <h1 className='text-primary text-2xl font-semibold mb-3'>Memory Game</h1>
        <button className=' border-2 border-secondary border-solid px-2 py-1 rounded-lg hover:bg-violet-200' onClick={startGame}>Start a New Game</button>
      </div>
      <h2 className='text-md font-medium'>Turn : {turn}</h2>
      <CardContainer />
    </div>
  );
}

export default Game