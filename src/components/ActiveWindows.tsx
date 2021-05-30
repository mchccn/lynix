import React, { useContext } from "react";
import windows from "../lib/global/windows";
import Wrapper from "./base/Wrapper";

export default function ActiveWindows() {
    const activeWindows = useContext(windows);

    return (
        <>
            {activeWindows.current.map(({ component, pid }) => (
                <Wrapper key={pid}>{component}</Wrapper>
            ))}
        </>
    );
}
