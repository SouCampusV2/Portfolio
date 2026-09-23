type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Response = { total: { lastYear: number }; contributions: Day[] };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Public GitHub contribution data via github-contributions-api.jogruber.de
 * (no token needed). Fetched on the server and re-validated daily, so the
 * heatmap is plain HTML with no client JS.
 */
async function getContributions(user: string): Promise<Response | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as Response;
    return Array.isArray(data.contributions) && data.contributions.length > 0 ? data : null;
  } catch {
    return null;
  }
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export async function GithubActivity({ user }: { user: string }) {
  const data = await getContributions(user);
  // No data (API down, rate limit) → render nothing rather than an empty box.
  if (!data) return null;

  // Columns are weeks starting on Sunday; pad the first week so weekdays line up.
  const firstWeekday = new Date(`${data.contributions[0].date}T00:00:00Z`).getUTCDay();
  const cells: (Day | null)[] = [...Array(firstWeekday).fill(null), ...data.contributions];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // Label a column when a new month starts inside that week.
  let lastMonth = -1;
  const monthLabels = weeks.map((week) => {
    const first = week.find((d) => d && Number(d.date.slice(8)) <= 7);
    const month = first ? Number(first.date.slice(5, 7)) - 1 : -1;
    if (month !== -1 && month !== lastMonth) {
      lastMonth = month;
      return MONTHS[month];
    }
    return "";
  });

  const cols = { gridTemplateColumns: `repeat(${weeks.length}, 11px)` };

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex flex-col gap-1.5">
          <div aria-hidden="true" className="grid gap-[3px] font-mono text-[0.65rem] text-muted" style={cols}>
            {monthLabels.map((label, i) => (
              <span key={i} className="whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>
          <div
            role="img"
            aria-label={`${data.total.lastYear} GitHub contributions in the last year`}
            className="grid grid-flow-col grid-rows-7 gap-[3px]"
            style={cols}
          >
            {weeks.flatMap((week, w) =>
              Array.from({ length: 7 }, (_, d) => {
                const day = week[d];
                if (!day) return <span key={`${w}-${d}`} className="size-[11px]" />;
                return (
                  <span
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`}
                    className={`heat-${day.level} size-[11px] rounded-[3px]`}
                  />
                );
              }),
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <p>
          <span className="font-medium text-ink tabular-nums">
            {data.total.lastYear.toLocaleString("en-US")}
          </span>{" "}
          contributions in the last year
        </p>
        <div aria-hidden="true" className="flex items-center gap-1.5 font-mono text-[0.65rem]">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`heat-${l} size-[11px] rounded-[3px]`} />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
