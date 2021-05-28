import leven from "leven";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import ContextMenu from "../components/ContextMenu";
import Wrapper from "../components/Wrapper";
import filesystem from "../lib/fs";
import launch from "../lib/launch";
import minimizers from "../lib/minimizers";
import { typeToIcon, WindowType } from "../lib/windows";

const hiddenContextMenu = <ContextMenu options={[]} x={0} y={0} />;

export default function Index({ assetPrefix }: { assetPrefix: string }) {
    const fs = useContext(filesystem);
    const toggles = useContext(minimizers);

    const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

    const [activeWindows, setActiveWindows] = useState<
        {
            pid: string;
            type: WindowType;
            minimized: boolean;
            component: React.ReactNode;
        }[]
    >([]);

    const allApps: {
        name: string;
        type: WindowType;
    }[] = [
        {
            name: "Googol",
            type: "browser",
        },
    ];

    const [contextMenu, setContextMenu] = useState(<ContextMenu options={[]} x={0} y={0} />);
    const [launcherActive, setLauncherActive] = useState(false);
    const [launcherSearch, setLauncherSearch] = useState("");
    const [filteredApps, setFilteredApps] = useState([...allApps]);

    useEffect(() => {
        if (launcherSearch)
            setFilteredApps(
                [...allApps]
                    .filter((app) => app.name.toLowerCase().includes(launcherSearch.toLowerCase()))
                    .sort((a, b) => leven(b.name.toLowerCase(), launcherSearch.toLowerCase()) - leven(a.name.toLowerCase(), launcherSearch.toLowerCase()))
            );
        else setFilteredApps([...allApps]);
    }, [launcherSearch]);

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            keys[e.code] = true;

            for (const [shortcut, action] of shortcuts.entries()) {
                if (shortcut.split("+").every((key) => keys[key])) return action();
            }
        });

        window.addEventListener("keyup", (e) => {
            delete keys[e.code];
        });
    }, []);

    const shortcuts = new Map<string, () => void>();

    shortcuts.set("ControlLeft+Space", () => {
        setLauncherActive(true);

        document.getElementById("launcher-search-input")!.focus();
    });

    shortcuts.set("ControlRight+Space", () => {
        setLauncherActive(false);
    });

    return (
        <>
            <Head>
                <title>lynix</title>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
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
                <div
                    className="taskbar-container relative bg-gray-800 bg-opacity-50 flex items-center"
                    style={{
                        height: "2rem",
                        width: "max(100vw, 177.778vh)",
                    }}
                >
                    <button
                        className="launcher-button w-8 h-8 grid grid-cols-2 grid-rows-2 place-items-center border-r border-gray-900 hover:bg-gray-800 hover:bg-opacity-50 transition-colors focus:outline-none"
                        onClick={() => setLauncherActive(!launcherActive)}
                    >
                        <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mb-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mb-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mt-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mt-1"></div>
                    </button>
                    <div className="taskbar flex-1 flex items-center">
                        {activeWindows.map(({ pid, type }, i) => (
                            <div
                                className="w-8 h-8 grid place-items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 transition-colors"
                                onClick={() => {
                                    toggles.current[pid]();
                                }}
                                key={i}
                            >
                                <img className="w-4 h-4" src={typeToIcon[type]} alt={pid} />
                            </div>
                        ))}
                    </div>
                    <div className="taskbar-info"></div>
                    <div
                        className="launcher absolute top-full w-80 bg-gray-900 text-gray-100 px-2 py-1 shadow-sm flex flex-col"
                        style={{
                            display: launcherActive ? "flex" : "none",
                        }}
                    >
                        <div className="launcher-search flex items-center py-1 relative">
                            <svg className="w-4 h-4 stroke-current text-blue-600 absolute ml-2" width="24" height="24" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                                <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                            </svg>
                            <input
                                className="bg-gray-800 bg-opacity-50 text-gray-100 pl-8 w-full text-sm py-1 rounded-sm outline-none"
                                id="launcher-search-input"
                                type="text"
                                onChange={(e) => setLauncherSearch(e.target.value)}
                                value={launcherSearch}
                                autoComplete="false"
                                autoCapitalize="false"
                                autoCorrect="false"
                                onKeyDown={(e) => {
                                    if (e.code === "Enter") {
                                        setActiveWindows([...activeWindows, launch(filteredApps[0].type, activeWindows, setActiveWindows)]);
                                        setLauncherActive(false);
                                        setLauncherSearch("");
                                    }

                                    return;
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-2 px-1 py-2">
                            {filteredApps.map(({ name, type }, i) => (
                                <div
                                    className="flex items-center gap-2.5 cursor-pointer px-3 py-2 hover:bg-gray-800 hover:bg-opacity-25 rounded"
                                    onClick={() => {
                                        setActiveWindows([...activeWindows, launch(type, activeWindows, setActiveWindows)]);
                                        setLauncherActive(false);
                                        setLauncherSearch("");
                                    }}
                                    key={i}
                                >
                                    <img className="w-6 h-6" src={typeToIcon[type]} alt={name} />
                                    <p>{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="apps flex-1"></div>
                {activeWindows.map(({ component }, i) => (
                    <Wrapper key={i}>{component}</Wrapper>
                ))}
                {contextMenu}
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
