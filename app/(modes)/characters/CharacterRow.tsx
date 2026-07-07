import { Character } from "@/lib/characters.data";

type CharacterRowProps = {
    character: Character
}

export default function CharacterRow({ character }: CharacterRowProps) {
    return <tr>
        {Object.entries(character).map(([key, value]) => (
            <td key={key}>{Array.isArray(value) ? value.join(", ") : value}</td>
        ))}
    </tr>
}