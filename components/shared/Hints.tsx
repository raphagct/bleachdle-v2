import { ReactNode, useState, useEffect } from "react"

export interface HintData {
    icon: ReactNode;
    description: string | ReactNode;
    hint?: string | ReactNode;
    isUnlocked?: boolean;
}

interface HintProps {
    hint1: HintData;
    hint2: HintData;
}

function HintCard({ item }: { item: HintData }) {
    const [revealed, setRevealed] = useState(false);
    const isUnlocked = item.isUnlocked ?? false;

    useEffect(() => {
        if (!isUnlocked) {
            setRevealed(false);
        }
    }, [isUnlocked]);

    const handleClick = () => {
        if (isUnlocked && !revealed) {
            setRevealed(true);
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center p-4 text-center border-4 min-h-[8rem] h-auto rounded-lg transition-colors duration-200 ${
                !isUnlocked
                    ? "border-muted opacity-80 cursor-not-allowed select-none"
                    : !revealed
                        ? "border-primary/50 hover:border-primary cursor-pointer select-none"
                        : "border-primary cursor-default"
            }`}
        >
            <div className={`[&>svg]:text-primary transition-all duration-200 ${revealed && isUnlocked ? "mb-1 [&>svg]:size-8" : "mb-2 [&>svg]:size-10"}`}>
                {item.icon}
            </div>
            <div className="text-sm font-medium text-foreground leading-tight w-full flex flex-col items-center justify-center">
                {!isUnlocked || !revealed ? (
                    item.description
                ) : (
                    item.hint ?? item.description
                )}
            </div>
        </div>
    );
}

export default function Hints({ hint1, hint2 }: HintProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <HintCard item={hint1} />
            <HintCard item={hint2} />
        </div>
    );
}