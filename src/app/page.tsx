'use client';
import { useState } from 'react';
import SnakeGame from '@/snake/SnakeGame';
import styles from './page.module.css';

const Home = () => {
  // Function to force react component re-render on snake position change
  const [, forceUpdate] = useState(true);
  const createGame = () => {
    const updateFn = () => forceUpdate((prev) => !prev);
    return new SnakeGame(updateFn, 25, 25);
  };

  const [snakeGame, setSnakeGame] = useState(createGame());

  const resetGame = () => {
    setSnakeGame(createGame());
  };

  return (
    <main className={styles.main}>
      <div style={{ position: 'relative', padding: '32px' }}>
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
        <div>Score: {snakeGame.getSnakeLength()}</div>
        <button onClick={() => snakeGame.startGame()}>start</button>
        <button onClick={() => snakeGame.endGame()}>end</button>
        {snakeGame.gameOver && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#FFF',
              textAlign: 'center',
            }}
          >
            <h2>Game over</h2>
            <div>Score: {snakeGame.getSnakeLength()}</div>
            <button onClick={resetGame}>Try again</button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
