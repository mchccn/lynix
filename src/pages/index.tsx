import { GetStaticProps } from "next";
import Head from "next/head";
import React, { useContext, useState } from "react";
import ContextMenu from "../components/ContextMenu";
import filesystem from "../lib/fs";
import taskbar from "../lib/taskbar";

const hiddenContextMenu = <ContextMenu options={[]} x={0} y={0} />;

export default function Index({ assetPrefix }: { assetPrefix: string }) {
    const fs = useContext(filesystem);
    const tb = useContext(taskbar);

    const [contextMenu, setContextMenu] = useState(<ContextMenu options={[]} x={0} y={0} />);
    const [launcherActive, setLauncherActive] = useState(false);
    const [launcherSearch, setLauncherSearch] = useState("");

    return (
        <>
            <Head>
                <title>lynix</title>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <div
                className="desktop absolute top-0 left-0 flex flex-col"
                style={{
                    height: "max(100vh, 56.25vw)",
                    width: "max(100vw, 177.778vh)",
                }}
                onClick={(e) => {
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
                        className="launcher w-8 h-8 grid grid-cols-2 grid-rows-2 place-items-center border-r border-gray-900"
                        onFocus={(e) => e.target.blur()}
                        onClick={(e) => setLauncherActive(!launcherActive)}
                    >
                        <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mb-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mb-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mt-1"></div>
                        <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mt-1"></div>
                    </button>
                    <div className="taskbar">
                        {tb.map(({ pid, icon }) => (
                            <div>
                                <img src={icon} alt={pid} />
                            </div>
                        ))}
                    </div>
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
                                type="text"
                                onChange={(e) => setLauncherSearch(e.target.value)}
                                value={launcherSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="apps"></div>
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
