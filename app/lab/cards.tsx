import { CardLinks, Media, Stage, mono } from "./parts";
import type { LabProject } from "./data";

type P = { p: LabProject };

function Facts({ p, className = "" }: P & { className?: string }) {
  return (
    <ul className={`grid gap-x-8 gap-y-3 text-sm leading-snug text-muted sm:grid-cols-3 ${className}`}>
      {p.facts.map((f) => (
        <li key={f} className="border-t border-line pt-3">
          {f}
        </li>
      ))}
    </ul>
  );
}

/* C1 ─ cinema: the recording is the card, the title sits on it. */
function C1({ p }: P) {
  return (
    <article>
      <div className="relative aspect-[16/9] overflow-hidden bg-line md:aspect-[16/8]">
        <Media p={p} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.92),rgb(0_0_0/0.55)_32%,transparent_62%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 text-white sm:p-8">
          <div>
            <p className={`${mono} text-white/75`}>{p.kicker}</p>
            <h3 className="mt-2 text-[clamp(2rem,6cqw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">{p.title}</h3>
          </div>
          <p className="text-right">
            <span className="block text-3xl font-semibold tracking-[-0.03em] tabular-nums sm:text-4xl">{p.metric.value}</span>
            <span className={`${mono} text-white/75`}>{p.metric.label}</span>
          </p>
        </div>
      </div>
      <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_auto] md:items-end">
        <p className="max-w-[52ch] text-lg leading-snug text-ink/85">{p.line}</p>
        <CardLinks p={p} />
      </div>
    </article>
  );
}

/* C2 ─ browser window: text on the left, the product in its frame on the right. */
function C2({ p }: P) {
  return (
    <article className="grid items-center gap-8 bg-surface p-5 sm:p-8 lg:grid-cols-[1fr_1.35fr]">
      <div>
        <p className={`${mono} text-accent`}>{p.kicker}</p>
        <h3 className="mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{p.title}</h3>
        <p className="mt-4 max-w-[40ch] text-lg leading-snug text-muted">{p.line}</p>
        <p className="mt-7 flex items-baseline gap-3 border-t border-line pt-5">
          <span className="text-4xl font-semibold tracking-[-0.04em] tabular-nums">{p.metric.value}</span>
          <span className="text-sm text-muted">{p.metric.label}</span>
        </p>
        <div className="mt-6">
          <CardLinks p={p} />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-bg shadow-[0_30px_60px_-40px_rgba(29,21,23,0.55)]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          {[0, 1, 2].map((i) => (
            <span key={i} aria-hidden="true" className="size-2.5 rounded-full bg-line" />
          ))}
          <span className="ml-3 truncate font-mono text-[0.7rem] text-muted">{p.host}</span>
        </div>
        <div className="relative aspect-[16/10]">
          <Media p={p} />
        </div>
      </div>
    </article>
  );
}

