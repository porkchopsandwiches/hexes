var Hexes;
(function (Hexes) {
    var Coordinate = (function () {
        function Coordinate(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Coordinate.prototype.matches = function (coordinate) {
            return coordinate.x === this.x && coordinate.y === this.y && coordinate.z === this.z;
        };

        Coordinate.prototype.asKey = function () {
            return [this.x, this.y, this.z].join(",");
        };

        Coordinate.fromKey = function (key) {
            var elements;
            elements = key.split(",");
            return new Coordinate(parseInt(elements[0], 10), parseInt(elements[1], 10), parseInt(elements[2], 10));
        };

        Coordinate.prototype.offset = function (x, y, z) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            if (typeof z === "undefined") { z = 0; }
            return new Coordinate(this.x + x, this.y + y, this.z + z);
        };

        Coordinate.prototype.siblings = function () {
            return [
                this.offset(0, 1, -1),
                this.offset(1, 0, -1),
                this.offset(1, -1, 0),
                this.offset(0, -1, 1),
                this.offset(-1, 0, 1),
                this.offset(-1, 1, 0)
            ];
        };

        Coordinate.prototype.toXY = function (multiplier) {
            if (typeof multiplier === "undefined") { multiplier = 1; }
            return {
                x: 1.5 * multiplier * this.x,
                y: -multiplier * Math.sqrt(3) * (this.x / 2 + this.z)
            };
        };
        return Coordinate;
    })();
    Hexes.Coordinate = Coordinate;
})(Hexes || (Hexes = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Hexes;
(function (Hexes) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, {
                width: 800,
                height: 600,
                renderer: Phaser.AUTO,
                parent: "content",
                state: null,
                transparent: true
            });

            this.state.add("Boot", Hexes.States.BootState, false);
            this.state.add("Game", Hexes.States.GameState, false);

            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    Hexes.Game = Game;
})(Hexes || (Hexes = {}));
var Hexes;
(function (Hexes) {
    (function (States) {
        var BootState = (function (_super) {
            __extends(BootState, _super);
            function BootState() {
                _super.apply(this, arguments);
            }
            BootState.prototype.preload = function () {
                this.load.spritesheet("hex_512", "../cdn/frontend/assets/images/hex_512x2.png", 512, 512);
            };

            BootState.prototype.create = function () {
                this.input.maxPointers = 1;

                this.game.state.start("Game", true, false);
            };
            return BootState;
        })(Phaser.State);
        States.BootState = BootState;
    })(Hexes.States || (Hexes.States = {}));
    var States = Hexes.States;
})(Hexes || (Hexes = {}));
var Hexes;
(function (Hexes) {
    (function (States) {
        var GameState = (function (_super) {
            __extends(GameState, _super);
            function GameState() {
                _super.apply(this, arguments);
            }
            GameState.prototype.getGame = function () {
                return this.game;
            };

            GameState.prototype.preload = function () {
                this.tileset = new Hexes.Tileset(this.game);
            };

            GameState.prototype.create = function () {
                this.add.existing(this.tileset);
            };

            GameState.prototype.update = function () {
            };
            return GameState;
        })(Phaser.State);
        States.GameState = GameState;
    })(Hexes.States || (Hexes.States = {}));
    var States = Hexes.States;
})(Hexes || (Hexes = {}));
var Hexes;
(function (Hexes) {
    (function (TileType) {
        TileType[TileType["Blank"] = 0] = "Blank";
        TileType[TileType["Empty"] = 1] = "Empty";
        TileType[TileType["Full"] = 2] = "Full";
    })(Hexes.TileType || (Hexes.TileType = {}));
    var TileType = Hexes.TileType;

    (function (TileState) {
        TileState[TileState["Covered"] = 0] = "Covered";
        TileState[TileState["Exposed"] = 1] = "Exposed";
    })(Hexes.TileState || (Hexes.TileState = {}));
    var TileState = Hexes.TileState;

    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(game, coordinate, type, state) {
            if (typeof type === "undefined") { type = 0 /* Blank */; }
            if (typeof state === "undefined") { state = 0 /* Covered */; }
            var position;
            var size;

            size = 64;
            position = coordinate.toXY(size / 2);

            _super.call(this, game, game.world.centerX + position.x, game.world.centerY + position.y, "hex_512", 0);

            this.width = size;
            this.height = size;
            this.anchor.setTo(0.5, 0.5);
            this.coordinate = coordinate;
            this.type = type;
            this.state = state;
        }
        return Tile;
    })(Phaser.Sprite);
    Hexes.Tile = Tile;
})(Hexes || (Hexes = {}));
var Hexes;
(function (Hexes) {
    var Tileset = (function (_super) {
        __extends(Tileset, _super);
        function Tileset(game) {
            var _this = this;
            _super.call(this, game);

            this.tiles = {};

            _.each([
                new Hexes.Tile(game, new Hexes.Coordinate(0, 0, 0)),
                new Hexes.Tile(game, new Hexes.Coordinate(0, 1, -1)),
                new Hexes.Tile(game, new Hexes.Coordinate(1, 0, -1)),
                new Hexes.Tile(game, new Hexes.Coordinate(1, -1, 0)),
                new Hexes.Tile(game, new Hexes.Coordinate(0, -1, 1)),
                new Hexes.Tile(game, new Hexes.Coordinate(-1, 0, 1)),
                new Hexes.Tile(game, new Hexes.Coordinate(-1, 1, 0)),
                new Hexes.Tile(game, new Hexes.Coordinate(2, -1, -1)),
                new Hexes.Tile(game, new Hexes.Coordinate(-2, 1, 1))
            ], function (tile) {
                _this.tiles[tile.coordinate.asKey()] = tile;

                _this.add(tile);
            });
        }
        Tileset.prototype.getTileAt = function (position) {
            var key;
            key = position.asKey();
            return _.has(this.tiles, key) ? this.tiles[key] : undefined;
        };

        Tileset.prototype.getSiblings = function (tile) {
            var _this = this;
            var tiles;

            tiles = _.map(tile.coordinate.siblings(), function (position) {
                return _this.getTileAt(position);
            });

            tiles = _.filter(tiles, function (tile) {
                return !!tile;
            });

            return tiles;
        };

        Tileset.prototype.getTileUnderXY = function (x, y) {
            return undefined;
        };
        return Tileset;
    })(Phaser.Group);
    Hexes.Tileset = Tileset;
})(Hexes || (Hexes = {}));
