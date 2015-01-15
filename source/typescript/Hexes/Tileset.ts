///<reference path="../references.ts" />

module Hexes {

    export interface TileGrid {
        [key: string]: ITile;
    }

    export interface ITileset {
        tiles: TileGrid;
        getTileAt (position: Coordinate): ITile;
        getSiblings (tile: ITile): ITile[];
        //renderToState<T extends Phaser.State> (state: T);
        getTileUnderXY (x: number, y: number): ITile;
    }

    export class Tileset extends Phaser.Group implements ITileset {
        public tiles: TileGrid;

        private є: string;

        constructor (game: Hexes.Game) {
            super(game);

            this.tiles = {};

            _.each([
                new Tile(game, new Coordinate(0, 0, 0)),
                new Tile(game, new Coordinate(0, 1, -1)),
                new Tile(game, new Coordinate(1, 0, -1)),
                new Tile(game, new Coordinate(1, -1, 0)),
                new Tile(game, new Coordinate(0, -1, 1)),
                new Tile(game, new Coordinate(-1, 0, 1)),
                new Tile(game, new Coordinate(-1, 1, 0)),

                new Tile(game, new Coordinate(2, -1, -1)),
                new Tile(game, new Coordinate(-2, 1, 1))
            ], (tile: ITile): void => {
                this.tiles[<string> tile.coordinate.asKey()] = tile;

                this.add(tile);
            });
        }

        public getTileAt (position: Coordinate): ITile {
            var key: string;
            key = <string> position.asKey();
            return _.has(this.tiles, key) ? this.tiles[key]: undefined;
        }

        public getSiblings (tile: ITile): ITile[] {
            var tiles: ITile[];

            tiles = _.map<ICoordinate, ITile>(tile.coordinate.siblings(), (position: ICoordinate): ITile => {
                return this.getTileAt(position);
            });

            tiles = _.filter(tiles, (tile: ITile): boolean => {
                return !!tile;
            });

            return tiles;
        }

        public getTileUnderXY (x: number, y: number): ITile {



            return undefined;
        }
    }
}
