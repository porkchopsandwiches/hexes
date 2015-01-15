///<reference path="../../references.ts" />

module Hexes {
    export module States {
        export interface IBootState {

        }

        export class BootState extends Phaser.State implements IBootState {
            preload () {
                //this.load.image("hex_512", "../cdn/frontend/assets/images/hex_512.png");
                this.load.spritesheet("hex_512", "../cdn/frontend/assets/images/hex_512x2.png", 512, 512);
            }

            create () {
                this.input.maxPointers = 1;

                this.game.state.start("Game", true, false);
            }
        }
    }
}
