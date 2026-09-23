import { ActivityCalendar, type YearData } from "@/components/ActivityCalendar";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Response = { total: Record<string, number>; contributions: Day[] };

/**
 * Public GitHub contribution data via github-contributions-api.jogruber.de
 * (no token needed), for every year of the account. Fetched on the server and
 * re-validated daily, then handed to the interactive calendar in a compact
 * form (one count list and one level string per year).
 */
async function getContributions(user: string): Promise<Response | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=all`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Response;
    return Array.isArray(data.contributions) && data.contributions.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export async function GithubActivity({ user }: { user: string }) {
  const data = await getContributions(user);
  // No data (API down, rate limit) → render nothing rather than an empty box.
  if (!data) return null;

  const byYear = new Map<number, Day[]>();
  for (const day of data.contributions) {
    const year = Number(day.date.slice(0, 4));
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(day);
  }

  const years: YearData[] = [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, days]) => {
      days.sort((a, b) => a.date.localeCompare(b.date));
      return {
        year,
        start: days[0].date,
        counts: days.map((d) => d.count),
        levels: days.map((d) => d.level).join(""),
      };
    });

  const today = new Date().toISOString().slice(0, 10);
  return <ActivityCalendar user={user} years={years} today={today} />;
}
