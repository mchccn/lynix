import { createContext } from "react";
import launch from "./launch";

export type WindowType = "browser";

export const typeToIcon: Record<WindowType, string> = {
    browser: "favicon.ico", // ! TEMPORARY ICON
};

const windows = createContext<{
    current: {
        pid: string;
        type: WindowType;
        component: React.ReactNode;
    }[];
    add: (type: WindowType) => void;
    remove: (pid: string) => void;
}>({
    current: [],
    add(type) {
        this.current.push(launch(type));
    },
    remove(pid) {
        console.log(this.current, pid);

        this.current = this.current.filter((w) => w.pid !== pid);

        console.log(this.current);
    },
});

export default windows;
