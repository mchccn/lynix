import Browser from "../components/apps/Browser";
import { WindowType } from "./windows";

const getComponent: Record<WindowType, Function> = {
    browser: Browser,
};

export default getComponent;
