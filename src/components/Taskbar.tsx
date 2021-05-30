import { useContext } from "react";
import minimizers from "../lib/minimizers";
import windows, { typeToIcon } from "../lib/windows";

export default function Taskbar() {
    const toggles = useContext(minimizers);
    const activeWindows = useContext(windows);

    return (
        <div className="taskbar-wrapper flex min-w-0 overflow-x-scroll hide-scrollbar flex-1">
            <div className="taskbar flex items-center">
                {activeWindows.ordered.map(({ pid, type }, i) => (
                    <div
                        className="w-8 h-8 grid place-items-center cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 transition-colors"
                        onClick={() => {
                            toggles.current[pid]();
                        }}
                        key={i}
                    >
                        <img className="w-4 h-4 select-none" src={typeToIcon[type]} alt={pid} />
                    </div>
                ))}
            </div>
        </div>
    );
}
