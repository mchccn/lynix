import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import windows from "../lib/global/windows";

export default function Shortcuts({ setLauncherActive }: { setLauncherActive: Dispatch<SetStateAction<boolean>> }) {
    const activeWindows = useContext(windows);

    const shortcuts = useRef(new Map<string, () => void>());
    const keys = useRef<{ [key: string]: boolean }>({});

    useEffect(() => {
        const keydown = (e: KeyboardEvent) => {
            keys.current[e.code] = true;

            for (const [shortcut, action] of shortcuts.current.entries()) if (shortcut.split("+").every((key) => keys.current[key])) return action();
        };

        const keyup = (e: KeyboardEvent) => delete keys.current[e.code];

        window.addEventListener("keydown", keydown);

        window.addEventListener("keyup", keyup);

        return () => {
            window.removeEventListener("keydown", keydown);

            window.removeEventListener("keyup", keyup);
        };
    }, []);

    const closeActiveWindow = () => {
        if (!activeWindows.current.length) return;

        const win = [...document.querySelector(".desktop")!.childNodes].reverse()[0] as HTMLDivElement;

        activeWindows.remove(win.id);
    };

    shortcuts.current.set("ControlLeft+Space", () => {
        setLauncherActive(true);

        document.getElementById("launcher-search-input")!.focus();
    });

    shortcuts.current.set("ControlRight+Space", () => setLauncherActive(false));

    shortcuts.current.set("ControlLeft+KeyW", closeActiveWindow);
    shortcuts.current.set("ControlRight+KeyW", closeActiveWindow);

    return <></>;
}
