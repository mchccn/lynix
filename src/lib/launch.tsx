import Browser from "../components/apps/Browser";
import Snake from "../components/apps/Snake";
import Settings from "../components/apps/Settings";
import { WindowType } from "./global/windows";

export default function launch(type: WindowType) {
    const pid = Date.now().toString(16).padEnd(16, "0");

    switch (type) {
        case "browser":
            return {
                pid,
                type,
                component: <Browser pid={pid} />,
            };
        case "snake":
            return {
                pid,
                type,
                component: <Snake pid={pid} />,
            };
        case "settings":
            return {
                pid,
                type,
                component: <Settings pid={pid} />,
            };
    }
}
