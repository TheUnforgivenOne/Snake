import { CellType, Direction } from './types';
import Board from './entities/Board';
import Snake from './entities/Snake';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

class SnakeGame {
  gameOver: boolean = false;
  countDown: number = 3;
  private board: Board;
  private snake: Snake;
  private rerender: () => void;

  constructor(rerender: () => void, rows: number = 25, cols: number = 25) {
    this.board = new Board(rows, cols);
    this.snake = new Snake(rows, cols);
    this.rerender = rerender;

    this.board.renderSnake(this.snake.getBodyPositions());
    this.startCountDown();
  }

  getBoard() {
    return this.board.getBoard();
  }

  getScore() {
    return this.snake.getBodyPositions().length - 3;
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
      this.rerender();
      await sleep(1000);
    }

    this.board.placeFood();
    this.startGame();
  }

  async startGame(tickMs: number = 250) {
    this.bindKeys();
    while (!this.gameOver) {
      this.nextTick();
      this.rerender();
      await sleep(tickMs);
    }
  }

  endGame() {
    this.gameOver = true;
    this.rerender();
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
        this.board.setCellType(removedPosition, CellType.EMPTY);
        this.board.setCellRotation(removedPosition, 0);
      }
    }

    this.snake.addNewPosition(nextPosition);
    this.board.renderSnake(this.snake.getBodyPositions());
  }
}

export default SnakeGame;
