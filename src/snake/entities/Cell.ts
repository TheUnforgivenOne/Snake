import { CellType } from '../types';

class Cell {
  private cellType: CellType = CellType.EMPTY;
  private rotation: number = 0;

  constructor(cellType: CellType) {
    this.cellType = cellType;
  }

  getCellType() {
    return this.cellType;
  }

  setCellType(newCellType: CellType) {
    this.cellType = newCellType;
  }

  getCellRotation() {
    return this.rotation;
  }

  setCellRotation(rotation: number = 0) {
    this.rotation = rotation;
  }
}

export default Cell;
