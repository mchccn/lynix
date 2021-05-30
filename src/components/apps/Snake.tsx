/** Credits to Weibenfalk at https://github.com/weibenfalk ♥ */

import React, { useEffect, useRef, useState } from "react";
import { APPLE_START, CANVAS_SIZE, DIRECTIONS, SCALE, SNAKE_START, SPEED } from "../../lib/constants/snake";
import { useInterval } from "../../lib/hooks/useInterval";
import Window from "../base/Window";

export default function Snake({ pid, minimized }: { pid: string; minimized?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState<[number, number]>(APPLE_START);
    const [dir, setDir] = useState([0, -1]);
    const [speed, setSpeed] = useState<number | undefined>(SPEED);
    const [gameOver, setGameOver] = useState(false);
    const [points, setPoints] = useState(0);

    useInterval(() => gameLoop(), speed);

    const endGame = () => {
        setSpeed(undefined);

        setGameOver(true);
    };

    const moveSnake = ({ keyCode }: KeyboardEvent) => keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode as keyof typeof DIRECTIONS]);

    const createApple = () => apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

    const checkCollision = (piece: [number, number], snk = snake) => {
        if (piece[0] * SCALE >= CANVAS_SIZE[0] || piece[0] < 0 || piece[1] * SCALE >= CANVAS_SIZE[1] || piece[1] < 0) return true;

        for (const segment of snk) {
            if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
        }

        return false;
    };

    const checkAppleCollision = (newSnake: [number, number][]) => {
        if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
            let newApple = createApple();

            while (checkCollision(newApple as [number, number], newSnake)) newApple = createApple();

            setApple(newApple as [number, number]);

            setPoints(points + 1);

            return true;
        }

        return false;
    };

    const gameLoop = () => {
        const snakeCopy = [...snake];
        const newSnakeHead: [number, number] = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];

        snakeCopy.unshift(newSnakeHead);

        if (checkCollision(newSnakeHead)) endGame();

        if (!checkAppleCollision(snakeCopy as [number, number][])) snakeCopy.pop();

        setSnake(snakeCopy);
    };

    const startGame = () => {
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setDir([0, -1]);
        setSpeed(SPEED);
        setGameOver(false);
        setPoints(0);
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d")!;

        ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#10b981";

        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));

        ctx.fillStyle = "#ef4445";
        ctx.fillRect(apple[0], apple[1], 1, 1);
    }, [snake, apple, gameOver]);

    useEffect(() => {
        window.addEventListener("keydown", moveSnake);

        return () => {
            window.removeEventListener("keydown", moveSnake);
        };
    }, []);

    return (
        <Window
            title={`Snaek – ${points}`}
            icon={<img className="w-4 h-4" src="/snaek.png" alt="icon" />}
            pid={pid}
            width={330}
            height={350}
            className="flex flex-col"
            minimized={minimized}
            disableResizing
            disableFullScreen
        >
            <div className="w-full h-full flex flex-col" onClick={startGame}>
                {gameOver ? (
                    <div className="flex-1 grid place-items-center">ur ded</div>
                ) : (
                    <canvas className="flex-1 bg-gray-900" ref={canvasRef} width={`${CANVAS_SIZE[0]}px`} height={`${CANVAS_SIZE[1]}px`} />
                )}
            </div>
        </Window>
    );
}
