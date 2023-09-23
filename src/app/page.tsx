'use client';
import { Board } from '@/snake/Snake';
import styles from './page.module.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Direction } from '@/snake/types';

const Home = () => {
  const [moves, setMoves] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | undefined>();
  const snakeGame = useMemo(() => new Board(25, 25), []);

  useEffect(() => {
    if (snakeGame) {
      console.log(snakeGame);
      const handleArrowPressed = (e: KeyboardEvent) => {
        switch (e.code) {
          case 'ArrowUp':
            snakeGame.snake.setDirection(Direction.UP);
            return;
          case 'ArrowRight':
            snakeGame.snake.setDirection(Direction.RIGHT);
            return;
          case 'ArrowDown':
            snakeGame.snake.setDirection(Direction.DOWN);
            return;
          case 'ArrowLeft':
            snakeGame.snake.setDirection(Direction.LEFT);
            return;
          default:
        }
      };
      document.addEventListener('keydown', handleArrowPressed);
    }
  }, [snakeGame]);

  return (
    <main className={styles.main}>
      {!snakeGame
        ? 'load'
        : snakeGame.board.map((row, index) => (
            <div key={index} style={{ display: 'flex', gap: '8px' }}>
              {row.map((cell, index) => (
                <div key={`${index}_${cell.cellType}`} style={{ width: '8px' }}>
                  {cell.cellType}
                </div>
              ))}
            </div>
          ))}
      <button
        onClick={() => {
          intervalId.current = setInterval(() => {
            setMoves((m) => m + 1);
            snakeGame.move();
          }, 200);
        }}
      >
        start
      </button>
      <button onClick={() => clearInterval(intervalId.current)}>stop</button>
      {snakeGame.snake.direction}
    </main>
  );
};

export default Home;
