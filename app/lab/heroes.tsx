import Image from "next/image";
import { Instrument_Serif } from "next/font/google";
import { PreviewVideo } from "@/components/PreviewVideo";
import { Actions, IsoBlocks, Stage, build, mono } from "./parts";
import { lead, ledger, me, numbers, projects, rest } from "./data";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });

const [first, ...lastParts] = me.name.split(" ");
const last = lastParts.join(" ");

/** The first sentence; "full-stack" never breaks at the hyphen. */
function Lead() {
  const [a, b] = lead.split("full-stack");
  return (
    <>
      {a}
      <span className="whitespace-nowrap">full-stack</span>
      {b}
    </>
  );
}

/** The second sentence of the line, with the three key phrases marked. */
function Rest({ mark = "text-ink font-medium" }: { mark?: string }) {
  const parts = rest.split(/(TypeScript and PostgreSQL|Java and Spring Boot|software that moves money)/);
  return (
    <>
      {parts.map((part, i) => (i % 2 ? <span key={i} className={mark}>{part}</span> : part))}
    </>
  );
}

function Portrait({ className = "", sizes = "320px" }: { className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden bg-line ${className}`}>
      <Image src={me.avatar} alt={`Portrait of ${me.name}`} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/* H1 ─ the line is the headline; the name is a small label. */
function H1() {
  return (
    <div className="px-6 py-14 sm:px-12 sm:py-20">
      <p className={`${mono} flex items-center gap-2 text-muted`}>
        <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
        {me.name} · {me.location}
      </p>
      <h1 className="mt-7 max-w-[15ch] text-[clamp(2.5rem,7cqw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.04em]"><Lead /></h1>
      <p className="mt-7 max-w-[34ch] text-[clamp(1.15rem,2.3cqw,1.6rem)] leading-snug text-muted">
        <Rest />
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <Actions />
        <Portrait className="size-16 rounded-full ring-2 ring-line ring-offset-2 ring-offset-bg" sizes="64px" />
      </div>
    </div>
  );
}

/* H2 ─ a drawing sheet: grid, wireframe blocks, title block in the corner. */
function H2() {
  const cells: [string, string][] = [
    ["Drawn by", me.name],
    ["Role", "Junior full-stack developer"],
    ["Site", `${me.location} · 59.44°N 24.75°E`],
    ["In production", "TypeScript · PostgreSQL"],
    ["Learning", "Java · Spring Boot"],
  ];
  return (
    <div className="lab-grid relative px-6 py-12 sm:px-12 sm:py-16">
      <IsoBlocks heights={build} wire className="pointer-events-none absolute right-6 top-8 hidden w-[34%] opacity-70 md:block" />
      <p className={`${mono} text-accent`}>Sheet 01 · Portfolio</p>
      <div className="relative mt-6 inline-block">
        {/* Dimension line above the name. */}
        <div aria-hidden="true" className="mb-3 flex items-center gap-2 text-accent">
          <span className="h-3 w-px bg-accent" />
          <span className="h-px flex-1 bg-accent" />
          <span className={mono}>Full-stack</span>
          <span className="h-px flex-1 bg-accent" />
          <span className="h-3 w-px bg-accent" />
        </div>
        <h1 className="text-[clamp(2.75rem,9cqw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
          <span className="block">{first}</span> <span className="block">{last}</span>
        </h1>
      </div>
      <p className="mt-7 max-w-[44ch] text-lg leading-relaxed text-ink/80 sm:text-xl">
        {lead} <Rest />
      </p>
      <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
        <Actions />
        <dl className="grid w-full max-w-md grid-cols-[auto_1fr] border border-accent/60 bg-bg/80 font-mono text-xs backdrop-blur-sm">
          {cells.map(([k, v]) => (
            <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-accent/40 last:border-b-0">
              <dt className="border-r border-accent/40 px-3 py-1.5 uppercase tracking-[0.12em] text-accent">{k}</dt>
              <dd className="px-3 py-1.5 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* H3 ─ a cover: big type on an oxblood gradient and one object in the frame. */
function H3() {
  return (
    <div className="lab-cover relative overflow-hidden px-6 py-14 sm:px-12 sm:py-20">
      <IsoBlocks
        heights={build}
        drop
        size={56}
        className="pointer-events-none absolute -bottom-10 -right-6 w-[46%] max-w-xl opacity-95 [--accent:#c8414f] max-md:hidden"
      />
      <p className={`${mono} text-white/70`}>
        {me.name} · {me.location}
      </p>
      <h1 className="relative mt-8 max-w-[13ch] text-[clamp(2.6rem,8cqw,6rem)] font-semibold leading-[0.94] tracking-[-0.04em]"><Lead /></h1>
      <p className="relative mt-7 max-w-[32ch] text-xl leading-snug text-white/75 sm:text-2xl">
        <Rest mark="text-white font-medium" />
      </p>
      <Actions tone="light" className="relative mt-10" />
    </div>
  );
}

/* H4 ─ portrait and name side by side, the three numbers right under them. */
function H4() {
  return (
    <div>
      <div className="grid items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 md:grid-cols-[auto_1fr]">
        <div className="relative w-56 max-md:w-40 lg:w-72">
          <div aria-hidden="true" className="lab-grid absolute -inset-4 rounded-[2rem] border border-accent/30" />
          <Portrait className="aspect-[4/5] rounded-[1.5rem] border border-line" sizes="288px" />
          <p className={`${mono} absolute bottom-3 left-3 rounded-full bg-bg/85 px-3 py-1.5 text-muted backdrop-blur-sm`}>
            {me.location}
          </p>
        </div>
        <div>
          <h1 className="text-[clamp(2.5rem,7.5cqw,5.25rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            <span className="block">{first}</span> <span className="block">{last}</span>
          </h1>
          <p className="mt-5 text-xl font-medium text-accent">{lead}</p>
          <p className="mt-2 max-w-[42ch] text-lg leading-relaxed text-muted">
            <Rest />
          </p>
          <Actions className="mt-8" />
        </div>
      </div>
      <ul className="grid border-t border-line sm:grid-cols-3">
        {numbers.map((n) => (
          <li key={n.value} className="border-line px-6 py-6 max-sm:border-b sm:border-r sm:px-8 sm:last:border-r-0">
            <p className="text-3xl font-semibold tracking-[-0.03em] tabular-nums lg:text-4xl">{n.value}</p>
            <p className="mt-1.5 text-sm text-muted">
              {n.label} · {n.where}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* H5 ─ the story as an account statement: date, entry, amount. */
function H5() {
  return (
    <div className="px-6 py-12 sm:px-12 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
        <div>
          <p className={`${mono} text-accent`}>Statement · {me.location}</p>
          <h1 className="mt-3 text-[clamp(2.25rem,6cqw,4.25rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{me.name}</h1>
        </div>
        <p className="max-w-[36ch] text-lg leading-snug text-muted">
          {lead} <Rest />
        </p>
      </div>
      <ol className="font-mono text-sm">
        <li className={`${mono} flex gap-4 border-b border-line py-2.5 text-muted`}>
          <span className="w-20 shrink-0">Date</span>
          <span className="flex-1">Entry</span>
          <span>Balance</span>
        </li>
        {ledger.map((row) => (
          <li key={row.date} className="flex items-baseline gap-4 border-b border-line py-3">
            <span className="w-20 shrink-0 text-muted tabular-nums">{row.date}</span>
            <span className="font-sans text-base text-ink sm:text-lg">{row.text}</span>
            <span aria-hidden="true" className="lab-leader max-sm:hidden" />
            <span className="ml-auto whitespace-nowrap font-medium text-accent tabular-nums">{row.amount}</span>
          </li>
        ))}
      </ol>
      <Actions tone="ink" className="mt-9" />
    </div>
  );
}

/* H6 ─ a poster: the name runs edge to edge, everything else sits in one row. */
function H6() {
  return (
    <div className="px-6 pb-12 pt-8 sm:px-10">
      <div className={`${mono} flex justify-between text-muted`}>
        <span>{me.location}</span>
        <span>Junior full-stack developer</span>
      </div>
      <h1 className="mt-4 text-[15.2cqw] font-semibold uppercase leading-[0.82] tracking-[-0.055em]">
        <span className="block">{first}</span> <span className="block text-accent">{last}</span>
      </h1>
      <div className="mt-9 grid gap-8 border-t border-line pt-7 md:grid-cols-[1.3fr_1fr]">
        <p className="max-w-[40ch] text-xl leading-snug text-ink/85">
          {lead} <Rest mark="text-accent" />
        </p>
        <Actions className="md:justify-end md:self-end" />
      </div>
    </div>
  );
}

/* H7 ─ show the work at once: the line on the left, a live recording on the right. */
function H7() {
  const p = projects[0];
  return (
    <div className="grid items-center gap-10 px-6 py-12 sm:px-12 sm:py-16 lg:grid-cols-[1fr_1.15fr]">
      <div>
        <p className={`${mono} text-muted`}>
          {me.name} · {me.location}
        </p>
        <h1 className="mt-6 text-[clamp(2.25rem,5cqw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.035em]"><Lead /></h1>
        <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-muted">
          <Rest />
        </p>
        <Actions className="mt-8" />
      </div>
      <figure className="lg:[transform:perspective(1400px)_rotateY(-7deg)_rotateX(2deg)]">
        <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_40px_80px_-40px_rgba(29,21,23,0.6)]">
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden="true" className="size-2.5 rounded-full bg-line" />
            ))}
            <span className="ml-3 font-mono text-[0.7rem] text-muted">{p.host}</span>
          </div>
          <div className="relative aspect-[16/10]">
            {p.media.kind === "video" && <PreviewVideo src={p.media.src} poster={p.media.poster} alt={p.media.alt} />}
          </div>
        </div>
        <figcaption className={`${mono} mt-4 text-muted`}>SouCampus · built alone · PageSpeed 100 / 99</figcaption>
      </figure>
    </div>
  );
}

/* H8 ─ editorial: a serif, centred, a lot of air, nothing else. */
function H8() {
  return (
    <div className="px-6 py-16 text-center sm:px-12 sm:py-24">
      <p className={`${mono} text-muted`}>
        {me.name} — {me.location}
      </p>
      <h1 className={`${serif.className} mx-auto mt-8 max-w-[20ch] text-[clamp(2.6rem,7.4cqw,5.75rem)] leading-[1] tracking-[-0.02em]`}>
        Junior full-stack developer in <em className="text-accent">Tallinn.</em>
      </h1>
      <p className={`${serif.className} mx-auto mt-7 max-w-[40ch] text-2xl leading-snug text-muted sm:text-[1.75rem]`}>
        <Rest mark="italic text-ink" />
      </p>
      <Actions tone="ink" className="mt-10 justify-center" />
    </div>
  );
}

/* H9 ─ proof first: the three numbers are the biggest thing on the screen. */
function H9() {
  return (
    <div className="px-6 py-12 sm:px-12 sm:py-16">
      <div className="flex flex-wrap items-center gap-4">
        <Portrait className="size-14 rounded-full" sizes="56px" />
        <div>
          <h1 className="text-xl font-semibold tracking-[-0.02em]">{me.name}</h1>
          <p className="text-muted">{lead}</p>
        </div>
      </div>
      <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {numbers.map((n) => (
          <li key={n.value} className="bg-surface p-6 lg:p-8">
            <p className={`${mono} text-accent`}>{n.where}</p>
            <div className="mt-8 whitespace-nowrap text-[clamp(2.2rem,4.6cqw,3.4rem)] font-semibold leading-none tracking-[-0.045em] tabular-nums">
              {n.value}
            </div>
            <p className="mt-3 text-muted">{n.label}</p>
          </li>
        ))}
      </ul>
      <div className="mt-9 flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-[40ch] text-xl leading-snug text-ink/85">
          <Rest mark="text-accent" />
        </p>
        <Actions />
      </div>
    </div>
  );
}

/* H10 ─ another palette: bank green and cream, one object: a card. */
function H10() {
  return (
    <div className="lab-grid-light relative grid items-center gap-10 bg-[#0f2a22] px-6 py-14 text-[#f3efe4] sm:px-12 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <p className={`${mono} text-[#d9c27a]`}>
          {me.name} · {me.location}
        </p>
        <h1 className="mt-7 max-w-[14ch] text-[clamp(2.5rem,6.4cqw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.04em]"><Lead /></h1>
        <p className="mt-6 max-w-[34ch] text-xl leading-snug text-[#f3efe4]/70">
          <Rest mark="text-[#d9c27a]" />
        </p>
        <div className="mt-9 flex flex-wrap gap-3 text-sm font-medium">
          <a href={me.cv} download className="rounded-full bg-[#d9c27a] px-5 py-2.5 text-[#0f2a22]">
            Download CV
          </a>
          <a href={me.linkedin} className="rounded-full border border-[#f3efe4]/35 px-5 py-2.5">
            LinkedIn
          </a>
          <a href={`mailto:${me.email}`} className="rounded-full border border-[#f3efe4]/35 px-5 py-2.5">
            Email
          </a>
        </div>
      </div>
      {/* The object: a bank card with the name on it. */}
      <div
        aria-hidden="true"
        className="mx-auto aspect-[1.586] w-full max-w-md rounded-[1.4rem] bg-[linear-gradient(135deg,#1c4a3c,#0b1f19)] p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-[#f3efe4]/15 lg:rotate-[-6deg]"
      >
        <div className="flex h-full flex-col justify-between font-mono">
          <div className="flex items-start justify-between">
            <span className="h-9 w-12 rounded-md bg-[linear-gradient(135deg,#e7d596,#a98f45)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#f3efe4]/60">Tallinn · EE</span>
          </div>
          <p className="text-lg tracking-[0.18em] text-[#f3efe4]/85 sm:text-xl">TS · SQL · JAVA · 2026</p>
          <div className="flex items-end justify-between text-xs uppercase tracking-[0.16em]">
            <span>{me.name}</span>
            <span className="text-[#d9c27a]">Junior dev</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Heroes() {
  return (
    <>
      <Stage id="h1" code="H1" name="Statement" note="Главная строка — заголовок, имя маленькой подписью.">
        <H1 />
      </Stage>
      <Stage id="h2" code="H2" name="Blueprint" note="Лист чертежа: сетка, размерная линия, каркас из блоков, штамп в углу.">
        <H2 />
      </Stage>
      <Stage id="h3" code="H3" name="Cover" note="Обложка: крупный текст на бордовом градиенте и один предмет — постройка из блоков.">
        <H3 />
      </Stage>
      <Stage id="h4" code="H4" name="Portrait + numbers" note="Портрет и имя рядом, три цифры сразу под ними.">
        <H4 />
      </Stage>
      <Stage id="h5" code="H5" name="Statement of account" note="История как банковская выписка: дата, запись, итог.">
        <H5 />
      </Stage>
      <Stage id="h6" code="H6" name="Poster" note="Афиша: имя во всю ширину, остальное одной строкой.">
        <H6 />
      </Stage>
      <Stage id="h7" code="H7" name="Live work" note="Сразу показать работу: строка слева, видео SouCampus справа.">
        <H7 />
      </Stage>
      <Stage id="h8" code="H8" name="Editorial" note="Журнальный: шрифт с засечками, по центру, много воздуха.">
        <H8 />
      </Stage>
      <Stage id="h9" code="H9" name="Proof first" note="Сначала доказательства: три цифры — самое крупное на экране.">
        <H9 />
      </Stage>
      <Stage id="h10" code="H10" name="Bank green" note="Другая палитра: зелёный и кремовый, один предмет — банковская карта.">
        <H10 />
      </Stage>
    </>
  );
}
