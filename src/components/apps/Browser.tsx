import React from "react";
import Window from "../base/Window";

export default function Browser({ pid, minimized }: { pid: string; minimized?: boolean }) {
    return (
        <Window title="Googol" icon={<img src="favicon.ico" alt="icon" />} pid={pid} width={672} height={396} className="flex flex-col" minimized={minimized}>
            <iframe className="w-full h-full" src="https://cursorsdottsx.github.io/lynix" />
        </Window>
    );
}
