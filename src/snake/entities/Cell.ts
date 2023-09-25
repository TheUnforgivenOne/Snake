import { CellType } from '../types';

class Cell {
  private cellType: CellType = CellType.EMPTY;

  constructor(cellType: CellType) {
    this.cellType = cellType;
  }

  getCellType() {
    return this.cellType;
  }

  setCellType(newCellType: CellType) {
    this.cellType = newCellType;
  }
}

export default Cell;
