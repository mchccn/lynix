import { GetStaticProps } from "next";
import Head from "next/head";
import { useContext } from "react";
import filesystem from "../lib/fs";

export default function Index({ assetPrefix }: { assetPrefix: string }) {
    const fs = useContext(filesystem);

    return (
        <>
            <Head>
                <title>lynix</title>
                <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            </Head>
            <div
                className="desktop absolute top-0 left-0 bg-gradient-to-br from-black via-gray-900 to-black flex flex-col"
                style={{
                    height: "max(100vh, 56.25vw)",
                    width: "max(100vw, 177.778vh)",
                }}
            >
                <div
                    className="taskbar bg-gray-900 bg-opacity-80 flex items-center"
                    style={{
                        height: "2rem",
                        width: "max(100vw, 177.778vh)",
                    }}
                >
                    <button className="launcher w-8 h-8 grid grid-cols-2 grid-rows-2 place-items-center border-r border-gray-900">
                        <div className="bg-gray-800 w-1.5 h-1.5 -mr-1 -mb-1"></div>
                        <div className="bg-gray-800 w-1.5 h-1.5 -ml-1 -mb-1"></div>
                        <div className="bg-gray-800 w-1.5 h-1.5 -mr-1 -mt-1"></div>
                        <div className="bg-gray-800 w-1.5 h-1.5 -ml-1 -mt-1"></div>
                    </button>
                </div>
                <div className="apps"></div>
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
