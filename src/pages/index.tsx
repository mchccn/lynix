import { GetStaticProps } from "next";
import React, { useContext, useEffect, useState } from "react";
import Wrapper from "../components/base/Wrapper";
import ContextMenu from "../components/ContextMenu";
import Launcher from "../components/Launcher";
import LauncherButton from "../components/LauncherButton";
import Prelude from "../components/Prelude";
import Taskbar from "../components/Taskbar";
import windows from "../lib/windows";

const hiddenContextMenu = <ContextMenu options={[]} x={0} y={0} />;

export default function Index({ assetPrefix }: { assetPrefix: string }) {
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
                    <LauncherButton launcherActive={launcherActive} setLauncherActive={setLauncherActive} />
                    <Taskbar />
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
