import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import minimizers from "../lib/global/minimizers";
import "../style.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
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
    );
}
