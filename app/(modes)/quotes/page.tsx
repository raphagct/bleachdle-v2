import QuotesClient from "./QuotesClient";
import { getDailyQuote, getQuoteNextReset, getAllowedQuoteIds } from "@/lib/actions/quotes.actions";
import { getYesterdayCharacterInfo, getDailyWinnersCount } from "@/lib/stats.server";

export default async function QuotesModePage() {
    const daily = await getDailyQuote();
    const nextResetTimestamp = await getQuoteNextReset();
    const allowedCharacterIds = await getAllowedQuoteIds();
    const yesterdayCharacter = await getYesterdayCharacterInfo("quotes");
    const initialWinnersCount = await getDailyWinnersCount("quotes");

    return (
        <QuotesClient
            quoteText={daily.quote}
            nextResetTimestamp={nextResetTimestamp}
            allowedCharacterIds={allowedCharacterIds}
            yesterdayCharacter={yesterdayCharacter}
            initialWinnersCount={initialWinnersCount}
        />
    );
}