import { CellType, Direction } from './types';
import Board from './entities/Board';
import Snake from './entities/Snake';
import { positionByDirectionDictionary } from './constants';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

class SnakeGame {
  gameOver: boolean = false;
  countDown: number = 3;
  private board: Board;
  private snake: Snake;
  private updateFn: () => void;

  constructor(updateFn: () => void, rows: number = 25, cols: number = 25) {
    this.board = new Board(rows, cols);
    this.snake = new Snake(rows, cols);
    this.updateFn = updateFn;

    this.board.renderSnake(this.snake.getBodyPositions());
  }

  getBoard() {
    return this.board.getBoard();
  }

  getSnakeLength() {
    return this.snake.getBodyPositions().length;
  }

  bindKeys() {
    const handleArrowPressed = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
          this.snake.setDirection(Direction.UP);
          return;
        case 'ArrowRight':
          this.snake.setDirection(Direction.RIGHT);
          return;
        case 'ArrowDown':
          this.snake.setDirection(Direction.DOWN);
          return;
        case 'ArrowLeft':
          this.snake.setDirection(Direction.LEFT);
          return;
        default:
      }
    };
    document.addEventListener('keydown', handleArrowPressed);
  }

  async startCountDown() {
    while (this.countDown !== 0) {
      this.countDown -= 1;
      this.updateFn();
      await sleep(1000);
    }

    this.bindKeys();
    this.board.placeFood();
    this.startGame();
  }

  async startGame(tickMs: number = 200) {
    while (!this.gameOver) {
      this.nextTick();
      this.updateFn();
      await sleep(tickMs);
    }
  }

  endGame() {
    this.gameOver = true;
    this.updateFn();
  }

  private nextTick() {
    const nextPosition = this.snake.nextPosition();

    // Check if snake bites itself
    if (this.snake.isIntercept(nextPosition)) {
      this.gameOver = true;
      return;
    }

    if (this.board.isFoodEaten(nextPosition)) {
      this.board.placeFood();
    } else {
      const removedPosition = this.snake.removeLastPosition();
      if (removedPosition) {
        const [row, col] = removedPosition;
        this.board.setCellType(row, col, CellType.EMPTY);
      }
    }

    const cellRotation =
      positionByDirectionDictionary[this.snake.getDirection()].rotate;
    this.board.setCellRotation(nextPosition[0], nextPosition[1], cellRotation);
    this.snake.addNewPosition(nextPosition);
    this.board.renderSnake(this.snake.getBodyPositions());
  }
}

export default SnakeGame;
