import { TableCell, TableRow } from "@/components/ui/table";
import { CLASSIC_COLUMNS } from "./ClassicTable";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { ClassicGuessResult, CellStatus } from "@/lib/actions/types";

type ClassicRowProps = {
  guess: ClassicGuessResult;
};

export default function ClassicRow({ guess }: ClassicRowProps) {
  const getStatusBgClass = (status: CellStatus, isName: boolean): string => {
    if (isName) {
      return status === "correct"
        ? "bg-emerald-600/95 text-white"
        : "bg-card text-foreground";
    }
    switch (status) {
      case "correct":
        return "bg-emerald-600/95 text-white";
      case "partial":
        return "bg-amber-500/95 text-white";
      case "wrong":
      default:
        return "bg-rose-600/95 text-white";
    }
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
      {CLASSIC_COLUMNS.map((col) => {
        const cell = guess.feedback[col.key];
        const bgClass = getStatusBgClass(cell?.status ?? "wrong", col.key === "name");
        const valueStr = cell?.value ?? "";

        return (
          <TableCell
            key={col.key}
            className={cn(
              "relative overflow-hidden h-16 sm:h-[68px] text-center align-middle transition-colors select-none",
              col.key === "name" ? "p-0" : "p-1.5 sm:p-2",
              "border-r border-b border-background/60 dark:border-background/80 last:border-r-0",
              bgClass
            )}
          >
            {col.key === "name" ? (
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={guess.characterImageUrl}
                  alt={guess.characterName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 68px, 76px"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                {cell?.arrow && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    {cell.arrow === "up" ? (
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
