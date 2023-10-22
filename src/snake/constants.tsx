import Image from 'next/image';
import { CellType, Direction, PositionByDirectionDictionary } from './types';

export const positionByDirectionDictionary: PositionByDirectionDictionary = {
  [Direction.UP]: {
    row: -1,
    col: 0,
    rotate: 0,
  },
  [Direction.RIGHT]: {
    row: 0,
    col: 1,
    rotate: 90,
  },
  [Direction.DOWN]: {
    row: 1,
    col: 0,
    rotate: 180,
  },
  [Direction.LEFT]: {
    row: 0,
    col: -1,
    rotate: 270,
  },
};

export const C_SIZE = '32';
export const imagesDictionary = {
  [CellType.EMPTY]: ' ',
  [CellType.SNAKE_HEAD]: (
    <Image src="/snake/head.png" alt="head" width={C_SIZE} height={C_SIZE} />
  ),
  [CellType.SNAKE_BODY]: (
    <Image src="/snake/body.png" alt="body" width={C_SIZE} height={C_SIZE} />
  ),
  [CellType.SNAKE_TAIL]: (
    <Image src="/snake/tail.png" alt="tail" width={C_SIZE} height={C_SIZE} />
  ),
  [CellType.FOOD]: (
    <Image src="/snake/food.png" alt="food" width={C_SIZE} height={C_SIZE} />
  ),
};
