import { ModeHeader } from "@/components/layout/mode-header";

export default function ModesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative z-10">
            <ModeHeader />
            <main>
                {children}
            </main>
        </div>
    );
}
