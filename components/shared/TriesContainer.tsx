import { Character } from "@/lib/characters.data"
import Image from "next/image"

type TriesContainerProps = {
    characterTry: Character,
    isWin: boolean
}

export default function TriesContainer({ characterTry, isWin }: TriesContainerProps) {
    return <div
        className="max-w-lg mx-auto mt-4 p-4 gap-4 border rounded-lg flex items-center justify-center font-semibold text-white"
        style={{ background: isWin ? "green" : "red" }}>
        <Image
            src={characterTry.image_url}
            alt={characterTry.name + " icon"}
            width={60}
            height={60} />
        <span>{characterTry.name}</span>
    </div >
}