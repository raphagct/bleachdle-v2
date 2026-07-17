import ClassicRow from "./ClassicRow"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import type { ClassicGuessResult } from "@/lib/actions/types";

export type ClassicColumnConfig = {
    key: string;
    label: string;
    className?: string;
};

export const CLASSIC_COLUMNS: ClassicColumnConfig[] = [
    { key: "name", label: "Personnage", className: "w-[68px] sm:w-[76px] text-center font-semibold" },
    { key: "gender", label: "Genre", className: "w-[75px] text-center" },
    { key: "race", label: "Race", className: "w-[100px] text-center" },
    { key: "affiliation", label: "Affiliation", className: "w-[135px] text-center" },
    { key: "abilities", label: "Capacités", className: "w-[160px] text-center" },
    { key: "position", label: "Position", className: "w-[130px] text-center" },
    { key: "introduction_arc", label: "Arc d'intro", className: "w-[160px] text-center" },
];

export type ClassicTableProps = {
    guesses: ClassicGuessResult[];
}

export default function ClassicTable({ guesses }: ClassicTableProps) {
    if (guesses.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto mt-6 px-1">
            <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
                <Table className="w-full border-collapse">
                    <TableHeader className="bg-muted border-b border-border/50">
                        <TableRow className="hover:bg-transparent border-none">
                            {CLASSIC_COLUMNS.map((col) => (
                                <TableHead key={col.key} className={cn("text-xs sm:text-sm font-semibold text-foreground py-3 px-1.5 text-center align-middle h-auto select-none border-r border-border/20 last:border-r-0", col.className)}>
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {guesses.map((guess) => (
                            <ClassicRow key={guess.characterId} guess={guess} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
