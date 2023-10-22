"use client"
import { FC, useState } from 'react';
import Info from './_components/Info';
import Settings from './_components/Settings';

import SnakeGame from '@/snake/SnakeGame';
import { imagesDictionary } from '@/snake/constants';
import classes from './page.module.css';
import { Binds } from '@/snake/types';

const SnakePage: FC = () => {
  // Function to force react component re-render on snake position change
  const [, forceUpdate] = useState(true);
  const rerender = () => forceUpdate((prev) => !prev);
  const newGame = (settings?: Binds) =>
    new SnakeGame(rerender, 10, 10, settings);
  const [snakeGame, setSnakeGame] = useState(() => newGame());

  const resetGame = (settings?: Binds) => {
    snakeGame.settings.unbind();
    setSnakeGame(() => newGame(settings));
  };

  return (
    <div className={classes.layout}>
      <div className={classes.utilitiesLayout}>
        <Info />
        <Settings
          settings={snakeGame.settings.getSettings()}
          onUpdate={resetGame}
        />
      </div>
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
            {/* <button onClick={() => resetGame()}>Try again</button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakePage;
