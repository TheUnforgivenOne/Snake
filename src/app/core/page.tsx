'use client';
import Playground from '@/core/Playground';
import { Direction } from '@/core/types';
import { FC, useEffect, useMemo, useState } from 'react';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Core: FC = () => {
  const playground = useMemo(() => new Playground(), []);
  // console.log(game);
  const [frameId, setFrameId] = useState<number>();

  const frame = async (time: number) => {
    await sleep(50);
    const newFrameId = requestAnimationFrame(frame);
    playground.nextFrame();
    setFrameId(newFrameId);
  };

  const startAnimation = () => {
    requestAnimationFrame(frame);
  };

  const stopAnimation = () => {
    frameId && cancelAnimationFrame(frameId);
  };

  useEffect(() => {
    return () => stopAnimation();
  }, []);

  useEffect(() => {
    const handleArrowPressed = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
          playground.directions.add(Direction.UP);
          return;
        case 'ArrowRight':
          playground.directions.add(Direction.RIGHT);
          return;
        case 'ArrowDown':
          playground.directions.add(Direction.DOWN);
          return;
        case 'ArrowLeft':
          playground.directions.add(Direction.LEFT);
          return;
        default:
      }
    };
    const handleArrowReleased = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
          playground.directions.delete(Direction.UP);
          return;
        case 'ArrowRight':
          playground.directions.delete(Direction.RIGHT);
          return;
        case 'ArrowDown':
          playground.directions.delete(Direction.DOWN);
          return;
        case 'ArrowLeft':
          playground.directions.delete(Direction.LEFT);
          return;
        default:
      }
    };
    document.addEventListener('keydown', handleArrowPressed);
    document.addEventListener('keyup', handleArrowReleased);
    return () => {
      document.removeEventListener('keydown', handleArrowPressed);
      document.removeEventListener('keyup', handleArrowReleased);
    };
  }, [playground]);

  return (
    <div>
      <div>
        {playground.board.map((row, yIndex) => (
          <div key={yIndex} style={{ display: 'flex' }}>
            {row.map((cell, xIndex) => {
              // console.log(cell.type);
              return (
                <div key={xIndex} style={{ height: '20px', width: '20px' }}>
                  {cell.getImage()}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button onClick={startAnimation}>Go</button>
      <button onClick={stopAnimation}>Stop</button>
    </div>
  );
};

export default Core;
