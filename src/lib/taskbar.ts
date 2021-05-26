import { createContext } from "react";

const taskbar = createContext<
    {
        pid: string;
        icon: string;
    }[]
>([]);

export default taskbar;
