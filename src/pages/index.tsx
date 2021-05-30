import { GetStaticProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/base/Wrapper";
import ContextMenu from "../components/ContextMenu";
import Launcher from "../components/Launcher";
import Prelude from "../components/Prelude";
import minimizers from "../lib/minimizers";
import windows, { typeToIcon } from "../lib/windows";

const hiddenContextMenu = <ContextMenu options={[]} x={0} y={0} />;

export default function Index({ assetPrefix }: { assetPrefix: string }) {
    const toggles = useContext(minimizers);
    const activeWindows = useContext(windows);

    const [keys] = useState<{ [key: string]: boolean }>({});

    const [contextMenu, setContextMenu] = useState(<ContextMenu options={[]} x={0} y={0} />);
    const [launcherActive, setLauncherActive] = useState(false);

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const keydown = (e: KeyboardEvent) => {
            keys[e.code] = true;

            for (const [shortcut, action] of shortcuts.entries()) if (shortcut.split("+").every((key) => keys[key])) return action();
        };

        const keyup = (e: KeyboardEvent) => delete keys[e.code];

        window.addEventListener("keydown", keydown);

        window.addEventListener("keyup", keyup);

        const interval = setInterval(() => setTime(new Date()), 50);

        return () => {
            window.removeEventListener("keydown", keydown);

            window.removeEventListener("keyup", keyup);

            clearInterval(interval);
        };
    }, []);

    const shortcuts = new Map<string, () => void>();

    const closeActiveWindow = () => {
        if (!activeWindows.current.length) return;

        const win = [...document.querySelector(".desktop")!.childNodes].reverse()[0] as HTMLDivElement;

        activeWindows.remove(win.id);
    };

    shortcuts.set("ControlLeft+Space", () => {
        setLauncherActive(true);

        document.getElementById("launcher-search-input")!.focus();
    });

    shortcuts.set("ControlRight+Space", () => setLauncherActive(false));

    shortcuts.set("ControlLeft+KeyW", closeActiveWindow);
    shortcuts.set("ControlRight+KeyW", closeActiveWindow);

    return (
        <>
            <Prelude />
            <div
                className="desktop absolute top-0 left-0 w-full h-full flex flex-col"
                onClick={(e) => {
                    if (
                        !(e.target as HTMLElement).closest(".launcher")?.classList.contains("launcher") &&
                        !(e.target as HTMLElement).closest(".launcher-button")?.classList.contains("launcher-button")
                    )
                        setLauncherActive(false);

                    setContextMenu(hiddenContextMenu);
                }}
                onContextMenu={(e) => {
                    e.preventDefault();

                    return setContextMenu(
                        <ContextMenu
                            options={[
                                [
                                    {
                                        callback() {},
                                        icon: "ok",
                                        text: "ok",
                                        shortcut: "ok",
                                    },
                                ],
                                [
                                    {
                                        callback() {},
                                        icon: "ok",
                                        text: "ok",
                                        shortcut: "ok",
                                    },
                                ],
                            ]}
                            x={e.clientX}
                            y={e.clientY}
                            active
                        />
                    );
                }}
            >
                <div className="taskbar-container relative bg-gray-800 bg-opacity-50 flex items-center h-8 w-full">
                    <button
                        className="launcher-button w-8 h-8 grid grid-cols-2 grid-rows-2 place-items-center border-r border-gray-900 hover:bg-gray-800 hover:bg-opacity-50 transition-colors focus:outline-none flex-shrink-0"
                        onClick={() => setLauncherActive(!launcherActive)}
                        aria-label="launcher"
                    >
                        <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mb-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mb-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mt-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mt-1"></div>
                    </button>
                    <div className="taskbar-wrapper flex min-w-0 overflow-x-scroll hide-scrollbar flex-1">
                        <div className="taskbar flex items-center">
                            {activeWindows.ordered.map(({ pid, type }, i) => (
                                <div
                                    className="w-8 h-8 grid place-items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 transition-colors"
                                    onClick={() => {
                                        toggles.current[pid]();
                                    }}
                                    key={i}
                                >
                                    <img className="w-4 h-4 select-none" src={typeToIcon[type]} alt={pid} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="taskbar-info h-full px-2 grid place-items-center border-l border-gray-900 hover:bg-gray-800 hover:bg-opacity-50 transition-colors cursor-pointer flex-shrink-0">
                        <div className="general-info grid place-items-center">
                            <p className="tasknar-time text-gray-100 text-xs">
                                {(time.getHours() > 12 ? time.getHours() - 12 : time.getHours()).toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}{" "}
                                {time.getHours() >= 12 ? "PM" : "AM"}
                            </p>
                        </div>
                    </div>
                    <Launcher launcherActive={launcherActive} setLauncherActive={setLauncherActive} />
                </div>
                <div className="apps flex-1"></div>
                {contextMenu}
                {activeWindows.current.map(({ component, pid }) => (
                    <Wrapper key={pid}>{component}</Wrapper>
                ))}
            </div>
        </>
    );
}

//@ts-ignore
export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            assetPrefix: process.env.NODE_ENV === "production" ? "/lynix" : "",
        },
    };
};
