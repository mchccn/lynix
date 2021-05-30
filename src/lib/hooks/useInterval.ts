import { useEffect, useRef } from "react";

export function useInterval(callback: (...args: any[]) => void, delay?: number) {
    const savedCallback = useRef<((...args: any[]) => void) | undefined>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (typeof delay === "number") {
            const id = setInterval(() => savedCallback.current!(), delay);

            return () => clearInterval(id);
        }

        return;
    }, [delay]);
}
