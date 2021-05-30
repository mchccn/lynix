import { createContext } from "react";
import FileSystem from "./classes/FileSystem";

const filesystem = createContext(new FileSystem());

export default filesystem;
