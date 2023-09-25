import { BodyPosition, Direction } from '../types';
import { positionByDirectionDictionary } from '../constants';

class Snake {
  private rows: number;
  private cols: number;
  private bodyPositions: BodyPosition[] = [];
  private direction: Direction = Direction.UP;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.initializeSnake();
  }

  getDirection() {
    return this.direction;
  }

  setDirection(newDirection: Direction) {
    this.direction = newDirection;
  }

  getBodyPositions() {
    return this.bodyPositions;
  }

  addNewPosition(newPosition: BodyPosition) {
    this.bodyPositions.push(newPosition);
  }

  removeLastPosition() {
    return this.bodyPositions.shift();
  }

  // Place snake (length 3) vertically at the center of the board
  private initializeSnake() {
    const centerBoardPosition = {
      row: Math.floor(this.rows / 2),
      col: Math.floor(this.cols / 2),
    };

    [1, 0, -1].forEach((diff) => {
      this.bodyPositions.push([
        centerBoardPosition.row + diff,
        centerBoardPosition.col,
      ]);
    });
  }

  // Handle snake exit out from the board
  private validateCoordinate(
    coordinate: number,
    coordinateType: 'col' | 'row',
  ) {
    const maxValue = coordinateType === 'col' ? this.cols : this.rows;

    if (coordinate < 0) return maxValue - 1;
    if (coordinate > maxValue - 1) return 0;
    return coordinate;
  }

  nextPosition() {
    const positionDiffs = positionByDirectionDictionary[this.direction];

    const headPosition = this.bodyPositions[this.bodyPositions.length - 1];
    const [row, col] = headPosition;

    const newPosition: BodyPosition = [
      this.validateCoordinate(row + positionDiffs.row, 'row'),
      this.validateCoordinate(col + positionDiffs.col, 'col'),
    ];

    return newPosition;
  }

  // Check if snake has crashed into itself
  isIntercept(position: BodyPosition) {
    const [checkedRow, checkedCol] = position;
    return this.bodyPositions.some(
      ([row, col]) => row === checkedRow && col === checkedCol,
    );
  }
}

export default Snake;
