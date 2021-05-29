import React from "react";
import { SnakeGame } from "react-game-snake";
import Window from "../base/Window";

export default function Snake({ pid, minimized }: { pid: string; minimized?: boolean }) {
    return (
        <Window title="Snaek" icon={<img src="favicon.ico" alt="icon" />} pid={pid} width={330} height={350} className="flex flex-col" minimized={minimized} disableResizing disableFullScreen>
            <SnakeGame
                colors={{
                    field: "#111111",
                    food: "#ef4445",
                    snake: "#10b981",
                }}
                countOfHorizontalFields={10}
                countOfVerticalFields={10}
                fieldSize={32}
                loopTime={1000 / 3}
                pauseAllowed
                restartAllowed
            />
        </Window>
    );
}
