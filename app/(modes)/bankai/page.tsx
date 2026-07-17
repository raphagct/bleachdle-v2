import BankaiClient from "./BankaiClient";
import { getDailyBankai, getBankaiNextReset, getAllowedBankaiIds } from "@/lib/actions/bankai.actions";
import { getYesterdayCharacterInfo, getDailyWinnersCount } from "@/lib/stats.server";

export default async function BankaiModePage() {
    const daily = await getDailyBankai();
    const nextResetTimestamp = await getBankaiNextReset();
    const allowedCharacterIds = await getAllowedBankaiIds();
    const yesterdayCharacter = await getYesterdayCharacterInfo("bankai");
    const initialWinnersCount = await getDailyWinnersCount("bankai");

    return (
        <BankaiClient
            bankaiName={daily.name}
            nextResetTimestamp={nextResetTimestamp}
            allowedCharacterIds={allowedCharacterIds}
            yesterdayCharacter={yesterdayCharacter}
            initialWinnersCount={initialWinnersCount}
        />
    );
}