import { AppProps } from "next/dist/next-server/lib/router/router";
import "tailwindcss/tailwind.css";
import "../style.css";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
