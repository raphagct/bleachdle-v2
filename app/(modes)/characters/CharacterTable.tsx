import { Character } from "@/lib/characters.data"
import CharacterRow from "./CharacterRow"

export type CharacterTableProps = {
    characters: Character[]
}
export default function CharacterTable({characters} : CharacterTableProps) {
    if (characters.length === 0) return null;

    return <table>
        <thead>
            <tr>
                {Object.keys(characters[0]).map((key) => (
                    <th key={key}>{key}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {characters.map((char) => (
                <CharacterRow key={char.id} character={char}/>
            ))}
        </tbody>
    </table>
}