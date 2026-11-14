import type { Icon } from "@phosphor-icons/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowsClockwise,
  ArrowsDownUp,
  ArrowsSplit,
  Bell,
  Clock,
  Copy,
  Globe,
  Hourglass,
  Lightning,
  Signature,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import { TechIcon } from "@/components/TechIcon";

/**
 * Diagrams for the onboarding-automation case study, redrawn from the thesis
 * (pages 20–21, 26–27, 30) in the site's own style. HTML, not images: the text
 * is real text, colours come from the theme tokens, and on a phone every
 * diagram turns vertical instead of scrolling sideways.
 *
 * The offboarding chart (thesis p. 22) is deliberately not drawn: it shows a
 * security gap at the company.
 */

const mono = "font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em]";

/** Drawing-paper frame shared by the three diagrams. */
function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div role="img" aria-label={label} className="paper-grid overflow-hidden rounded-xl border border-line p-4 sm:p-6">
      {/* Everything inside is described by aria-label; the parts are visual. */}
      <div aria-hidden="true">{children}</div>
    </div>
  );
}

/** Arrow between two blocks: down on phones, right from `md` up. */
function Flow({ className = "" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center text-accent ${className}`}>
      <ArrowDown weight="bold" className="size-4 md:hidden" />
      <ArrowRight weight="bold" className="hidden size-4 md:block" />
    </span>
  );
}

/* ─────────────────────────── 1. Before: the manual process ─────────────────────────── */

type Step = { text: string; who?: "hr" | "other"; gate?: boolean; pain?: boolean };

const PHASES: { name: string; steps: Step[] }[] = [
  {
    name: "Application",
    steps: [
      { text: "HR checks the inbox", who: "hr" },
      { text: "HR sends a Google Form", who: "hr" },
      { text: "Candidate fills the form", who: "other" },
      { text: "Row lands in Google Sheets", who: "other" },
    ],
  },
  {
    name: "Screening",
    steps: [
      { text: "HR watches the table for new rows", who: "hr", pain: true },
      { text: "HR reviews CV and form", who: "hr" },
      { text: "Selected?", gate: true },
    ],
  },
  {
    name: "HR interview",
    steps: [
      { text: "HR sets the status by hand", who: "hr" },
      { text: "HR writes the invite", who: "hr" },
      { text: "HR books the meeting", who: "hr" },
      { text: "HR interviews", who: "hr" },
      { text: "Passed?", gate: true },
    ],
  },
  {
    name: "Tech interview",
    steps: [
      { text: "HR contacts the supervisor", who: "hr" },
      { text: "HR books the tech interview", who: "hr" },
      { text: "Supervisor interviews", who: "other" },
      { text: "Passed?", gate: true },
    ],
  },
  {
    name: "Test task",
    steps: [
      { text: "HR sends the task", who: "hr" },
      { text: "HR tracks the 4-day deadline", who: "hr", pain: true },
      { text: "HR sends reminders", who: "hr" },
      { text: "Supervisor reviews", who: "other" },
      { text: "Passed?", gate: true },
    ],
  },
  {
    name: "Contract",
    steps: [
      { text: "HR prepares folders and contract", who: "hr" },
      { text: "Candidate fills it in", who: "other" },
      { text: "Owner signs by hand — days of waiting", who: "other", pain: true },
      { text: "HR sends it back and reminds", who: "hr" },
    ],
  },
  {
    name: "Onboarding",
    steps: [
      { text: "HR creates accounts", who: "hr" },
      { text: "HR gives access to tools", who: "hr", pain: true },
      { text: "HR assigns tasks in Jira", who: "hr" },
      { text: "HR books the first meetings", who: "hr" },
    ],
  },
];

function StepBox({ step }: { step: Step }) {
  if (step.gate) {
    return (
      <li className="flex items-center justify-between gap-2 rounded-md border border-dashed border-ink/40 px-2.5 py-1.5 text-xs font-medium">
        {step.text}
        <span className="inline-flex items-center gap-1 text-muted">
          <XCircle weight="bold" className="size-3.5" />
          no
        </span>
      </li>
    );
  }
  const tone =
    step.who === "hr"
      ? "border-accent/40 bg-accent-soft/70 text-ink"
      : "border-line bg-surface text-ink/80";
  return (
    <li className={`relative rounded-md border px-2.5 py-1.5 text-xs leading-snug ${tone}`}>
      {step.text}
      {step.pain && <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-accent ring-2 ring-surface" />}
    </li>
  );
}

export function OnboardingAsIs() {
  const hrSteps = PHASES.flatMap((p) => p.steps).filter((s) => s.who === "hr").length;
  return (
    <Frame label={`The manual hiring process before automation: seven phases from application to onboarding, ${hrSteps} steps done by HR by hand. Any failed check ends in a rejection that HR also writes by hand.`}>
      <ol className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7">
        {PHASES.map((phase, i) => (
          <li key={phase.name} className="flex flex-col rounded-lg border border-line bg-bg/80 p-2.5 backdrop-blur-[2px]">
            <p className={`${mono} mb-2 flex items-baseline gap-2 text-accent`}>
              <span className="text-muted">{String(i + 1).padStart(2, "0")}</span>
              {phase.name}
            </p>
            <ul className="flex flex-col gap-1.5">
              {phase.steps.map((step) => (
                <StepBox key={step.text} step={step} />
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <div className={`${mono} mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted`}>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm border border-accent/40 bg-accent-soft/70" />
          HR, by hand · {hrSteps} steps
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm border border-line bg-surface" />
          Candidate, supervisor, owner
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm border border-dashed border-ink/40" />
          Check · no → rejection email, by hand
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-accent" />
          Where things got stuck
        </span>
      </div>
    </Frame>
  );
}

/* ─────────────────────────── 2. After: the n8n workflow ─────────────────────────── */

type Node = { label: string; tech?: string; icon?: Icon; trigger?: boolean };

/** One n8n node: icon tile + label, like the editor's canvas. */
function NodeBox({ node }: { node: Node }) {
  const Glyph = node.icon;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg border bg-surface px-2.5 py-2 text-xs font-medium shadow-sm ${
        node.trigger ? "border-accent/60" : "border-line"
      }`}
    >
      <span className="grid size-6 shrink-0 place-items-center rounded-md border border-line bg-bg">
        {node.tech ? (
          <TechIcon name={node.tech} className="size-3.5" />
        ) : Glyph ? (
          <Glyph weight="bold" className={`size-3.5 ${node.trigger ? "text-accent" : "text-ink/70"}`} />
        ) : null}
      </span>
      <span className="leading-tight">{node.label}</span>
    </span>
  );
}

