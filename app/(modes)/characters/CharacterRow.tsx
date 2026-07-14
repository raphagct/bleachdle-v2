import { TableCell, TableRow } from "@/components/ui/table";
import { Character } from "@/lib/characters.data";
import { CHARACTER_COLUMNS } from "./CharacterTable";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

const ARC_ORDER = [
  "Arc du Shinigami Remplaçant",
  "Arc de la Soul Society",
  "Arc Arrancar",
  "Arc du Shinigami Remplaçant Perdu",
  "Arc de la Guerre Sanglante de Mille Ans",
];

const getEspadaRank = (pos: string): number => {
  if (pos.includes("Cero")) return 0;
  if (pos.includes("Primera")) return 1;
  if (pos.includes("Segunda")) return 2;
  if (pos.includes("Tres")) return 3;
  if (pos.includes("Cuatro")) return 4;
  if (pos.includes("Quinto")) return 5;
  if (pos.includes("Sexta")) return 6;
  if (pos.includes("Séptima")) return 7;
  if (pos.includes("Octava")) return 8;
  if (pos.includes("Novena")) return 9;
  if (pos.includes("Décima")) return 10;
  return -1;
};

type CharacterRowProps = {
  character: Character;
  randomCharacter: Character;
};

export default function CharacterRow({ character, randomCharacter }: CharacterRowProps) {
  const getCellFeedback = (key: keyof Character): { className: string; arrow: "up" | "down" | null } => {
    if (key === "name") {
      if (character.id === randomCharacter.id) {
        return { className: "bg-emerald-600/95 text-white", arrow: null };
      }
      return { className: "bg-card text-foreground", arrow: null };
    }

    const val1 = character[key];
    const val2 = randomCharacter[key];

    // 1. Cas des tableaux (ex: race, abilities)
    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (val1.length === val2.length && val1.every((item) => val2.includes(item))) {
        return { className: "bg-emerald-600/95 text-white", arrow: null };
      }
      if (val1.some((item) => val2.includes(item))) {
        return { className: "bg-amber-500/95 text-white", arrow: null };
      }
      return { className: "bg-rose-600/95 text-white", arrow: null };
    }

    // 2. Égalité exacte (valeurs simples)
    if (val1 === val2) {
      return { className: "bg-emerald-600/95 text-white", arrow: null };
    }

    // 3. Cas particulier : Arc d'introduction
    if (key === "introduction_arc") {
      const idx1 = ARC_ORDER.indexOf(val1 as string);
      const idx2 = ARC_ORDER.indexOf(val2 as string);
      let arrow: "up" | "down" | null = null;
      if (idx1 !== -1 && idx2 !== -1) {
        arrow = idx2 > idx1 ? "up" : "down";
      }
      return { className: "bg-rose-600/95 text-white", arrow };
    }

    // 4. Cas particulier : Position (flèche UNIQUEMENT si c'est orange / dans la même hiérarchie)
    if (key === "position" && typeof val1 === "string" && typeof val2 === "string") {
      // A. Divisions (Gotei 13)
      if (val1.includes("Division") && val2.includes("Division")) {
        const num1 = parseInt(val1, 10);
        const num2 = parseInt(val2, 10);
        let arrow: "up" | "down" | null = null;
        if (!isNaN(num1) && !isNaN(num2) && num1 !== num2) {
          arrow = num2 > num1 ? "up" : "down";
        }
        return { className: "bg-amber-500/95 text-white", arrow };
      }

      // B. Espada (Arrancars)
      if (val1.includes("Espada") && val2.includes("Espada")) {
        const r1 = getEspadaRank(val1);
        const r2 = getEspadaRank(val2);
        let arrow: "up" | "down" | null = null;
        if (r1 !== -1 && r2 !== -1 && r1 !== r2) {
          arrow = r2 > r1 ? "up" : "down";
        }
        return { className: "bg-amber-500/95 text-white", arrow };
      }

      // C. Sternritter (Quincies)
      if (val1.startsWith("Sternritter") && val2.startsWith("Sternritter")) {
        const letter1 = val1.replace("Sternritter ", "").trim();
        const letter2 = val2.replace("Sternritter ", "").trim();
        let arrow: "up" | "down" | null = null;
        if (letter1 && letter2 && letter1 !== letter2) {
          arrow = letter2.localeCompare(letter1) > 0 ? "up" : "down";
        }
        return { className: "bg-amber-500/95 text-white", arrow };
      }
    }

    // 5. Autre cas de non-correspondance (rouge, sans flèche)
    return { className: "bg-rose-600/95 text-white", arrow: null };
  };

  const getTextSizeClass = (val: string) => {
    if (val.length > 32) {
      return "text-[10px] sm:text-[11px] leading-[1.15] font-medium";
    }
    if (val.length > 18) {
      return "text-[11px] sm:text-xs leading-tight font-medium";
    }
    return "text-xs sm:text-sm font-semibold";
  };

  return (
    <TableRow className="hover:bg-transparent border-none">
      {CHARACTER_COLUMNS.map((col) => {
        const value = character[col.key];
        const feedback = getCellFeedback(col.key);
        const valueStr = Array.isArray(value) ? value.join(", ") : String(value ?? "");

        return (
          <TableCell
            key={col.key}
            className={cn(
              "relative overflow-hidden h-16 sm:h-[68px] text-center align-middle transition-colors select-none",
              col.key === "name" ? "p-0" : "p-1.5 sm:p-2",
              "border-r border-b border-background/60 dark:border-background/80 last:border-r-0",
              feedback.className
            )}
          >
            {col.key === "name" ? (
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={character.image_url}
                  alt={character.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 68px, 76px"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                {feedback.arrow && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    {feedback.arrow === "up" ? (
                      <ArrowUp className="size-14 sm:size-16 stroke-[2.5]" />
                    ) : (
                      <ArrowDown className="size-14 sm:size-16 stroke-[2.5]" />
                    )}
                  </div>
                )}
                <div className="relative z-10 flex items-center justify-center text-center w-full px-0.5 drop-shadow-sm">
                  <span className={getTextSizeClass(valueStr)}>
                    {valueStr}
                  </span>
                </div>
              </div>
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
