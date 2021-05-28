import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import FileSystem from "../lib/FileSystem";
import filesystem from "../lib/fs";
import minimizers from "../lib/minimizers";
import "../style.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <filesystem.Provider value={new FileSystem()}>
            <minimizers.Provider
                value={{
                    current: {},
                    add(pid: string, fn: () => boolean) {
                        this.current[pid] = fn;
                    },
                    remove(pid: string) {
                        return delete this.current[pid];
                    },
                }}
            >
                <Component {...pageProps} />
            </minimizers.Provider>
        </filesystem.Provider>
    );
}
