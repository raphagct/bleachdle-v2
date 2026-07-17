"use client";

import Image from "next/image";
import { Users, History } from "lucide-react";
import type { YesterdayCharacterInfo } from "@/lib/stats.server";

type DailyStatsBannerProps = {
  yesterdayCharacter: YesterdayCharacterInfo;
  winnersCount: number;
};

export default function DailyStatsBanner({ yesterdayCharacter, winnersCount }: DailyStatsBannerProps) {
  return (
    <div className="max-w-lg mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm bg-card border-2 border-border/80 rounded-xl px-4 py-2.5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 text-muted-foreground font-medium shrink-0">
          <History className="size-3.5 text-primary" />
          <span>Hier :</span>
        </span>
        <div className="flex items-center gap-1.5 font-bold text-foreground">
          {yesterdayCharacter.image_url && (
            <Image
              src={yesterdayCharacter.image_url}
              alt={yesterdayCharacter.name}
              width={24}
              height={24}
              className="size-6 rounded-full object-cover border border-border shrink-0"
              style={{ width: "auto", height: "auto" }}
            />
          )}
          <span className="truncate max-w-[150px] sm:max-w-[180px]">{yesterdayCharacter.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/20 shrink-0">
        <Users className="size-3.5 sm:size-4 shrink-0 animate-pulse" />
        <span><strong className="font-bold">{winnersCount}</strong> trouvé{winnersCount > 1 ? 's' : ''} aujourd'hui</span>
      </div>
    </div>
  );
}
