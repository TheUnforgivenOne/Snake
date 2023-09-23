import { CellType, Direction, BodyPosition } from './types';

const positionDiffsDictionary = {
  [Direction.UP]: {
    row: -1,
    col: 0,
  },
  [Direction.RIGHT]: {
    row: 0,
    col: 1,
  },
  [Direction.DOWN]: {
    row: 1,
    col: 0,
  },
  [Direction.LEFT]: {
    row: 0,
    col: -1,
  },
};

class Cell {
  cellType: CellType = CellType.EMPTY;

  constructor(cellType: CellType) {
    this.cellType = cellType;
  }
}

class Snake {
  rows: number;
  cols: number;
  bodyPositions: BodyPosition[] = [];
  direction: Direction = Direction.UP;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;

    const centerBoardPosition = {
      row: Math.floor(rows / 2),
      col: Math.floor(cols / 2),
    };

    for (
      let currentBodyRow = centerBoardPosition.row + 1;
      currentBodyRow >= centerBoardPosition.row - 1;
      currentBodyRow--
    ) {
      this.bodyPositions.push([currentBodyRow, centerBoardPosition.col]);
    }
  }

  setDirection(newDirection: Direction) {
    this.direction = newDirection;
  }

  getNewRow(row: number, diff: number) {
    const newRow = row + diff;

    if (newRow < 0) return this.rows - 1;
    if (newRow > this.rows - 1) return 0;

    return newRow;
  }

  getNewCol(col: number, diff: number) {
    const newCol = col + diff;

    if (newCol < 0) return this.cols - 1;
    if (newCol > this.cols - 1) return 0;

    return newCol;
  }

  nextMove() {
    const [row, col] = this.getHeadPosition();
    const positionDiffs = positionDiffsDictionary[this.direction];

    const newPosition: BodyPosition = [
      this.getNewRow(row, positionDiffs.row),
      this.getNewCol(col, positionDiffs.col),
    ];

    this.bodyPositions.push(newPosition);
  }

  removeLastBodyPosition() {
    return this.bodyPositions.shift();
  }

  getHeadPosition() {
    return this.bodyPositions[this.bodyPositions.length - 1];
  }
}

export class Board {
  rows: number;
  cols: number;
  board: Cell[][];
  snake: Snake;

  constructor(rows: number = 25, cols: number = 25) {
    this.rows = rows;
    this.cols = cols;
    this.board = new Array(rows)
      .fill(undefined)
      .map(() =>
        new Array(cols).fill(undefined).map(() => new Cell(CellType.EMPTY)),
      );

    this.snake = new Snake(rows, cols);
    this.renderSnake();
    this.placeFood();
  }

  renderSnake() {
    for (const bodyPosition of this.snake.bodyPositions) {
      const [row, col] = bodyPosition;
      this.board[row][col].cellType = CellType.SNAKE;
    }
  }

  clearBoard() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.board[row][col].cellType = CellType.EMPTY;
      }
    }
  }

  placeFood() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.cols);

    while (this.board[row][col].cellType === CellType.SNAKE) {
      row = Math.floor(Math.random() * this.rows);
      col = Math.floor(Math.random() * this.cols);
    }

    this.board[row][col].cellType = CellType.FOOD;
  }

  move() {
    this.snake.nextMove();
    if (
      this.snake.bodyPositions.some(
        ([row, col]) => this.board[row][col].cellType === CellType.FOOD,
      )
    ) {
      this.placeFood();
    } else {
      const removedPosition = this.snake.removeLastBodyPosition();
      if (removedPosition) {
        const [row, col] = removedPosition;
        this.board[row][col].cellType = CellType.EMPTY;
      }
    }
    this.renderSnake();
  }
}
