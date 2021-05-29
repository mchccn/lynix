import React, { useEffect, useState } from "react";
import Window from "../base/Window";

export default function Snake({ pid, minimized }: { pid: string; minimized?: boolean }) {
    const boardSize = 10;
    const board = new Array(boardSize).fill(undefined).map((_, i) => new Array(boardSize).fill(0)) as number[][];

    const [playerDir, setPlayerDir] = useState("d");
    const [playerBody, setPlayerBody] = useState([{ x: -1, y: 0 }]);
    const [food, setFood] = useState({
        x: Math.floor(Math.random() * (boardSize - 2)) + 1,
        y: Math.floor(Math.random() * (boardSize - 2)) + 1,
    });
    const [keys] = useState<string[]>([]);

    const cellToColor = ["bg-black", "bg-green-400", "bg-red-400"];

    useEffect(() => {
        const keydown = (e: KeyboardEvent) => keys.push(e.key.toLowerCase());

        const interval = setInterval(() => {
            const [{ x, y }] = playerBody;

            playerBody.pop();

            const dir = (() => {
                let key = keys.shift();

                while (key && !["w", "a", "s", "d"].includes(key)) key = keys.shift();

                return key;
            })();

            if (
                dir &&
                ["w", "a", "s", "d"].includes(dir) &&
                (playerDir !== "d" || dir !== "a") &&
                (playerDir !== "a" || dir !== "d") &&
                (playerDir !== "w" || dir !== "s") &&
                (playerDir !== "s" || dir !== "w")
            )
                setPlayerDir(dir);

            switch (playerDir) {
                case "d":
                    playerBody.unshift({
                        x: x + 1,
                        y,
                    });
                    break;
                case "a":
                    playerBody.unshift({
                        x: x - 1,
                        y,
                    });
                    break;
                case "s":
                    playerBody.unshift({
                        x,
                        y: y + 1,
                    });
                    break;
                case "w":
                    playerBody.unshift({
                        x,
                        y: y - 1,
                    });
                    break;
                default:
                    throw new Error(`Impossible direction '${playerDir}'.`);
            }

            const [head, ...body] = playerBody;

            if (head.x > boardSize - 1 || head.x < 0 || head.y > boardSize - 1 || head.y < 0 || body.some(({ x, y }) => head.x === x && head.y === y)) {
                board.splice(
                    0,
                    boardSize,
                    ...new Array(boardSize)
                        .fill(undefined)
                        .map((_, i) => new Array(boardSize).fill(0))
                        .slice(0, boardSize - 1)
                );

                //! DIE

                return;
            }

            if (head.x === food.x && head.y === food.y) {
                let i = 0;

                while (playerBody.some(({ x, y }) => x == food.x && y === food.y) && i < boardSize) {
                    food.x = Math.floor(Math.random() * (boardSize - 2)) + 1;
                    food.y = Math.floor(Math.random() * (boardSize - 2)) + 1;
                    i++;
                }

                playerBody.push(playerBody[playerBody.length - 1]);

                if (playerBody.length >= boardSize * boardSize) {
                    board.splice(
                        0,
                        boardSize,
                        ...new Array(boardSize)
                            .fill(undefined)
                            .map((_, i) => new Array(boardSize).fill(0))
                            .slice(0, boardSize - 1)
                    );

                    //! WIN

                    return;
                }
            }

            playerBody.forEach(({ x, y }) => {
                board[y][x] = 1;
            });

            board[food.y][food.x] = 2;

            board.splice(0, boardSize, ...new Array(boardSize).fill(undefined).map((_, i) => new Array(boardSize).fill(0)));
        }, 1000 / 3);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Window title="Snaek" icon={<img src="favicon.ico" alt="icon" />} pid={pid} width={328} height={350} className="flex flex-col" minimized={minimized} disableResizing disableFullScreen>
            {board.map((row, y) => (
                <div className="flex" key={y}>
                    {row.map((cell, x) => (
                        <div className={`w-8 h-8 ${cellToColor[cell]}`} key={x}></div>
                    ))}
                </div>
            ))}
        </Window>
    );
}
