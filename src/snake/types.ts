export enum CellType {
  EMPTY = '.',
  SNAKE_HEAD = '+',
  SNAKE_BODY = '|',
  SNAKE_TAIL = '-',
  FOOD = 'x',
}

export enum Direction {
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
}

export type Position = { row: number; col: number; rotation: number };

export type PositionByDirection = {
  row: number;
  col: number;
  rotate: number;
};
export type PositionByDirectionDictionary = {
  [key in Direction]: PositionByDirection;
};

export type Binds = { [key in Direction]: string };
