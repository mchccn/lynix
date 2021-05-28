import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { WindowType } from "../lib/windows";

const log = (msg: string) => console.log(`%c ${msg}`, "color: orange;");

export default function Window({
    icon,
    title,
    children,
    pid,
    width,
    height,
    minimized,
    windows,
    setWindows,
}: {
    icon?: string | React.ReactNode;
    title?: string;
    children: React.ReactNode;
    pid: string;
    width: number;
    height: number;
    minimized?: boolean;
    windows: {
        pid: string;
        type: WindowType;
        minimized: boolean;
        component: React.ReactNode;
    }[];
    setWindows: Dispatch<
        SetStateAction<
            {
                pid: string;
                type: WindowType;
                minimized: boolean;
                component: React.ReactNode;
            }[]
        >
    >;
}) {
    const [isMinimized, setIsMinimized] = useState(minimized ?? false);

    const [isMaximized, setIsMaximized] = useState(false);
    const [pos, setPos] = useState({ x: window.innerWidth / 2 - width / 2, y: (window.innerHeight - 32) / 2 - height / 2 });
    const [size, setSize] = useState({ width, height });
    const [oldPos, setOldPos] = useState(pos);
    const [oldSize, setOldSize] = useState(size);

    useEffect(() => {
        if (isMaximized) {
            setPos({ x: 0, y: 32 });
            setSize({
                width: window.innerWidth,
                height: window.innerHeight - 32,
            });
        } else {
            setPos(oldPos);
            setSize(oldSize);
        }
    }, [isMaximized]);

    useEffect(() => {
        const win = document.querySelector(`.win.pid-${pid}`) as HTMLElement;

        win.tabIndex = 1;

        const focus = () => (win.style.zIndex = "50");

        const blur = () => (win.style.zIndex = "10");

        win.addEventListener("focus", focus);

        win.addEventListener("blur", blur);

        return () => {
            win.removeEventListener("focus", focus);

            win.removeEventListener("blur", blur);
        };
    }, []);

    if (isMinimized) return null;

    return (
        <Rnd
            size={size}
            position={pos}
            minWidth={192}
            minHeight={24}
            bounds=".apps"
            dragHandleClassName="win-title"
            style={{ display: "flex", backgroundColor: "#eeeeee", zIndex: 10 }}
            className={`win flex-col rounded shadow border border-gray-900 focus:outline-none pid-${pid}`}
            resizeHandleStyles={{
                bottom: { cursor: "ns-resize" },
                bottomLeft: { cursor: "nesw-resize" },
                bottomRight: { cursor: "nwse-resize" },
                left: { cursor: "ew-resize" },
                right: { cursor: "ew-resize" },
                top: { cursor: "ns-resize" },
                topLeft: { cursor: "nwse-resize" },
                topRight: { cursor: "nesw-resize" },
            }}
            disableDragging={isMaximized}
            enableResizing={!isMaximized}
            onDragStop={(e, { x, y }) => {
                setOldPos({ x, y });
                setPos({ x, y });
            }}
            onResize={(e, direction, ref) => {
                setOldSize({ width: ref.offsetWidth, height: ref.offsetHeight });
                setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
            }}
        >
            <article className="win-container flex flex-col flex-1 overflow-hidden">
                <header className="win-header flex-shrink-0 flex items-center justify-between h-6">
                    <div className="win-icon w-6 h-6 select-none grid place-items-center">{icon ?? "i"}</div>
                    <h4 className="win-title overflow-hidden overflow-ellipsis select-none cursor-move flex-1 py-2 font-sans font-normal text-sm text-center">{title ?? "window"}</h4>
                    <nav className="win-menu flex items-center gap-1 mx-1">
                        <button
                            className="win-min border-none focus:outline-none w-3 h-3 rounded-full cursor-pointer"
                            style={{ background: "orange" }}
                            onClick={() => setIsMinimized(true)}
                        ></button>
                        <button
                            className="win-max border-none focus:outline-none w-3 h-3 rounded-full cursor-pointer"
                            style={{ background: "limegreen" }}
                            onClick={() => setIsMaximized(!isMaximized)}
                        ></button>
                        <button
                            className="win-close  border-none focus:outline-none w-3 h-3 rounded-full cursor-pointer"
                            style={{ background: "red" }}
                            onClick={() => setWindows(windows.filter((w) => w.pid !== pid))}
                        ></button>
                    </nav>
                </header>
                <main className="win-content flex-1 rounded bg-white mb-1 mx-1">{children}</main>
            </article>
        </Rnd>
    );
}
