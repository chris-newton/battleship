class Ship {
    constructor(length, timesHit=0) {
        this.length = length;
        this.timesHit = timesHit;
        this.position = null;
    }

    setPosition(row, col) {
        this.position = [row, col];
    }

    hit() {
        this.timesHit++;
    }

    isSunk() {
        return (this.length - this.timesHit) <= 0;
    }
}

export { Ship };