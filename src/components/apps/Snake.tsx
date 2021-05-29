import React, { useEffect, useState } from "react";
import Window from "../base/Window";

export default function Snake({ pid, minimized }: { pid: string; minimized?: boolean }) {
    const [dir, setDir] = useState("d");
    const [body, setBody] = useState([{ x: 0, y: 0 }]);
    const [board, setBoard] = useState(new Array(10).fill(undefined).map(() => new Array(10).fill(0)) as number[][]);
    const [keys, setKeys] = useState([] as string[]);

    const cellToColor = ["bg-black bg-opacity-90", "bg-green-500", "bg-red-500"];

    useEffect(() => {
        const keydown = (e: KeyboardEvent) => (keys[keys.length - 1] === e.key.toLowerCase() ? undefined : setKeys(keys.concat(e.key.toLowerCase())));

        window.addEventListener("keydown", keydown);

        const interval = setInterval(() => {
            const keysCopy = [...keys];

            let dirCopy = dir;

            const newDir = (() => {
                let key = keysCopy.shift();

                while (key && !["w", "a", "s", "d"].includes(key)) key = keysCopy.shift();

                return key;
            })();

            if (
                newDir &&
                ["w", "a", "s", "d"].includes(newDir) &&
                (dir !== "d" || newDir !== "a") &&
                (dir !== "a" || newDir !== "d") &&
                (dir !== "w" || newDir !== "s") &&
                (dir !== "s" || newDir !== "w")
            ) {
                dirCopy = newDir;
            }

            switch (dirCopy) {
            }

            console.log(dirCopy);

            setDir(dirCopy);

            setKeys(keysCopy);
        }, 1000 / 3);

        return () => {
            clearInterval(interval);

            window.removeEventListener("keydown", keydown);
        };
    });

    return (
        <Window title="Snaek" icon={<img src="favicon.ico" alt="icon" />} pid={pid} width={330} height={350} className="flex flex-col" minimized={minimized} disableResizing disableFullScreen>
            {board.map((row) => (
                <div className="flex">
                    {row.map((cell) => (
                        <div className={`w-8 h-8 ${cellToColor[cell]}`}></div>
                    ))}
                </div>
            ))}
        </Window>
    );
}
