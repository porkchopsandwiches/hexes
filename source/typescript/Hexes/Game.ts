///<reference path="../references.ts" />

module Hexes {

    export interface IGame {
    }

    export class Game extends Phaser.Game implements IGame {

        constructor () {
            super(<Phaser.IGameConfig>{
                width:          800,
                height:         600,
                renderer:       Phaser.AUTO,
                parent:         "content",
                state:          null,
                transparent:    true
            });

            this.state.add("Boot", Hexes.States.BootState, false);
            this.state.add("Game", Hexes.States.GameState, false);

            this.state.start("Boot");
        }
    }
}
