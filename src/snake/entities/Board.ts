import Cell from './Cell';
import { Position, CellType } from '../types';

class Board {
  private rows: number;
  private cols: number;
  private board: Cell[][] = [];

  constructor(rows: number = 25, cols: number = 25) {
    this.rows = rows;
    this.cols = cols;
    this.initializeBoard();
  }

  getBoard(): Cell[][] {
    return this.board;
  }

  getCellType(position: Position): CellType {
    return this.board[position.row][position.col].getCellType();
  }

  getCellRotation(position: Position): number {
    return this.board[position.row][position.col].getCellRotation();
  }

  setCellType(position: Position, cellType: CellType): void {
    this.board[position.row][position.col].setCellType(cellType);
  }

  setCellRotation(position: Position, rotation: number = 0): void {
    this.board[position.row][position.col].setCellRotation(rotation);
  }

  private initializeBoard(): void {
    this.board = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => new Cell(CellType.EMPTY)),
    );
  }

  renderSnake(positions: Position[]): void {
    for (const [index, position] of positions.entries()) {
      let newCellType: CellType;
      if (index === 0) {
        newCellType = CellType.SNAKE_TAIL;
      } else if (index === positions.length - 1) {
        newCellType = CellType.SNAKE_HEAD;
      } else {
        newCellType = CellType.SNAKE_BODY;
      }

      this.setCellType(position, newCellType);
      this.setCellRotation(position, position.rotation);
    }
  }

  placeFood(): void {
    const foodPosition: Position = {
      row: Math.floor(Math.random() * this.rows),
      col: Math.floor(Math.random() * this.cols),
      rotation: 0,
    };

    while (
      [CellType.SNAKE_HEAD, CellType.SNAKE_BODY, CellType.SNAKE_TAIL].includes(
        this.getCellType(foodPosition),
      )
    ) {
      foodPosition.row = Math.floor(Math.random() * this.rows);
      foodPosition.col = Math.floor(Math.random() * this.cols);
    }

    this.setCellType(foodPosition, CellType.FOOD);
  }

  isFoodEaten(position: Position): boolean {
    return this.getCellType(position) === CellType.FOOD;
  }
}

export default Board;