/* C3 ─ drawing sheet: crop marks around the media, a title block beside it. */
function C3({ p }: P) {
  const corner = "absolute size-4 border-accent";
  return (
    <article className="lab-grid grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <div className="relative p-3">
          <span aria-hidden="true" className={`${corner} left-0 top-0 border-l border-t`} />
          <span aria-hidden="true" className={`${corner} right-0 top-0 border-r border-t`} />
          <span aria-hidden="true" className={`${corner} bottom-0 left-0 border-b border-l`} />
          <span aria-hidden="true" className={`${corner} bottom-0 right-0 border-b border-r`} />
          <div className="relative aspect-[16/10] overflow-hidden border border-accent/50 bg-line">
            <Media p={p} />
          </div>
        </div>
        <div aria-hidden="true" className="mt-2 flex items-center gap-2 px-3 text-accent">
          <span className="h-3 w-px bg-accent" />
          <span className="h-px flex-1 bg-accent" />
          <span className={mono}>{p.host}</span>
          <span className="h-px flex-1 bg-accent" />
          <span className="h-3 w-px bg-accent" />
        </div>
      </div>
      <div className="flex flex-col">
        <p className={`${mono} text-accent`}>Project sheet</p>
        <h3 className="mt-3 text-4xl font-semibold tracking-[-0.035em]">{p.title}</h3>
        <p className="mt-3 leading-snug text-ink/80">{p.line}</p>
        <dl className="mt-6 grid grid-cols-[auto_1fr] border border-accent/60 bg-bg/85 font-mono text-xs">
          {p.rows.map(([k, v]) => (
            <div key={k} className="col-span-2 grid grid-cols-subgrid border-b border-accent/40 last:border-b-0">
              <dt className="border-r border-accent/40 px-3 py-2 uppercase tracking-[0.12em] text-accent">{k}</dt>
              <dd className="px-3 py-2 text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-6">
          <CardLinks p={p} />
        </div>
      </div>
    </article>
  );
}

/* C4 ─ number first: the proof is the biggest thing, the media supports it. */
function C4({ p }: P) {
  return (
    <article className="grid gap-8 bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
      <div>
        <p className={`${mono} text-accent`}>{p.title}</p>
        <div className="mt-4 whitespace-nowrap text-[clamp(3.5rem,11cqw,8rem)] font-semibold leading-[0.85] tracking-[-0.06em] tabular-nums">
          {p.metric.value}
        </div>
        <p className="mt-3 text-lg text-muted">{p.metric.label}</p>
        <p className="mt-7 max-w-[42ch] border-t border-line pt-5 text-lg leading-snug text-ink/85">{p.line}</p>
        <div className="mt-6">
          <CardLinks p={p} />
        </div>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-line">
        <Media p={p} />
      </div>
    </article>
  );
}

/* C5 ─ editorial: no box at all, an outlined index number and an offset block. */
function C5({ p, index }: P & { index: number }) {
  return (
    <article className="grid gap-x-10 gap-y-8 px-2 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
      <div>
        <p aria-hidden="true" className="lab-outline text-[clamp(4rem,10cqw,7.5rem)] font-semibold leading-none tracking-[-0.05em]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-[clamp(2.25rem,5.4cqw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">{p.title}</h3>
        <p className="mt-4 max-w-[38ch] text-lg leading-snug text-muted">{p.line}</p>
        <p className="mt-5 text-sm leading-relaxed text-ink/75">{p.facts.join(" / ")}</p>
        <div className="mt-6">
          <CardLinks p={p} />
        </div>
      </div>
      <div className="relative mb-4 mr-4">
        <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 bg-accent" />
        <div className="relative aspect-[16/10] overflow-hidden bg-line">
          <Media p={p} />
        </div>
        <p className="absolute -left-3 top-5 bg-ink px-3 py-2 text-bg">
          <span className="block text-2xl font-semibold tracking-[-0.03em] tabular-nums">{p.metric.value}</span>
          <span className={`${mono} opacity-75`}>{p.metric.label}</span>
        </p>
      </div>
    </article>
  );
}

/* C6 ─ cover: type on the oxblood gradient, the screen tilted in space. */
function C6({ p }: P) {
  return (
    <article className="lab-cover grid items-center gap-8 overflow-hidden p-6 sm:p-10 lg:grid-cols-[1fr_1.25fr]">
      <div>
        <p className={`${mono} text-white/70`}>{p.kicker}</p>
        <h3 className="mt-4 text-[clamp(2.5rem,6.5cqw,5rem)] font-semibold leading-[0.92] tracking-[-0.045em]">{p.title}</h3>
        <p className="mt-5 max-w-[36ch] text-lg leading-snug text-white/75">{p.line}</p>
        <p className="mt-8 flex items-baseline gap-3">
          <span className="text-4xl font-semibold tracking-[-0.04em] tabular-nums">{p.metric.value}</span>
          <span className={`${mono} text-white/70`}>{p.metric.label}</span>
        </p>
        <div className="mt-7">
          <CardLinks p={p} tone="light" />
        </div>
      </div>
      <div className="lg:-mr-24 lg:[transform:perspective(1600px)_rotateY(-16deg)_rotateX(5deg)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black/30 shadow-[0_50px_90px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/20">
          <Media p={p} />
        </div>
      </div>
    </article>
  );
}

/* C7 ─ ledger: label and value rows a recruiter can scan in ten seconds. */
function C7({ p }: P) {
  return (
    <article className="grid gap-8 bg-surface p-6 sm:p-10 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <h3 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{p.title}</h3>
        <p className="mt-3 max-w-[40ch] leading-snug text-muted">{p.line}</p>
        <dl className="mt-7 border-t-2 border-ink">
          {p.rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3 border-b border-line py-2.5">
              <dt className={`${mono} text-muted`}>{k}</dt>
              <span aria-hidden="true" className="lab-leader" />
              <dd className="max-w-[70%] text-right text-sm font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <CardLinks p={p} />
        </div>
      </div>
      <div className="relative aspect-[16/10] self-center overflow-hidden rounded-lg border border-line bg-line">
        <Media p={p} />
      </div>
    </article>
  );
}

/* C8 ─ dark poster: always dark, the title runs across the dimmed recording. */
function C8({ p }: P) {
  return (
    <article className="group bg-[#120e0f] text-[#f2eaeb]">
      <div className="relative aspect-[16/9] overflow-hidden md:aspect-[16/7.5]">
        <div className="absolute inset-0 opacity-25 transition-opacity duration-500 group-hover:opacity-100">
          <Media p={p} />
        </div>
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center p-6 transition-opacity duration-500 group-hover:opacity-0 sm:p-10">
          <p className={`${mono} text-[#df5059]`}>{p.kicker}</p>
          <h3 className="mt-3 text-[clamp(2.75rem,10cqw,8rem)] font-semibold uppercase leading-[0.85] tracking-[-0.05em]">{p.title}</h3>
        </div>
      </div>
      <div className="grid gap-6 border-t border-white/10 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8">
        <p>
          <span className="block text-3xl font-semibold tracking-[-0.03em] tabular-nums">{p.metric.value}</span>
          <span className={`${mono} text-white/60`}>{p.metric.label}</span>
        </p>
        <p className="max-w-[48ch] leading-snug text-white/75">{p.line}</p>
        <CardLinks p={p} tone="light" />
      </div>
    </article>
  );
}

/* C9 ─ side rail: the title stands upright on an accent rail beside the media. */
function C9({ p }: P) {
  return (
    <article className="grid bg-surface md:grid-cols-[auto_1.5fr_1fr]">
      <div className="flex items-center justify-between bg-accent px-4 py-3 text-accent-ink md:[writing-mode:vertical-rl] md:rotate-180 md:px-3 md:py-6">
        <h3 className="whitespace-nowrap text-2xl font-semibold uppercase tracking-[-0.01em]">{p.title}</h3>
        <span className={`${mono} md:hidden`}>{p.host}</span>
      </div>
      {/* A fixed minimum height, not a ratio: the text column sets the card height. */}
      <div className="relative aspect-[16/10] bg-line md:aspect-auto md:min-h-[26rem]">
        <Media p={p} />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <p className={`${mono} text-accent`}>{p.kicker}</p>
        <p className="text-lg leading-snug text-ink/85">{p.line}</p>
        <p className="border-y border-line py-4">
          <span className="block text-4xl font-semibold tracking-[-0.04em] tabular-nums">{p.metric.value}</span>
          <span className="text-sm text-muted">{p.metric.label}</span>
        </p>
        <ul className="space-y-1.5 text-sm leading-snug text-muted">
          {p.facts.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <div className="mt-auto pt-2">
          <CardLinks p={p} />
        </div>
      </div>
    </article>
  );
}

/* C10 ─ block: square corners, pixel steps, a hard shadow. The builder look. */
function C10({ p }: P) {
  return (
    <article className="grid gap-10 p-6 pb-10 sm:p-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
      <div className="relative">
        <div aria-hidden="true" className="lab-pixel absolute inset-0 translate-x-3 translate-y-3 bg-accent" />
        <div className="lab-pixel relative bg-ink p-[5px]">
          <div className="lab-pixel relative aspect-[16/10] overflow-hidden bg-line">
            <Media p={p} />
          </div>
        </div>
        <h3 className="absolute -top-4 left-6 bg-ink px-4 py-2 text-2xl font-semibold uppercase tracking-[0.02em] text-bg sm:text-3xl">
          {p.title}
        </h3>
      </div>
      <div>
        <p className={`${mono} text-accent`}>{p.kicker}</p>
        <p className="mt-3 text-lg leading-snug text-ink/85">{p.line}</p>
        <div className="mt-6 inline-block border-2 border-ink px-4 py-3">
          <span className="block text-4xl font-semibold tracking-[-0.04em] tabular-nums">{p.metric.value}</span>
          <span className={`${mono} text-muted`}>{p.metric.label}</span>
        </div>
        <ul className="mt-5 space-y-2 text-sm text-muted">
          {p.facts.map((f) => (
            <li key={f} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.45em] size-2 shrink-0 bg-accent" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <CardLinks p={p} />
        </div>
      </div>
    </article>
  );
}

export function Cards({ p, index }: P & { index: number }) {
  return (
    <>
      <Stage id="c1" code="C1" name="Cinema" note="Видео и есть карточка, заголовок и цифра лежат прямо на нём.">
        <C1 p={p} />
        <div className="px-5 pb-6 sm:px-8">
          <Facts p={p} />
        </div>
      </Stage>
      <Stage id="c2" code="C2" name="Browser window" note="Текст слева, продукт в рамке браузера справа.">
        <C2 p={p} />
      </Stage>
      <Stage id="c3" code="C3" name="Drawing sheet" note="Лист чертежа: метки обреза вокруг видео, штамп с фактами.">
        <C3 p={p} />
      </Stage>
      <Stage id="c4" code="C4" name="Number first" note="Цифра — самое крупное, видео её подтверждает.">
        <C4 p={p} />
      </Stage>
      <Stage id="c5" code="C5" name="Editorial" note="Без рамки: контурный номер, видео со сдвинутой бордовой плашкой.">
        <C5 p={p} index={index} />
      </Stage>
      <Stage id="c6" code="C6" name="Cover" note="Бордовый градиент, экран повёрнут в пространстве.">
        <C6 p={p} />
      </Stage>
      <Stage id="c7" code="C7" name="Ledger" note="Строки «подпись — значение»: рекрутер считывает за десять секунд.">
        <C7 p={p} />
      </Stage>
      <Stage id="c8" code="C8" name="Dark poster" note="Всегда тёмная; название поверх приглушённого видео, при наведении видео открывается.">
        <C8 p={p} />
      </Stage>
      <Stage id="c9" code="C9" name="Side rail" note="Название стоит вертикально на бордовой полосе рядом с видео.">
        <C9 p={p} />
      </Stage>
      <Stage id="c10" code="C10" name="Block" note="Прямые углы, пиксельные ступеньки, жёсткая тень — характер «builder».">
        <C10 p={p} />
      </Stage>
    </>
  );
}
