import { Character } from "@/lib/characters.data"
import CharacterRow from "./CharacterRow"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";

export type CharacterColumnConfig = {
    key: keyof Character;
    label: string;
    className?: string;
};

export const CHARACTER_COLUMNS: CharacterColumnConfig[] = [
    { key: "name", label: "Personnage", className: "w-[68px] sm:w-[76px] text-center font-semibold" },
    { key: "gender", label: "Genre", className: "w-[75px] text-center" },
    { key: "race", label: "Race", className: "w-[100px] text-center" },
    { key: "affiliation", label: "Affiliation", className: "w-[135px] text-center" },
    { key: "abilities", label: "Capacités", className: "w-[160px] text-center" },
    { key: "position", label: "Position", className: "w-[130px] text-center" },
    { key: "introduction_arc", label: "Arc d'intro", className: "w-[160px] text-center" },
];

export type CharacterTableProps = {
    characters: Character[]
    randomCharacter: Character
}

export default function CharacterTable({ characters, randomCharacter }: CharacterTableProps) {
    if (characters.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto mt-6 px-1">
            <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
                <Table className="w-full border-collapse">
                    <TableHeader className="bg-muted border-b border-border/50">
                        <TableRow className="hover:bg-transparent border-none">
                            {CHARACTER_COLUMNS.map((col) => (
                                <TableHead key={col.key} className={cn("text-xs sm:text-sm font-semibold text-foreground py-3 px-1.5 text-center align-middle h-auto select-none border-r border-border/20 last:border-r-0", col.className)}>
                                    {col.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {characters.map((char) => (
                            <CharacterRow key={char.id} character={char} randomCharacter={randomCharacter} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}