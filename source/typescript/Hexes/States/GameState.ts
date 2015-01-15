///<reference path="../../references.ts" />

module Hexes {
    export module States {
        export interface IGameState {

        }

        export class GameState extends Phaser.State implements IGameState {

            private tileset: ITileset;

            private getGame (): Hexes.Game {
                return <Hexes.Game> this.game;
            }

            preload () {
                //this.tileset = this.getGame().tileset;
                this.tileset = new Tileset(this.game);
            }

            create () {
                this.add.existing(this.tileset);

            }

            update () {
                //this.tileset.getTileUnderXY(this.input.x, this.input.y);

                /*
                _.each(this.world.children, (child: PIXI.DisplayObject): void => {
                    console.log(child.x, child.y);
                });
                */

                //console.log(this.world.children.length);
            }
        }
    }
}
