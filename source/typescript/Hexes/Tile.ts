///<reference path="../references.ts" />

module Hexes {
    export enum TileType {
        Blank,
        Empty,
        Full
    }

    export enum TileState {
        Covered,
        Exposed
    }

    export interface ITile {
        coordinate: ICoordinate;
        type: TileType;
        state: TileState;
    }

    export class Tile extends Phaser.Sprite implements ITile {
        public coordinate: ICoordinate;
        public type: TileType;
        public state: TileState;

        constructor (game: Phaser.Game, coordinate: ICoordinate, type: TileType = TileType.Blank, state: TileState = TileState.Covered) {
            var position: ICoordinateXY;
            var size: number;

            size = 64;
            position = coordinate.toXY(size / 2);

            super(game, game.world.centerX + position.x, game.world.centerY + position.y, "hex_512", 0);

            this.width = size;
            this.height = size;
            this.anchor.setTo(0.5, 0.5);
            this.coordinate = coordinate;
            this.type = type;
            this.state = state;
            //this.frame = 0;
        }
    }
}
