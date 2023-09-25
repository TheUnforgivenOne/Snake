import { Direction } from './types';
import Board from './entities/Board';
import Snake from './entities/Snake';

class SnakeGame {
  gameOver: boolean = false;
  board: Board;
  snake: Snake;

  constructor(rows: number = 25, cols: number = 25) {
    this.snake = new Snake(rows, cols);
    this.board = new Board(rows, cols, this.snake);
  }

  getBoard() {
    return this.board.getBoard();
  }

  getStringBoard() {
    return this.board
      .getBoard()
      .flat()
      .map((cell) => cell.getCellType())
      .join('');
  }

  bindKeys() {
    const handleArrowPressed = (e: KeyboardEvent) => {
      console.log(e);
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

  async startGame(setState: any) {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    this.bindKeys();
    while (!this.gameOver) {
      this.gameOver = this.board.tick();
      await sleep(200);
      setState((p: any) => p + 1);
    }
  }

  endGame() {
    this.gameOver = true;
  }
}

export default SnakeGame;
