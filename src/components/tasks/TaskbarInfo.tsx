export default function TaskbarInfo({ time }: { time: Date }) {
    return (
        <div className="taskbar-info h-full px-2 grid place-items-center border-l border-gray-900 hover:bg-gray-800 hover:bg-opacity-50 transition-colors cursor-pointer flex-shrink-0">
            <div className="general-info grid place-items-center">
                <p className="tasknar-time text-gray-100 text-xs">
                    {(time.getHours() > 12 ? time.getHours() - 12 : time.getHours()).toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}{" "}
                    {time.getHours() >= 12 ? "PM" : "AM"}
                </p>
            </div>
        </div>
    );
}
