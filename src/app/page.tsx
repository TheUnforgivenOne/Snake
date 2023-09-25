'use client';
import { useState } from 'react';
import SnakeGame from '@/snake/SnakeGame';
import { C_SIZE, imagesDictionary } from '@/snake/constants';
import styles from './page.module.css';

const Home = () => {
  // Function to force react component re-render on snake position change
  const [, forceUpdate] = useState(true);
  const newGame = () => {
    const updateFn = () => forceUpdate((prev) => !prev);
    const game = new SnakeGame(updateFn, 10, 10);
    game.startCountDown();
    return game;
  };

  const [snakeGame, setSnakeGame] = useState(() => newGame());

  const resetGame = () => setSnakeGame(() => newGame());

  return (
    <main className={styles.main}>
      <div
        style={{
          position: 'relative',
          padding: '32px',
        }}
      >
        <div
          style={{
            border: '1px solid #000',
          }}
        >
          {snakeGame.getBoard().map((row, index) => (
            <div key={index} style={{ display: 'flex' }}>
              {row.map((cell, index) => {
                const cellImage = imagesDictionary[cell.getCellType()];
                const imageRotation = cell.getCellRotation();
                return (
                  <div
                    key={index}
                    style={{
                      width: `${C_SIZE}px`,
                      height: `${C_SIZE}px`,
                      transform: `rotate(${imageRotation}deg)`,
                    }}
                  >
                    {cellImage}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div>Score: {snakeGame.getSnakeLength()}</div>
        <button onClick={() => snakeGame.startGame()}>start</button>
        <button onClick={() => snakeGame.endGame()}>end</button>
        {snakeGame.countDown > 0 && (
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
            <h2>{snakeGame.countDown}</h2>
          </div>
        )}
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
