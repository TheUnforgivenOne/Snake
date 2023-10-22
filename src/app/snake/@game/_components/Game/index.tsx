'use client';
import { FC, useEffect, useState } from 'react';

import SnakeGame from '@/snake/SnakeGame';
import { imagesDictionary } from '@/snake/constants';
import { SnakeBinds } from '@/snake/types';
import classes from './Game.module.css';

const BOARD_SIZE = 10;

const Game: FC<{ binds: SnakeBinds }> = ({ binds }) => {
  // Function to force react component re-render on snake position change
  const [, forceUpdate] = useState(true);
  const rerender = () => forceUpdate((prev) => !prev);

  const newGame = () => new SnakeGame(rerender, BOARD_SIZE, BOARD_SIZE, binds);

  const [snakeGame, setSnakeGame] = useState(() => newGame());

  const resetGame = () => {
    snakeGame.settings.unbind();
    setSnakeGame(() => newGame());
  };

  useEffect(() => {
    binds && resetGame();
  }, [binds]);

  return (
    <div className={classes.gameLayout}>
      <div className={classes.board}>
        {snakeGame.getBoard().map((row, index) => (
          <div key={index} style={{ display: 'flex' }}>
            {row.map((cell, index) => {
              const cellImage = imagesDictionary[cell.getCellType()];
              const imageRotation = cell.getCellRotation();
              return (
                <div
                  key={index}
                  className={classes.cell}
                  style={{ transform: `rotate(${imageRotation}deg)` }}
                >
                  {cellImage}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>Score: {snakeGame.getScore()}</div>
      <button onClick={() => snakeGame.startGame()}>start</button>
      <button onClick={() => snakeGame.endGame()}>end</button>
      {snakeGame.countDown > 0 && (
        <div className={classes.fade}>
          <h2>{snakeGame.countDown}</h2>
        </div>
      )}
      {snakeGame.gameOver && (
        <div className={classes.fade}>
          <h2>Game over</h2>
          <div>Score: {snakeGame.getScore()}</div>
          <button onClick={() => resetGame()}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
