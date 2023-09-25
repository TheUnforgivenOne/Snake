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

  setCellRotation(row: number, col: number, rotation: number = 0) {
    this.board[row][col].setCellRotation(rotation);
  }

  private initializeBoard() {
    this.board = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => new Cell(CellType.EMPTY)),
    );
  }

  renderSnake(positions: BodyPosition[]) {
    for (const [index, position] of positions.entries()) {
      const [row, col] = position;
      let newCellType: CellType;
      if (index === 0) {
        newCellType = CellType.SNAKE_TAIL;
      } else if (index === positions.length - 1) {
        newCellType = CellType.SNAKE_HEAD;
      } else {
        newCellType = CellType.SNAKE_BODY;
      }

      this.board[row][col].setCellType(newCellType);
    }
  }

  placeFood() {
    let row = Math.floor(Math.random() * this.rows);
    let col = Math.floor(Math.random() * this.cols);

    while (
      [CellType.SNAKE_HEAD, CellType.SNAKE_BODY, CellType.SNAKE_TAIL].includes(
        this.board[row][col].getCellType(),
      )
    ) {
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
