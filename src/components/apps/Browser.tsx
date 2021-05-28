import { Dispatch, SetStateAction } from "react";
import { WindowType } from "../../lib/windows";
import Window from "../Window";

export default function Browser({
    pid,
    windows,
    setWindows,
}: {
    pid: string;
    windows: {
        pid: string;
        type: WindowType;
        component: React.ReactNode;
    }[];
    setWindows: Dispatch<
        SetStateAction<
            {
                pid: string;
                type: WindowType;
                component: React.ReactNode;
            }[]
        >
    >;
}) {
    return (
        <Window title="Googol" icon={<img src="favicon.ico" alt="icon" />} pid={pid} width={512} height={384} windows={windows} setWindows={setWindows}>
            main content
        </Window>
    );
}
