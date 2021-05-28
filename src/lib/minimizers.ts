import { createContext } from "react";

const minimizers = createContext<{
    current: {
        [pid: string]: () => boolean;
    };
    add(pid: string, fn: () => boolean): void;
    remove(pid: string): boolean;
}>({
    current: {},
    add(pid: string, fn: () => boolean) {
        this.current[pid] = fn;
    },
    remove(pid: string) {
        return delete this.current[pid];
    },
});

export default minimizers;
