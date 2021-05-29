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
    moveToTop: (pid: string) => void;
    update: (fn: Function) => void;
}>({
    current: [],
    add(type) {
        this.current.push(launch(type));
    },
    remove(pid) {
        this.current = this.current.filter((w) => w.pid !== pid);
    },
    moveToTop(pid) {
        this.current.push(
            this.current.splice(
                this.current.findIndex((w) => w.pid === pid),
                1
            )[0]
        );
    },
    update(fn: Function) {
        fn();
    },
});

export default windows;
