import Image from "next/image"

type CharacterTryInfo = {
    name?: string;
    characterName?: string;
    image_url?: string;
    characterImageUrl?: string;
};

type TriesContainerProps = {
    characterTry: CharacterTryInfo;
    isWin: boolean;
};

export default function TriesContainer({ characterTry, isWin }: TriesContainerProps) {
    const name = characterTry.name ?? characterTry.characterName ?? "Inconnu";
    const imageUrl = characterTry.image_url ?? characterTry.characterImageUrl ?? "";

    return (
        <div
            className="max-w-[400px] mx-auto mt-3 p-3 gap-2 border rounded-xl flex flex-col items-center justify-center font-semibold text-white shadow-sm"
            style={{ background: isWin ? "#16a34a" : "#dc2626" }}
        >
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={name + " icon"}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                    style={{ width: "auto", height: "auto" }}
                />
            )}
            <span className="text-base leading-tight">{name}</span>
        </div>
    );
}