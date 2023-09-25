export enum CellType {
  EMPTY = '.',
  SNAKE = '+',
  FOOD = 'x',
}

export enum Direction {
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
}

export type BodyPosition = [row: number, col: number];

export type Listener = () => void;
