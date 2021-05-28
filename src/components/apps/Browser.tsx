import Window from "../Window";

export default function Browser({ pid, minimized }: { pid: string; minimized?: boolean }) {
    return (
        <Window title="Googol" icon={<img src="favicon.ico" alt="icon" />} pid={pid} width={512} height={384} minimized={minimized}>
            main content {pid}
        </Window>
    );
}
