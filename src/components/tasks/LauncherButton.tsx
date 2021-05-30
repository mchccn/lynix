import { Dispatch, SetStateAction } from "react";

export default function LauncherButton({ launcherActive, setLauncherActive }: { launcherActive: boolean; setLauncherActive: Dispatch<SetStateAction<boolean>> }) {
    return (
        <button
            className="launcher-button w-8 h-8 grid grid-cols-2 grid-rows-2 place-items-center border-r border-gray-900 hover:bg-gray-800 hover:bg-opacity-50 transition-colors focus:outline-none flex-shrink-0"
            onClick={() => setLauncherActive(!launcherActive)}
            aria-label="launcher"
        >
            <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mb-1"></div>
            <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mb-1"></div>
            <div className="bg-gray-600 w-1.5 h-1.5 -mr-1 -mt-1"></div>
            <div className="bg-gray-600 w-1.5 h-1.5 -ml-1 -mt-1"></div>
        </button>
    );
}
