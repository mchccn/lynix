import { typeToIcon } from "../../lib/global/windows";
import Window from "../base/Window";

export default function Settings({ pid, minimized }: { pid: string; minimized?: boolean }) {
    return (
        <Window
            title="Settings"
            icon={<img src={typeToIcon["settings"]} alt="icon" />}
            pid={pid}
            width={672}
            height={396}
            className="flex flex-col"
            minimized={minimized}
        >
            settings coming soon
        </Window>
    );
}
