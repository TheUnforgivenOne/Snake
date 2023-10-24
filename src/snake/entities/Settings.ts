import { SnakeBinds, Direction } from '../types';
import Snake from './Snake';

const defaultBinds = {
  [Direction.UP]: 'ArrowUp',
  [Direction.RIGHT]: 'ArrowRight',
  [Direction.DOWN]: 'ArrowDown',
  [Direction.LEFT]: 'ArrowLeft',
};

class Binds {
  private snake: Snake;
  private binds: SnakeBinds;
  private handleArrowPressed: ((e: KeyboardEvent) => void) | null;

  constructor(snake: Snake, binds: SnakeBinds = defaultBinds) {
    this.snake = snake;
    this.binds = binds;
    this.handleArrowPressed = null;
  }

  getSettings(): SnakeBinds {
    return this.binds;
  }

  setSettings(newBinds: SnakeBinds): void {
    this.binds = newBinds;
  }

  restoreSettings(): void {
    this.binds = defaultBinds;
  }

  bind(): void {
    this.unbind();

    const newHandler = (e: KeyboardEvent) => {
      switch (e.code) {
        case this.binds.up:
          this.snake.setDirection(Direction.UP);
          return;
        case this.binds.right:
          this.snake.setDirection(Direction.RIGHT);
          return;
        case this.binds.down:
          this.snake.setDirection(Direction.DOWN);
          return;
        case this.binds.left:
          this.snake.setDirection(Direction.LEFT);
          return;
        default:
      }
    };

    this.handleArrowPressed = newHandler;
    document.addEventListener('keydown', newHandler);
  }

  unbind(): void {
    if (this.handleArrowPressed) {
      document.removeEventListener('keydown', this.handleArrowPressed);
    }
  }
}

export default Binds;
