import React, { useState } from "react";
import { typeToIcon } from "../../lib/global/windows";
import Window from "../base/Window";

export default function Browser({ pid, minimized }: { pid: string; minimized?: boolean }) {
    const [url, setUrl] = useState("");
    const [go, setGo] = useState(false);

    return (
        <Window
            title="Googol"
            icon={<img className="w-4 h-4" src={typeToIcon["browser"]} alt="icon" />}
            pid={pid}
            width={672}
            height={396}
            className="flex flex-col"
            minimized={minimized}
        >
            {go ? (
                <iframe className="w-full h-full" src={/^https?:\/\//.test(url) ? url : `https://${url}` || "https://www.google.com/webhp?id=1"} />
            ) : (
                <div className="grid place-items-center w-full h-full">
                    <div className="flex flex-col gap-2">
                        <input
                            className="block border border-gray-700 rounded outline-none px-2 py-1 w-80 text-sm"
                            value={url}
                            autoFocus={true}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.code === "Enter") setGo(true);
                            }}
                        />
                        <button className="block w-full text-center bg-blue-500 text-white px-2 py-1 rounded" onClick={() => setGo(true)}>
                            Go
                        </button>
                    </div>
                </div>
            )}
        </Window>
    );
}
