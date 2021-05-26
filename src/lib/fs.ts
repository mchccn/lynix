import { createContext } from "react";

const filesystem = createContext(
    new (class FileSystem {
        #pwd = "/";

        public get pwd() {
            return this.#pwd;
        }
    })()
);

export default filesystem;