/** A left-to-right chain of nodes; wraps on small screens. */
function Chain({ nodes }: { nodes: Node[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {nodes.map((node, i) => (
        <li key={node.label} className="flex items-center gap-1.5">
          {i > 0 && <ArrowRight weight="bold" className="size-3.5 shrink-0 text-accent" />}
          <NodeBox node={node} />
        </li>
      ))}
    </ol>
  );
}

function Module({ index, title, note, children }: { index: string; title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-bg/80 p-3 backdrop-blur-[2px] sm:p-4">
      <header className="mb-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className={`${mono} text-accent`}>
          <span className="text-muted">{index}</span> {title}
        </p>
        <p className="text-xs text-muted">{note}</p>
      </header>
      {children}
    </section>
  );
}

export function OnboardingN8n() {
  return (
    <Frame label="The automated workflow in n8n, three modules. Intake: a Gmail trigger, an OpenAI agent that parses the email, a row in Google Sheets, an interview slot in Google Calendar and the invite. Pre-boarding: a status change in Google Sheets is routed to the test task with reminders, a rejection email, or a contract copied from a template in Google Drive. IT setup: a daily schedule creates the Jira user over REST, clones onboarding tickets, notifies the supervisor, grants Drive access, sends the welcome email and after seven days adds recurring meetings.">
      <div className="space-y-3">
        <Module index="01" title="Intake" note="Runs on every new email">
          <Chain
            nodes={[
              { label: "Gmail trigger", tech: "Gmail", trigger: true },
              { label: "AI agent parses the email", tech: "OpenAI API" },
              { label: "New or known candidate?", icon: ArrowsSplit },
              { label: "Add or update the row", tech: "Google Sheets" },
              { label: "Map a free interview slot", tech: "Google Calendar" },
              { label: "Send the invite", tech: "Gmail" },
            ]}
          />
        </Module>

        <Module index="02" title="Pre-boarding" note="Runs when HR changes a status in the sheet">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-1.5">
            <Chain
              nodes={[
                { label: "Status changed", tech: "Google Sheets", trigger: true },
                { label: "Route by status", icon: ArrowsSplit },
              ]}
            />
            <Flow className="md:mx-1" />
            {/* The three branches of the router. */}
            <ul className="flex flex-1 flex-col gap-2 border-l-2 border-accent/50 pl-3">
              <li>
                <Chain
                  nodes={[
                    { label: "Send the test task", tech: "Gmail" },
                    { label: "Wait 4 days", icon: Hourglass },
                    { label: "Done? if not: reminder", icon: ArrowsClockwise },
                  ]}
                />
              </li>
              <li>
                <Chain nodes={[{ label: "Rejection email from a template", tech: "Gmail" }]} />
              </li>
              <li>
                <Chain
                  nodes={[
                    { label: "Copy the contract template", tech: "Google Drive" },
                    { label: "Share the folder", tech: "Google Drive" },
                    { label: "Send the contract", tech: "Gmail" },
                    { label: "Remind until signed", icon: Signature },
                  ]}
                />
              </li>
            </ul>
          </div>
        </Module>

        <Module index="03" title="IT setup" note="Runs once a day for new hires">
          <Chain
            nodes={[
              { label: "Every day", icon: Clock, trigger: true },
              { label: "Get new hires", tech: "Google Sheets" },
              { label: "Create the Jira user (HTTP POST)", icon: Globe },
              { label: "Clone onboarding tickets", icon: Copy },
              { label: "Notify the supervisor", tech: "Jira" },
              { label: "Grant Drive access", tech: "Google Drive" },
              { label: "Welcome email", tech: "Gmail" },
              { label: "Wait 7 days", icon: Hourglass },
              { label: "Add recurring meetings", tech: "Google Calendar" },
            ]}
          />
        </Module>
      </div>
      <p className={`${mono} mt-4 flex items-center gap-2 text-muted`}>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        Accent border = the trigger that starts a module
      </p>
    </Frame>
  );
}

/* ─────────────────────────── 3. Data flow ─────────────────────────── */

function Box({ title, children, accent }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-lg border p-3 sm:p-4 ${accent ? "border-accent/60 bg-accent-soft/60" : "border-line bg-surface"}`}>
      <p className={`${mono} mb-2.5 ${accent ? "text-accent" : "text-muted"}`}>{title}</p>
      {children}
    </div>
  );
}

function ToolList({ tools }: { tools: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {tools.map((t) => (
        <li key={t} className="flex items-center gap-2 text-sm font-medium">
          <TechIcon name={t} className="size-4" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function OnboardingDataFlow() {
  return (
    <Frame label="Data flow. Input: email and Google Forms go into n8n. n8n parses the data with AI, gives every candidate an ID and keeps all records in Google Sheets, the single source of truth. Based on the status, n8n acts in Gmail, Google Calendar, Jira and Google Drive, then writes the result back to the same row.">
      <div className="grid items-center gap-2 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
        <Box title="Input">
          <ToolList tools={["Gmail", "Google Forms"]} />
        </Box>
        <Flow />
        <div className="flex flex-col items-stretch gap-2">
          <Box title="n8n" accent>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center gap-2 font-medium">
                <TechIcon name="OpenAI API" className="size-4" />
                AI parsing of free text
              </li>
              <li className="flex items-center gap-2 font-medium">
                <ArrowsSplit weight="bold" className="size-4 text-accent" />
                Routing by status
              </li>
              <li className="flex items-center gap-2 font-medium">
                <Bell weight="bold" className="size-4 text-accent" />
                Reminders and waits
              </li>
            </ul>
          </Box>
          <span className="flex items-center justify-center gap-2 text-accent">
            <ArrowsDownUp weight="bold" className="size-4" />
            <span className={`${mono} text-muted`}>read · write back</span>
          </span>
          <Box title="Google Sheets · single source of truth">
            <p className="flex items-center gap-2 text-sm font-medium">
              <TechIcon name="Google Sheets" className="size-4" />
              One row per candidate, with an ID and a status
            </p>
          </Box>
        </div>
        <Flow />
        <Box title="Actions">
          <ToolList tools={["Gmail", "Google Calendar", "Jira", "Google Drive"]} />
        </Box>
      </div>
    </Frame>
  );
}

export const ONBOARDING_DIAGRAMS = {
  "onboarding-as-is": OnboardingAsIs,
  "onboarding-n8n": OnboardingN8n,
  "onboarding-data-flow": OnboardingDataFlow,
};
