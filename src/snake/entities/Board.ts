import Cell from './Cell';
import Snake from './Snake';
import { BodyPosition, CellType } from '../types';

class Board {
  private rows: number;
  private cols: number;
  private board: Cell[][] = [];
  private snake: Snake;

  constructor(rows: number = 25, cols: number = 25, snake: Snake) {
    this.rows = rows;
    this.cols = cols;
    this.snake = snake;

    this.initializeBoard();
    this.renderSnake();
    this.placeFood();
  }

  getBoard() {
    return this.board;
  }

  private initializeBoard() {
    this.board = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => new Cell(CellType.EMPTY)),
    );
  }

  private renderSnake() {
    for (const bodyPosition of this.snake.getBodyPositions()) {
      const [row, col] = bodyPosition;
      this.board[row][col].setCellType(CellType.SNAKE);
    }
  }

  private placeFood() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.cols);

    while (this.board[row][col].getCellType() === CellType.SNAKE) {
      row = Math.floor(Math.random() * this.rows);
      col = Math.floor(Math.random() * this.cols);
    }

    this.board[row][col].setCellType(CellType.FOOD);
  }

  private isFoodEaten(position: BodyPosition) {
    const [row, col] = position;
    return this.board[row][col].getCellType() === CellType.FOOD;
  }

  tick() {
    const nextPosition = this.snake.nextPosition();

    if (this.snake.isIntercept(nextPosition)) return true;

    if (this.isFoodEaten(nextPosition)) {
      this.placeFood();
    } else {
      const removedPosition = this.snake.removeLastPosition();
      if (removedPosition) {
        const [row, col] = removedPosition;
        this.board[row][col].setCellType(CellType.EMPTY);
      }
    }

    this.snake.addNewPosition(nextPosition);
    this.renderSnake();
    return false;
  }
}

export default Board;
