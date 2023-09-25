'use client';
import { FC, useMemo, useState } from 'react';
import styles from './page.module.css';
import SnakeGame from '@/snake/SnakeGame';

const Home = () => {
  const snakeGame = useMemo(() => new SnakeGame(5, 5), []);
  const [, setState] = useState(0);

  return (
    <main className={styles.main}>
      {snakeGame.getBoard().map((row: any, index: any) => (
        <div key={index} style={{ display: 'flex', gap: '8px' }}>
          {row.map((cell: any, index: any) => (
            <div key={`${index}_${cell.cellType}`} style={{ width: '8px' }}>
              {cell.cellType}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => snakeGame.startGame(setState)}>start</button>
      <button onClick={() => snakeGame.endGame()}>stop</button>
    </main>
  );
};

export default Home;
