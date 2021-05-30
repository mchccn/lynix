const CANVAS_SIZE = [800, 800];

const SNAKE_START = [
    [8, 12],
    [8, 13],
];

const APPLE_START: [number, number] = [8, 3];

const SCALE = 40;

const SPEED = 1000 / 7.5;

const DIRECTIONS = {
    38: [0, -1],
    40: [0, 1],
    37: [-1, 0],
    39: [1, 0],
};

export { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS };
