import { Dispatch, SetStateAction } from "react";
import Browser from "../components/apps/Browser";
import { WindowType } from "./windows";

export default function launch(
    type: WindowType,
    windows: {
        pid: string;
        type: WindowType;
        component: React.ReactNode;
    }[],
    setWindows: Dispatch<
        SetStateAction<
            {
                pid: string;
                type: WindowType;
                component: React.ReactNode;
            }[]
        >
    >
) {
    const pid = Date.now().toString(16).padEnd(16, "0");

    switch (type) {
        case "browser":
            return {
                pid,
                type,
                component: <Browser pid={pid} windows={windows} setWindows={setWindows} />,
            };
    }
}
