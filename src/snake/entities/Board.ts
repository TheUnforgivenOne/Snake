import Cell from './Cell';
import { BodyPosition, CellType } from '../types';

class Board {
  private rows: number;
  private cols: number;
  private board: Cell[][] = [];

  constructor(rows: number = 25, cols: number = 25) {
    this.rows = rows;
    this.cols = cols;

    this.initializeBoard();
  }

  getBoard() {
    return this.board;
  }

  setCellType(row: number, col: number, cellType: CellType) {
    this.board[row][col].setCellType(cellType);
  }

  private initializeBoard() {
    this.board = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => new Cell(CellType.EMPTY)),
    );
  }

  renderSnake(positions: BodyPosition[]) {
    for (const position of positions) {
      const [row, col] = position;
      this.board[row][col].setCellType(CellType.SNAKE);
    }
  }

  placeFood() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.cols);

    while (this.board[row][col].getCellType() === CellType.SNAKE) {
      row = Math.floor(Math.random() * this.rows);
      col = Math.floor(Math.random() * this.cols);
    }

    this.board[row][col].setCellType(CellType.FOOD);
  }

  isFoodEaten(position: BodyPosition) {
    const [row, col] = position;
    return this.board[row][col].getCellType() === CellType.FOOD;
  }
}

export default Board;
