import Dexie from "dexie";
import { createContext } from "react";

interface Settings {
    id: number;
    brightness: number;
}

const db = new (class Database extends Dexie {
    public readonly settings: Dexie.Table<Settings, number>;

    constructor() {
        super("lynix");

        this.version(1).stores({
            settings: "++id, brightness",
        });

        this.settings = this.table<Settings, number>("settings");
    }
})();

db.version(1).stores({
    settings: "brightness",
});

const settings = createContext({
    current: {} as { brightness: number },
    initiated: false,
    async init() {
        if (this.initiated) return;

        //@ts-ignore
        const stored = (await db.settings.toArray())[0];

        //@ts-ignore
        this.current = stored ?? { brightness: 1 };

        //@ts-ignore
        if (!stored) await db.settings.add(this.current);

        this.initiated = true;
    },
    async save() {
        console.log(this.current);

        await db.settings.update(0, this.current);
    },
});

export default settings;
