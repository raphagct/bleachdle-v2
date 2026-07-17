import ClassicClient from "./ClassicClient";
import { getClassicNextReset, getAllowedClassicIds } from "@/lib/actions/classic.actions";
import { getYesterdayCharacterInfo, getDailyWinnersCount } from "@/lib/stats.server";

export default async function ClassicModePage() {
  const nextResetTimestamp = await getClassicNextReset();
  const allowedCharacterIds = await getAllowedClassicIds();
  const yesterdayCharacter = await getYesterdayCharacterInfo("classic");
  const initialWinnersCount = await getDailyWinnersCount("classic");

  return (
    <ClassicClient
      nextResetTimestamp={nextResetTimestamp}
      allowedCharacterIds={allowedCharacterIds}
      yesterdayCharacter={yesterdayCharacter}
      initialWinnersCount={initialWinnersCount}
    />
  );
}