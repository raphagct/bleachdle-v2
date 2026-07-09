import { Character } from "@/lib/characters.data"
import Image from "next/image"

type TriesContainerProps = {
    characterTry: Character,
    isWin: boolean
}

export default function TriesContainer({ characterTry, isWin }: TriesContainerProps) {
    return <div
        className="max-w-[400px] mx-auto mt-3 p-3 gap-2 border rounded-xl flex flex-col items-center justify-center font-semibold text-white shadow-sm"
        style={{ background: isWin ? "#16a34a" : "#dc2626" }}>
        <Image
            src={characterTry.image_url}
            alt={characterTry.name + " icon"}
            width={56}
            height={56}
            className="w-14 h-14 rounded-lg object-cover shadow-sm"
            style={{ width: "auto", height: "auto" }} />
        <span className="text-base leading-tight">{characterTry.name}</span>
    </div >
}