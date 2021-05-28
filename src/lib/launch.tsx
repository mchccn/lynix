import Browser from "../components/apps/Browser";
import { WindowType } from "./windows";

export default function launch(type: WindowType) {
    const pid = Date.now().toString(16).padEnd(16, "0");

    switch (type) {
        case "browser":
            return {
                pid,
                type,
                component: <Browser pid={pid} />,
            };
    }
}
