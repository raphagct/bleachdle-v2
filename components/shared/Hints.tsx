import { ReactNode, useState, useEffect, type KeyboardEvent } from "react";

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

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if ((e.key === "Enter" || e.key === " ") && isUnlocked && !revealed) {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={!isUnlocked}
            aria-disabled={!isUnlocked}
            className={`flex flex-col items-center justify-center p-4 text-center border-4 min-h-[9.5rem] h-auto rounded-xl transition-all duration-300 ${
                !isUnlocked
                    ? "border-muted/80 bg-card/40 opacity-75 cursor-not-allowed select-none"
                    : !revealed
                        ? "border-primary/50 bg-card/80 hover:border-primary hover:bg-card hover:scale-[1.02] cursor-pointer select-none shadow-sm"
                        : "border-primary bg-card cursor-default shadow-md"
            }`}
        >
            <div className={`[&>svg]:text-primary transition-all duration-300 ${revealed && isUnlocked ? "mb-1.5 [&>svg]:size-7" : "mb-2.5 [&>svg]:size-9"}`}>
                {item.icon}
            </div>
            <div className="text-xs sm:text-sm font-medium text-foreground leading-snug w-full flex flex-col items-center justify-center transition-opacity duration-300">
                {!isUnlocked || !revealed ? (
                    item.description
                ) : (
                    item.hint ?? item.description
                )}
            </div>
        </button>
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