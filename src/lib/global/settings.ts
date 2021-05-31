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
    current: {} as { id: number; brightness: number },
    initiated: false,
    async init() {
        if (this.initiated) return;

        //@ts-ignore
        const stored = (await db.settings.toArray())[0];

        //@ts-ignore
        this.current = stored ?? { brightness: 0.5 };

        //@ts-ignore
        if (!stored) {
            const id = await db.settings.add(this.current);

            this.current.id = id;
        }

        this.initiated = true;
    },
    async save() {
        await db.settings.update(this.current.id, this.current);
    },
});

export default settings;
