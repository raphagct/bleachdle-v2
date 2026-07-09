import { Character } from "@/lib/characters.data"
import CharacterRow from "./CharacterRow"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type CharacterColumnConfig = {
    key: keyof Character;
    label: string;
    className?: string;
};

export const CHARACTER_COLUMNS: CharacterColumnConfig[] = [
    { key: "image_url", label: "", className: "w-[60px]" },
    { key: "name", label: "Nom" },
    { key: "gender", label: "Genre" },
    { key: "race", label: "Race" },
    { key: "affiliation", label: "Affiliation" },
    { key: "abilities", label: "Capacités" },
    { key: "position", label: "Position" },
    { key: "introduction_arc", label: "Arc d'intro" },
];

export type CharacterTableProps = {
    characters: Character[]
    randomCharacter: Character
}
export default function CharacterTable({ characters, randomCharacter}: CharacterTableProps) {
    if (characters.length === 0) return null;

    return <div>
        <Table>
            <TableHeader>
                <TableRow>
                    {CHARACTER_COLUMNS.map((col) => (
                        <TableHead key={col.key} className={col.className}>
                            {col.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {characters.map((char) => (
                    <CharacterRow key={char.id} character={char} randomCharacter={randomCharacter}/>
                ))}
            </TableBody>
        </Table>
    </div>
}