const CANVAS_SIZE = [800, 800];

const SNAKE_START = [
    [8, 12],
    [8, 13],
];

const APPLE_START: [number, number] = [8, 3];

const SCALE = 40;

const SPEED = 1000 / 7.5;

const DIRECTIONS = {
    KeyW: [0, -1],
    KeyS: [0, 1],
    KeyA: [-1, 0],
    KeyD: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
};

export { CANVAS_SIZE, SNAKE_START, APPLE_START, SCALE, SPEED, DIRECTIONS };
