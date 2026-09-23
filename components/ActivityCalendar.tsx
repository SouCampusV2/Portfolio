"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type YearData = {
  year: number;
  /** First date in `counts` (YYYY-MM-DD, normally Jan 1). */
  start: string;
  counts: number[];
  /** One digit 0–4 per day, same order as `counts`. */
  levels: string;
};

type Cell = { date: string; count: number; level: number; future: boolean };
type View = "last" | number;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY = 86_400_000;

const toTime = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
const toIso = (t: number) => new Date(t).toISOString().slice(0, 10);

function longLabel(iso: string) {
  const d = new Date(toTime(iso));
  return `${WEEKDAYS[d.getUTCDay()]}, ${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function shortLabel(iso: string) {
  const d = new Date(toTime(iso));
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

/**
 * GitHub-style contribution calendar: switch between the last 12 months and
 * each year, hover (or tap) a day to see its count, and read streaks and the
 * best day underneath.
 */
export function ActivityCalendar({
  user,
  years,
  today,
}: {
  user: string;
  years: YearData[];
  today: string;
}) {
  const [view, setView] = useState<View>("last");
  const [tip, setTip] = useState<{ text: string; x: number; y: number; align: "left" | "center" | "right" } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // On narrow screens the calendar scrolls sideways: start at the newest weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = view === "last" ? el.scrollWidth : 0;
  }, [view]);

  // date → [count, level] across every year
  const byDate = useMemo(() => {
    const map = new Map<string, [number, number]>();
    for (const y of years) {
      const t0 = toTime(y.start);
      y.counts.forEach((count, i) => map.set(toIso(t0 + i * DAY), [count, Number(y.levels[i])]));
    }
    return map;
  }, [years]);

  const { weeks, months, stats } = useMemo(() => {
    const todayT = toTime(today);
    const [from, to] =
      view === "last"
        ? [todayT - 364 * DAY, todayT]
        : [toTime(`${view}-01-01`), toTime(`${view}-12-31`)];

    // Columns are weeks starting on Sunday; pad the first one.
    const cells: (Cell | null)[] = Array(new Date(from).getUTCDay()).fill(null);
    for (let t = from; t <= to; t += DAY) {
      const date = toIso(t);
      const [count, level] = byDate.get(date) ?? [0, 0];
      cells.push({ date, count, level, future: t > todayT });
    }
    const weeks: (Cell | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    let lastMonth = -1;
    const months = weeks.map((week) => {
      const first = week.find((c) => c && Number(c.date.slice(8)) <= 7);
      const m = first ? Number(first.date.slice(5, 7)) - 1 : -1;
      if (m !== -1 && m !== lastMonth) {
        lastMonth = m;
        return MONTHS[m];
      }
      return "";
    });

    const real = cells.filter((c): c is Cell => !!c && !c.future);
    const total = real.reduce((s, c) => s + c.count, 0);
    const active = real.filter((c) => c.count > 0).length;
    const best = real.reduce<Cell | null>((b, c) => (c.count > (b?.count ?? 0) ? c : b), null);
    let longest = 0;
    let run = 0;
    for (const c of real) {
      run = c.count > 0 ? run + 1 : 0;
      longest = Math.max(longest, run);
    }
    // Current streak: only meaningful when the view reaches today.
    let current: number | null = null;
    if (to >= todayT) {
      current = 0;
      let t = todayT;
      if ((byDate.get(toIso(t))?.[0] ?? 0) === 0) t -= DAY; // today may still be empty
      while ((byDate.get(toIso(t))?.[0] ?? 0) > 0) {
        current++;
        t -= DAY;
      }
    }
    return { weeks, months, stats: { total, active, best, longest, current } };
  }, [view, byDate, today]);

  function showTip(el: HTMLElement) {
    const date = el.dataset.date;
    const wrap = wrapRef.current;
    if (!date || !wrap) return;
    const count = Number(el.dataset.count);
    const r = el.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    const text = `${count === 0 ? "No" : count} contribution${count === 1 ? "" : "s"} on ${longLabel(date)}`;
    const x = r.left - w.left + r.width / 2;
    // Keep the tooltip inside the card near its edges.
    const align = x > w.width - 130 ? "right" : x < 130 ? "left" : "center";
    setTip({ text, x, y: r.top - w.top, align });
  }

  const periodLabel = view === "last" ? "in the last 12 months" : `in ${view}`;

  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      {/* Period switch */}
      <div role="group" aria-label="Period" className="flex flex-wrap gap-1.5">
        {(["last", ...years.map((y) => y.year)] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setView(v);
              setTip(null);
            }}
            aria-pressed={view === v}
            className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
              view === v
                ? "bg-accent text-accent-ink"
                : "border border-line text-muted hover:border-accent/50 hover:text-ink"
            }`}
          >
            {v === "last" ? "Last 12 months" : v}
          </button>
        ))}
      </div>

      {/* Calendar: one grid, weekday labels in the first column, month labels in
          the first row. Columns stretch to the card; below ~620px it scrolls. */}
      <div ref={wrapRef} className="relative mt-5">
        <div ref={scrollRef} className="overflow-x-auto pb-1">
          <div
            key={String(view)}
            className="grid min-w-[620px] gap-[3px]"
            style={{ gridTemplateColumns: `2rem repeat(${weeks.length}, minmax(0, 1fr))` }}
            onPointerOver={(e) => showTip(e.target as HTMLElement)}
            onClick={(e) => showTip(e.target as HTMLElement)}
            onPointerLeave={() => setTip(null)}
          >
            <span aria-hidden="true" />
            {months.map((m, i) => (
              <span key={`m${i}`} aria-hidden="true" className="h-4 whitespace-nowrap font-mono text-[0.65rem] leading-4 text-muted">
                {m}
              </span>
            ))}
            {WEEKDAYS.map((wd, d) => [
              <span
                key={`d${d}`}
                aria-hidden="true"
                className="self-center font-mono text-[0.6rem] leading-none text-muted"
              >
                {d % 2 === 1 ? wd : ""}
              </span>,
              ...weeks.map((week, w) => {
                const c = week[d];
                if (!c) return <span key={`${w}-${d}`} className="aspect-square" />;
                return (
                  <span
                    key={c.date}
                    data-date={c.future ? undefined : c.date}
                    data-count={c.count}
                    style={{ animationDelay: `${w * 6}ms` }}
                    className={`cal-cell aspect-square rounded-[3px] ${
                      c.future ? "heat-0 opacity-40" : `heat-${c.level} cursor-pointer hover:ring-1 hover:ring-ink/60`
                    }`}
                  />
                );
              }),
            ])}
          </div>
        </div>
        <p className="sr-only" role="img" aria-label={`${stats.total} GitHub contributions ${periodLabel}`} />

        {tip && (
          <div
            role="status"
            className={`pointer-events-none absolute z-10 -translate-y-full whitespace-nowrap rounded-md bg-ink px-2.5 py-1.5 text-xs text-bg shadow-lg ${
              tip.align === "center" ? "-translate-x-1/2" : tip.align === "right" ? "-translate-x-full" : ""
            }`}
            style={{ left: tip.x, top: tip.y - 6 }}
          >
            {tip.text}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
        <p>
          <span className="font-medium text-ink tabular-nums">{stats.total.toLocaleString("en-US")}</span>{" "}
          contributions {periodLabel}
        </p>
        <div aria-hidden="true" className="flex items-center gap-1.5 font-mono text-[0.65rem]">
          Less
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`heat-${l} size-[11px] rounded-[3px]`} />
          ))}
          More
        </div>
      </div>

      {/* Stats */}
      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {[
          ["Active days", `${stats.active}`],
          ["Best day", stats.best ? `${stats.best.count} · ${shortLabel(stats.best.date)}` : "—"],
          ["Longest streak", `${stats.longest} day${stats.longest === 1 ? "" : "s"}`],
          [
            "Current streak",
            stats.current === null ? "—" : `${stats.current} day${stats.current === 1 ? "" : "s"}`,
          ],
        ].map(([label, value]) => (
          <div key={label} className="bg-surface px-4 py-3">
            <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{label}</dt>
            <dd className="mt-1 text-base font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="sr-only">Contribution data for github.com/{user}.</p>
    </div>
  );
}
