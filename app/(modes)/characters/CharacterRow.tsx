import { TableCell, TableRow } from "@/components/ui/table";
import { Character } from "@/lib/characters.data";
import { CHARACTER_COLUMNS } from "./CharacterTable";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CharacterRowProps = {
  character: Character;
  randomCharacter: Character;
};

export default function CharacterRow({ character, randomCharacter }: CharacterRowProps) {
  const getCellFeedbackClass = (key: keyof Character) => {
    if (key === "image_url") return "";

    const val1 = character[key];
    const val2 = randomCharacter[key];
    // 1. Cas des tableaux (ex: race, abilities)
    if (Array.isArray(val1) && Array.isArray(val2)) {
      // Égalité exacte
      if (
        val1.length === val2.length &&
        val1.every((item) => val2.includes(item))
      ) {
        return "bg-emerald-600/80 text-white border-emerald-700 font-medium";
      }
      // Intersection partielle (Orange)
      if (val1.some((item) => val2.includes(item))) {
        return "bg-amber-500/80 text-white border-amber-600 font-medium";
      }
      // Aucune correspondance
      return "bg-rose-600/80 text-white border-rose-700";
    }

    // 2. Cas des valeurs simples (string, number)
    if (val1 === val2) {
      return "bg-emerald-600/80 text-white border-emerald-700 font-medium";
    }

    return "bg-rose-600/80 text-white border-rose-700";
  };

  return (
    <TableRow>
      {CHARACTER_COLUMNS.map((col) => {
        const value = character[col.key];
        return (
          <TableCell
            key={col.key}
            className={cn(
              "border-r border-border last:border-r-0",
              "whitespace-normal break-words max-w-[150px] p-3 text-center align-middle transition-colors",
              getCellFeedbackClass(col.key)
            )}>
            {col.key === "image_url" ? (
              <div className="flex justify-center">
                <Image
                  src={value as string}
                  alt={character.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover w-10 h-10"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            ) : Array.isArray(value) ? (
              value.join(", ")
            ) : (
              value
            )}
          </TableCell>
        )
      })}
    </TableRow>
  );
}
