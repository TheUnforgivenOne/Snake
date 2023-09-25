'use client';
import { useState } from 'react';
import styles from './page.module.css';
import SnakeGame from '@/snake/SnakeGame';

const Home = () => {
  // Function to force react component re-render on snake position change
  const [, forceUpdate] = useState(true);
  const updateFn = () => forceUpdate((prev) => !prev);

  const [snakeGame] = useState(() => new SnakeGame(updateFn, 5, 5));

  return (
    <main className={styles.main}>
      {snakeGame.getBoard().map((row, index) => (
        <div key={index} style={{ display: 'flex', gap: '8px' }}>
          {row.map((cell, index) => (
            <div
              key={`${index}_${cell.getCellType()}`}
              style={{ width: '8px' }}
            >
              {cell.getCellType()}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => snakeGame.startGame()}>start</button>
      <button onClick={() => snakeGame.endGame()}>stop</button>
    </main>
  );
};

export default Home;
