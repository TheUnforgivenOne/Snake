import { Binds, Direction } from '../types';
import Snake from './Snake';

const defaultBinds = {
  [Direction.UP]: 'ArrowUp',
  [Direction.RIGHT]: 'ArrowRight',
  [Direction.DOWN]: 'ArrowDown',
  [Direction.LEFT]: 'ArrowLeft',
};

class Settings {
  private snake: Snake;
  private binds: Binds;
  private handleArrowPressed: (e: KeyboardEvent) => void;

  constructor(snake: Snake, binds: Binds = defaultBinds) {
    this.snake = snake;
    this.binds = binds;
    this.handleArrowPressed = () => null;
  }

  getSettings(): Binds {
    return this.binds;
  }

  setSettings(newBinds: Binds): void {
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
    document.removeEventListener('keydown', this.handleArrowPressed);
  }
}

export default Settings;
