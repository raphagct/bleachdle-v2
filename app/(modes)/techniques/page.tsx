import TechniquesClient from "./TechniquesClient";
import { getDailyTechnique, getTechniqueNextReset, getAllowedTechniqueIds } from "@/lib/actions/techniques.actions";
import { getYesterdayCharacterInfo, getDailyWinnersCount } from "@/lib/stats.server";

export default async function TechniquesModePage() {
    const daily = await getDailyTechnique();
    const nextResetTimestamp = await getTechniqueNextReset();
    const allowedCharacterIds = await getAllowedTechniqueIds();
    const yesterdayCharacter = await getYesterdayCharacterInfo("techniques");
    const initialWinnersCount = await getDailyWinnersCount("techniques");

    return (
        <TechniquesClient
            gifUrl={daily.gifUrl}
            nextResetTimestamp={nextResetTimestamp}
            allowedCharacterIds={allowedCharacterIds}
            yesterdayCharacter={yesterdayCharacter}
            initialWinnersCount={initialWinnersCount}
        />
    );
}