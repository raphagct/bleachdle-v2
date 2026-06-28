import { ModeHeader } from "@/components/layout/mode-header";

export default function ModesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ModeHeader />
            <main>
                {children}
            </main>
        </div>
    );
}
