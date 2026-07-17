/**
 * Utilitaires serveur pour le challenge quotidien.
 * Ce fichier n'est JAMAIS importé côté client.
 */

/**
 * Hash déterministe basé sur une chaîne.
 * Tous les joueurs obtiennent le même résultat pour la même date + mode.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // conversion en entier 32 bits
  }
  return Math.abs(hash);
}

/**
 * Retourne la date du jour au format "YYYY-MM-DD" en timezone Europe/Paris.
 */
export function getTodayDateString(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Paris" });
}

/**
 * Retourne la date d'hier au format "YYYY-MM-DD" en timezone Europe/Paris.
 */
export function getYesterdayDateString(): string {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400000);
  return yesterday.toLocaleDateString("en-CA", { timeZone: "Europe/Paris" });
}

/**
 * Retourne l'index du challenge du jour (ou pour une date donnée) pour un mode donné.
 * Le même index est retourné pour tous les joueurs le même jour.
 */
export function getDailyIndex(mode: string, dataLength: number, customDateStr?: string): number {
  const dateStr = customDateStr ?? getTodayDateString();
  const seed = hashString(`${dateStr}-${mode}`);
  return seed % dataLength;
}

/**
 * Retourne le timestamp (ms) du prochain reset (minuit Europe/Paris).
 */
export function getNextResetTimestamp(): number {
  const now = new Date();
  const nowParis = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" }));
  const midnightParis = new Date(nowParis);
  midnightParis.setHours(24, 0, 0, 0);
  const remainingMs = midnightParis.getTime() - nowParis.getTime();
  return now.getTime() + remainingMs;
}
