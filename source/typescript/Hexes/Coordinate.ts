///<reference path="../references.ts" />

module Hexes {

    export interface ICoordinate {
        x: number;
        y: number;
        z: number;

        matches (coordinate:Coordinate): boolean;
        asKey (): CoordinateKey;

        offset (x?: number, y?: number, z?: number): ICoordinate;
        siblings (): ICoordinate[];
        toXY (multiplier?: number): ICoordinateXY;
        /*
        offsetX (amount: number = 1): ICoordinate;
        offsetY (amount: number = 1): ICoordinate;
        offsetZ (amount: number = 1): ICoordinate;
        incrementX (): ICoordinate;
        decrementX (): ICoordinate;
        incrementY (): ICoordinate;
        decrementY (): ICoordinate;
        incrementZ (): ICoordinate;
        decrementZ (): ICoordinate;
        */
    }


    export interface CoordinateKey extends String {

    }

    export interface ICoordinateXY {
        x: number;
        y: number;
    }

    export class Coordinate implements ICoordinate {
        public x: number;
        public y: number;
        public z: number;

        constructor (x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public matches (coordinate: Coordinate): boolean {
            return coordinate.x === this.x && coordinate.y === this.y && coordinate.z === this.z;
        }

        public asKey (): CoordinateKey {
            return <CoordinateKey> [this.x, this.y, this.z].join(",");
        }

        static fromKey (key: CoordinateKey): Coordinate {
            var elements: string[];
            elements = key.split(",");
            return new Coordinate(parseInt(elements[0], 10), parseInt(elements[1], 10), parseInt(elements[2], 10));
        }

        public offset (x: number = 0, y: number = 0, z: number = 0): ICoordinate {
            return new Coordinate(this.x + x, this.y + y, this.z + z);
        }

        public siblings (): ICoordinate[] {

            // Clockwise from top
            return [
                this.offset(0, 1, -1),
                this.offset(1, 0, -1),
                this.offset(1, -1, 0),
                this.offset(0, -1, 1),
                this.offset(-1, 0, 1),
                this.offset(-1, 1, 0)
            ]
        }


        public toXY (multiplier: number = 1): ICoordinateXY {
            return {
                x:  1.5 * multiplier * this.x, // x
                y:  -multiplier * Math.sqrt(3) * (this.x / 2 + this.z) // y
            };

            //rx = 3/2 * s * x
            //ry = -sqrt(3) * s * (x/2 + z)
        }

        /*
        public offsetX (amount: number = 1): ICoordinate {
            return new Coordinate(this.x + amount, this.y, this.z);
        }

        public offsetY (amount: number = 1): ICoordinate {
            return new Coordinate(this.x, this.y + amount, this.z);
        }

        public offsetZ (amount: number = 1): ICoordinate {
            return new Coordinate(this.x, this.y, this.z + amount);
        }

        public incrementX (): ICoordinate {
            return this.offsetX(1);
        }

        public decrementX (): ICoordinate {
            return this.offsetX(-1);
        }

        public incrementY (): ICoordinate {
            return this.offsetY(1);
        }

        public decrementY (): ICoordinate {
            return this.offsetY(-1);
        }

        public incrementZ (): ICoordinate {
            return this.offsetZ(1);
        }

        public decrementZ (): ICoordinate {
            return this.offsetZ(-1);
        }
        */
    }
}
