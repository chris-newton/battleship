import { Ship } from "./ship.js";

class Gameboard {
    // team is the char representing the player's team, either 'r' for real (the user) or 'c' for computer
    constructor() {
        this.board = [['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','',''],
                      ['','','','','','','','','','']];
    
        this.ships = [5, 4, 3, 3, 2].map(x => new Ship(x));

        // HARDCODED ship positions for now
        this.ships[0].setPosition(0, 0, 'v');
        this.ships[1].setPosition(2, 2, 'v');
        this.ships[2].setPosition(5, 9, 'v');
        this.ships[3].setPosition(1, 6, 'h');
        this.ships[4].setPosition(8, 4, 'h');
        this.ships.forEach((ship) => {
            this.placeShip(ship, ship.row, ship.col, ship.orientation);
        });
    }

    placeShip(ship, row, col, orientation) {
        // remove the ship from board
        if (orientation === 'v') {
            for (let i = ship.row; i < ship.row + ship.length; i++) {
                this.board[i][ship.col] = '';
            }
        } else if (orientation === 'h') {
            for (let i = ship.col; i < ship.col + ship.length; i++) {
                this.board[ship.row][i] = '';
            }
        }

        // check if ship will violate overlap & spacing rules
        // if (orientation === 'v') {
        //     for (let i = ship.row; i < ship.row + ship.length; i++) {
        //         this.board[i][ship.col] = '';
        //     }
        // } else if (orientation === 'h') {
        //     for (let i = ship.col; i < ship.col + ship.length; i++) {
        //         this.board[ship.row][i] = '';
        //     }
        // }
        
        // update ship position
        ship.setPosition(row, col, orientation);

        // place the ship on board 
        if (orientation === 'v' && row + ship.length < 10) {
            for (let i = row; i < row + ship.length; i++) {
                this.board[i][col] = 's';
            }
        } else if (orientation === 'h' && col + ship.length < 10) {
            for (let i = col; i < col + ship.length; i++) {
                this.board[row][i] = 's';
            }
        }
    }

    receiveAttack(row, col) {
        const hitShip = this.shipAt(row, col);
        if (hitShip) {
            hitShip.hit();
            this.board[row][col] = 'x'; // successful hit

            // if ship sunk, mark its cells 'sunk'
            if (hitShip.isSunk()) {
                if (hitShip.orientation === 'v') {
                    for (let i = hitShip.row; i < hitShip.row + hitShip.length; i++) {
                        this.board[i][hitShip.col] = "sunk";
                    }
                } else { 
                    for (let i = hitShip.col; i < hitShip.col + hitShip.length; i++) {
                        this.board[hitShip.row][i] = "sunk";
                    }
                }
            }
            return 1; // return 1 to continue player's turn
        } else {
            this.board[row][col] = 'm'; // miss
            return 0; // end player's turn
        }
    }
    
    allShipsSunk() {
        return this.ships.reduce((prev, curr) => curr.isSunk() && prev, true);
    }

    // returns the ship at row, col or null if no ship
    shipAt(row, col) {
        const foundShip = this.ships.find((ship) => {
            if (ship.orientation === 'v' && col === ship.col) {
                if (row >= ship.row && row < ship.row + ship.length) {
                    return ship;
                }
            } else if (ship.orientation === 'h' && row === ship.row) {
                if (col >= ship.col && col < ship.col + ship.length) {
                    return ship;
                }
            }
        });
        return foundShip ? foundShip : null;
    }
}

export { Gameboard };