import { Direction, Position } from './types';

const boardTemplate = `##################################################
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#.....................P..........................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
#................................................#
##################################################`;

const CAMERA_OFFSET = 10;

const positionDiff: { [d in Direction]: Position } = {
  [Direction.UP]: {
    x: 0,
    y: -1,
  },
  [Direction.RIGHT]: {
    x: 1,
    y: 0,
  },
  [Direction.DOWN]: {
    x: 0,
    y: 1,
  },
  [Direction.LEFT]: {
    x: -1,
    y: 0,
  },
};

enum ObjectType {
  Wall = '#',
  Player = 'P',
}

abstract class AbstractObject {
  type: ObjectType;
  position: Position;

  constructor(type: ObjectType, position: Position) {
    this.type = type;
    this.position = position;
  }
}

class Wall extends AbstractObject {
  constructor(position: Position) {
    super(ObjectType.Wall, position);
  }
}

class Player extends AbstractObject {
  constructor(position: Position) {
    super(ObjectType.Player, position);
  }
}

const objectBySymbol: { [s: string]: new (p: Position) => AbstractObject } = {
  [ObjectType.Wall]: Wall,
  [ObjectType.Player]: Player,
};

enum CellType {
  Out = '',
  Ground = '.',
}

abstract class AbstractCell {
  type: CellType;
  abstract occupiedBy?: AbstractObject;

  constructor(type: CellType) {
    this.type = type;
  }

  getImage() {
    if (this.occupiedBy) {
      return this.occupiedBy.type;
    }

    return this.type;
  }
}

class GroundCell extends AbstractCell {
  occupiedBy?: AbstractObject;

  constructor(occupiedBy?: AbstractObject) {
    super(CellType.Ground);
    this.occupiedBy = occupiedBy;
  }
}

class Playground {
  board: AbstractCell[][];
  // camera: AbstractCell[][];
  player?: Player;
  directions: Set<Direction>;

  constructor() {
    this.board = this.readBoard(boardTemplate);
    // this.camera = this.getCamera();
    this.directions = new Set();
  }

  private readBoard(template: string) {
    const board = template.split('\n').map((row, y) =>
      row.split('').map((cell, x) => {
        let object = objectBySymbol?.[cell];
        if (!object) {
          return new GroundCell();
        }

        const objectInstance = new object({ x, y });
        if (objectInstance.type === ObjectType.Player) {
          this.player = objectInstance;
        }
        return new GroundCell(objectInstance);
      }),
    );
    return board;
  }

  // private getCamera() {
  //   const cameraY = [...Array(CAMERA_OFFSET * 2 + 1).keys()].map(
  //     (y) => y - CAMERA_OFFSET + this.playerPosition.y,
  //   );
  //   const cameraX = [...Array(CAMERA_OFFSET * 2 + 1).keys()].map(
  //     (x) => x - CAMERA_OFFSET + this.playerPosition.x,
  //   );

  //   return cameraY.map((y) =>
  //     cameraX.map((x) => this.board?.[y]?.[x] ?? new OutCell()),
  //   );
  // }

  nextFrame() {
    if (this.player && this.directions.size) {
      const { x, y } = this.player.position;
      this.board[y][x].occupiedBy = undefined;
      const newPosition = { x, y };
      this.directions.forEach((direction) => {
        const diff = positionDiff[direction];
        newPosition.x += diff.x;
        newPosition.y += diff.y;
      });
      this.player.position = newPosition;
      this.board[newPosition.y][newPosition.x].occupiedBy = this.player;
      // this.camera = this.getCamera();
    }
  }
}

export default Playground;
