import { CellType } from '../types';

class Cell {
  private cellType: CellType = CellType.EMPTY;
  private rotation: number = 0;

  constructor(cellType: CellType) {
    this.cellType = cellType;
  }

  getCellType(): CellType {
    return this.cellType;
  }

  setCellType(newCellType: CellType): void {
    this.cellType = newCellType;
  }

  getCellRotation(): number {
    return this.rotation;
  }

  setCellRotation(rotation: number): void {
    this.rotation = rotation;
  }
}

export default Cell;
