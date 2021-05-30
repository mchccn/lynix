import leven from "leven";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import windows, { allApps, typeToIcon } from "../lib/windows";

export default function Launcher({ launcherActive, setLauncherActive }: { launcherActive: boolean; setLauncherActive: Dispatch<SetStateAction<boolean>> }) {
    const activeWindows = useContext(windows);

    const [launcherSearch, setLauncherSearch] = useState("");
    const [filteredApps, setFilteredApps] = useState([...allApps]);

    useEffect(() => {
        if (launcherSearch)
            setFilteredApps(
                [...allApps]
                    .filter((app) => app.name.toLowerCase().includes(launcherSearch.toLowerCase()))
                    .sort((a, b) => leven(b.name.toLowerCase(), launcherSearch.toLowerCase()) - leven(a.name.toLowerCase(), launcherSearch.toLowerCase()))
            );
        else setFilteredApps([...allApps]);
    }, [launcherSearch]);

    return (
        <div
            className="launcher absolute top-full w-80 bg-gray-900 text-gray-100 px-2 py-1 shadow-sm flex flex-col z-50"
            style={{
                display: launcherActive ? "flex" : "none",
            }}
        >
            <div className="launcher-search flex items-center py-1 relative">
                <svg className="w-4 h-4 stroke-current text-blue-600 absolute ml-2" width="24" height="24" viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd">
                    <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z" />
                </svg>
                <input
                    className="bg-gray-800 bg-opacity-50 text-gray-100 pl-8 w-full text-sm py-1 rounded-sm outline-none z-50"
                    id="launcher-search-input"
                    type="text"
                    onChange={(e) => setLauncherSearch(e.target.value)}
                    value={launcherSearch}
                    autoComplete="off"
                    autoCapitalize="false"
                    autoCorrect="false"
                    onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            activeWindows.add(filteredApps[0].type);
                            setLauncherActive(false);
                            setLauncherSearch("");
                        }

                        return;
                    }}
                />
            </div>
            <div className="flex flex-col gap-2 px-1 py-2">
                {filteredApps.map(({ name, type }, i) => (
                    <div
                        className="flex items-center gap-2.5 cursor-pointer px-3 py-2 hover:bg-gray-800 hover:bg-opacity-25 rounded"
                        onClick={() => {
                            activeWindows.add(type);
                            setLauncherActive(false);
                            setLauncherSearch("");
                        }}
                        key={i}
                    >
                        <img className="w-6 h-6" src={typeToIcon[type]} alt={name} />
                        <p>{name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
