"use server";

import { getTodayDateString, getYesterdayDateString, getDailyIndex } from "@/lib/game.server";
import { characters } from "@/lib/characters.data";
import { bankais } from "@/lib/bankai.data";
import { quotes } from "@/lib/quotes.data";
import { techniques } from "@/lib/techniques.data";
import fs from "fs";
import path from "path";

export type YesterdayCharacterInfo = {
    name: string;
    image_url: string;
};

export async function getYesterdayCharacterInfo(mode: "classic" | "bankai" | "quotes" | "techniques"): Promise<YesterdayCharacterInfo> {
    const yesterdayStr = getYesterdayDateString();

    if (mode === "classic") {
        const idx = getDailyIndex("classic", characters.length, yesterdayStr);
        const char = characters[idx];
        return { name: char?.name ?? "Inconnu", image_url: char?.image_url ?? "" };
    }
    if (mode === "bankai") {
        const idx = getDailyIndex("bankai", bankais.length, yesterdayStr);
        const bankai = bankais[idx];
        const char = characters.find(c => c.id === bankai?.characterId) || characters[0];
        return { name: char?.name ?? "Inconnu", image_url: char?.image_url ?? "" };
    }
    if (mode === "quotes") {
        const idx = getDailyIndex("quotes", quotes.length, yesterdayStr);
        const quote = quotes[idx];
        const char = characters.find(c => c.id === quote?.character_id) || characters[0];
        return { name: char?.name ?? "Inconnu", image_url: char?.image_url ?? "" };
    }
    if (mode === "techniques") {
        const idx = getDailyIndex("techniques", techniques.length, yesterdayStr);
        const tech = techniques[idx];
        const char = characters.find(c => c.id === tech?.character_id) || characters[0];
        return { name: char?.name ?? "Inconnu", image_url: char?.image_url ?? "" };
    }

    return { name: "Ichigo Kurosaki", image_url: "" };
}

// Fichier temporaire pour stocker localement le compteur de victoires quotidiennes
const STATS_FILE = path.join("/tmp", "bleachdle-daily-stats.json");

function readStats(): Record<string, number> {
    try {
        if (fs.existsSync(STATS_FILE)) {
            const data = fs.readFileSync(STATS_FILE, "utf-8");
            return JSON.parse(data);
        }
    } catch {
        // Ignorer
    }
    return {};
}

function writeStats(stats: Record<string, number>) {
    try {
        fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), "utf-8");
    } catch {
        // Ignorer
    }
}

export async function getDailyWinnersCount(mode: string): Promise<number> {
    const today = getTodayDateString();
    const key = `${mode}-${today}`;
    const stats = readStats();

    if (stats[key] === undefined) {
        stats[key] = 0;
        writeStats(stats);
    }
    return stats[key];
}

export async function incrementDailyWinnersCount(mode: string): Promise<number> {
    const today = getTodayDateString();
    const key = `${mode}-${today}`;
    const stats = readStats();

    const current = stats[key] ?? (await getDailyWinnersCount(mode));
    stats[key] = current + 1;
    writeStats(stats);

    return stats[key];
}
