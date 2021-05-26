import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import FileSystem from "../lib/FileSystem";
import filesystem from "../lib/fs";
import taskbar from "../lib/taskbar";
import "../style.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <filesystem.Provider value={new FileSystem()}>
            <taskbar.Provider value={[]}>
                <Component {...pageProps} />
            </taskbar.Provider>
        </filesystem.Provider>
    );
}
