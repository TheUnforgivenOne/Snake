import { SnakeBinds, Direction } from '@/snake/types';

let binds: SnakeBinds = {
  [Direction.UP]: 'ArrowUp',
  [Direction.RIGHT]: 'ArrowRight',
  [Direction.DOWN]: 'ArrowDown',
  [Direction.LEFT]: 'ArrowLeft',
}

export const getBinds = async () => {
  return await Promise.resolve().then(() => binds);
};

export const saveBinds = async (newBinds: SnakeBinds) => {
  binds = newBinds;
  console.log('post', binds);
};
