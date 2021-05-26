import { createContext } from "react";
import FileSystem from "./FileSystem";

const filesystem = createContext(new FileSystem());

export default filesystem;
