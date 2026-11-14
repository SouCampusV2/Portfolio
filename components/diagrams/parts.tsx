import type { Icon } from "@phosphor-icons/react";
import { ArrowBendDownRight, ArrowDown, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TechIcon } from "@/components/TechIcon";

/**
 * Building blocks shared by every case-study diagram, so they all read the same:
 * a drawing-paper frame, node tiles like an editor canvas, chains joined by
 * arrows (left to right from `md`, top to bottom below), labelled lanes.
 */

export const mono = "font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em]";

/** Drawing-paper frame. The label describes the whole picture for screen readers. */
export function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div role="img" aria-label={label} className="paper-grid overflow-hidden rounded-xl border border-line p-4 sm:p-6">
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

/**
 * One step. `tech` = a logo from TechIcon, `icon` = a Phosphor glyph.
 * `trigger` marks what starts a chain; `tag` is a small caption under the label
 * (a status, who does it).
 */
export type Node = { label: string; tech?: string; icon?: Icon; trigger?: boolean; tag?: string };

export function NodeBox({ node }: { node: Node }) {
  const Glyph = node.icon;
  return (
    <span
      className={`flex items-center gap-2 rounded-lg border bg-surface px-2 py-1.5 text-[0.72rem] font-medium leading-tight shadow-sm md:min-h-[4.5rem] md:w-[8.25rem] md:flex-col md:items-start md:gap-1.5 md:p-2 ${
        node.trigger ? "border-accent/70 ring-1 ring-accent/30" : "border-line"
      }`}
    >
      <span className="grid size-6 shrink-0 place-items-center rounded-md border border-line bg-bg">
        {node.tech ? (
          <TechIcon name={node.tech} className="size-3.5" />
        ) : Glyph ? (
          <Glyph weight="bold" className={`size-3.5 ${node.trigger ? "text-accent" : "text-ink/70"}`} />
        ) : null}
      </span>
      <span className="flex flex-col gap-0.5">
        {node.label}
        {node.tag && <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.1em] text-accent">{node.tag}</span>}
      </span>
    </span>
  );
}

/**
 * A chain of nodes: one unbroken row from `md` up, a column with arrows down below.
 * `parallel`: the nodes do not follow each other (e.g. listeners of one event), so no arrows.
 */
export function Chain({ nodes, parallel }: { nodes: Node[]; parallel?: boolean }) {
  if (parallel) {
    return (
      <ul className="flex flex-col items-start gap-2 md:flex-row md:items-stretch">
        {nodes.map((node) => (
          <li key={node.label}>
            <NodeBox node={node} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol className="flex flex-col items-start md:flex-row md:items-stretch">
      {nodes.map((node, i) => (
        <li key={node.label} className="flex flex-col items-start md:flex-row md:items-center">
          {i > 0 && (
            <span className="flex py-0.5 pl-3 text-accent md:px-1 md:py-0 md:pl-1">
              <ArrowDown weight="bold" className="size-3.5 md:hidden" />
              <ArrowRight weight="bold" className="hidden size-3.5 md:block" />
            </span>
          )}
          <NodeBox node={node} />
        </li>
      ))}
    </ol>
  );
}

/** A titled block inside a frame. Wide content scrolls inside it, never the page. */
export function Module({ index, title, note, children }: { index: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-bg/85 p-3 sm:p-4">
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className={`${mono} text-accent`}>
          <span className="text-muted">{index}</span> {title}
        </p>
        <p className="text-xs text-muted">{note}</p>
      </header>
      <div className="-mx-1 overflow-x-auto px-1 pb-1">{children}</div>
    </section>
  );
}

/** A labelled branch or row: a small caption, then its chain. */
export function Lane({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-2">
      <span className={`${mono} inline-flex shrink-0 items-center gap-1.5 text-ink/70 md:w-[7.5rem]`}>
        <ArrowBendDownRight weight="bold" className="size-3.5 text-accent" />
        {label}
      </span>
      {children}
    </div>
  );
}

/** Legend line under a frame: what the accent border means. */
export function TriggerNote({ children }: { children: React.ReactNode }) {
  return <p className={`${mono} mt-4 flex items-center gap-2 text-muted`}>{children}</p>;
}
