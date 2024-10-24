import { Ship } from './ship.js';
import { Gameboard } from './gameboard.js';

test('ship', () => {
    const myShip = new Ship(5, 0);
    expect(myShip.isSunk()).toBe(false);

    myShip.hit();
    myShip.hit();

    expect(myShip.isSunk()).toBe(false);

    myShip.hit();
    myShip.hit();
    myShip.hit();

    expect(myShip.isSunk()).toBe(true);
});

test('gameboard', () => {
    const gb = new Gameboard();
    expect(gb.allShipsSunk()).toBeFalsy();

    gb.placeShip(new Ship(4), 'r', 0, 0, 'h');
    gb.placeShip(new Ship(3), 'r', 2, 2, 'v');

    console.log(gb.board);
})