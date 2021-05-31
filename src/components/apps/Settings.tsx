import { useContext, useEffect, useState } from "react";
import { Range } from "react-range";
import settings from "../../lib/global/settings";
import { typeToIcon } from "../../lib/global/windows";
import Window from "../base/Window";

export default function Settings({ pid, minimized }: { pid: string; minimized?: boolean }) {
    const config = useContext(settings);

    const [brightness, setBrightness] = useState(config.current.brightness);

    useEffect(() => {
        config.current.brightness = brightness;

        config.save();
    }, [brightness]);

    return (
        <Window
            title="Settings"
            icon={<img src={typeToIcon["settings"]} alt="icon" />}
            pid={pid}
            width={672}
            height={396}
            className="flex flex-col"
            minimized={minimized}
            disableResizing
            disableFullScreen
        >
            <div className="flex-1 flex flex-col px-4 py-3">
                <section className="brightness flex gap-4 items-center">
                    <p className="flex-shrink-0 w-32">Brightness: {Math.round(brightness * 100) + "%"}</p>
                    <Range
                        step={0.05}
                        min={0.25}
                        max={1.25}
                        values={[brightness]}
                        onChange={(values) => setBrightness(values[0])}
                        renderTrack={({ props, children }) => (
                            <div
                                className="w-full h-2 bg-gray-300"
                                {...props}
                                style={{
                                    ...props.style,
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                className="w-4 h-4 bg-gray-500"
                                {...props}
                                style={{
                                    ...props.style,
                                }}
                            />
                        )}
                    />
                </section>
            </div>
        </Window>
    );
}
