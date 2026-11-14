import {
  ArrowDown,
  ArrowRight,
  ArrowsClockwise,
  ArrowsDownUp,
  ArrowsSplit,
  Bell,
  CheckSquare,
  Clock,
  Copy,
  Globe,
  Hourglass,
  Lightning,
  Signature,
} from "@phosphor-icons/react/dist/ssr";
import { TechIcon } from "@/components/TechIcon";
import { Chain, Frame, Lane, Module, mono } from "./parts";

/**
 * Diagrams for the onboarding-automation case study, redrawn from the thesis
 * (pages 20–21, 26–27, 30) in the site's own style. HTML, not images: the text
 * is real text and colours come from the theme tokens.
 *
 * Every arrow follows the thesis figures. Wide screens get the left-to-right
 * picture; narrow screens get the same steps top to bottom.
 *
 * The offboarding chart (thesis p. 22) is deliberately not drawn: it shows a
 * security gap at the company.
 */

const down = <ArrowDown weight="bold" className="size-3.5 text-accent" />;

/* ─────────────────────────── 1. Before: the manual process ─────────────────────────── */

type Step = { text: string; hr?: boolean; pain?: boolean };
type Phase = { name: string; steps: Step[]; gate?: string };

/** Thesis p. 20–21. A failed gate ends in a rejection email that HR writes by hand. */
const PHASES: Phase[] = [
  {
    name: "Application",
    steps: [
      { text: "Application arrives by email", hr: false },
      { text: "HR checks the inbox", hr: true, pain: true },
      { text: "HR sends a Google Form", hr: true },
      { text: "Candidate fills the form" },
      { text: "Row lands in Google Sheets" },
    ],
  },
  {
    name: "Screening",
    steps: [
      { text: "HR watches the table for new rows", hr: true, pain: true },
      { text: "HR reviews CV and form", hr: true },
    ],
    gate: "Selected?",
  },
  {
    name: "HR interview",
    steps: [
      { text: "HR sets the status in the sheet", hr: true },
      { text: "HR writes the invite", hr: true },
      { text: "HR books the meeting", hr: true },
      { text: "HR interviews", hr: true },
      { text: "HR writes the result in the sheet", hr: true },
    ],
    gate: "Passed?",
  },
  {
    name: "Tech interview",
    steps: [
      { text: "HR contacts the supervisor", hr: true },
      { text: "HR books the tech interview", hr: true },
      { text: "Supervisor interviews" },
      { text: "Supervisor tells HR" },
    ],
    gate: "Passed?",
  },
  {
    name: "Test task",
    steps: [
      { text: "HR sends the task", hr: true },
      { text: "HR tracks the deadline", hr: true, pain: true },
      { text: "HR sends reminders", hr: true },
      { text: "HR forwards the result", hr: true },
      { text: "Supervisor reviews it" },
    ],
    gate: "Passed?",
  },
  {
    name: "Contract",
    steps: [
      { text: "HR makes Drive folders and the contract", hr: true },
      { text: "Candidate fills the contract" },
      { text: "HR asks the owner to sign", hr: true },
      { text: "Owner signs by hand", pain: true },
      { text: "HR sends it back, waits and reminds", hr: true },
    ],
    gate: "Signed?",
  },
  {
    name: "Onboarding",
    steps: [
      { text: "HR creates accounts", hr: true },
      { text: "HR gives access to tools", hr: true, pain: true },
      { text: "HR adds the hire to tables", hr: true },
      { text: "HR books the first meetings", hr: true },
    ],
  },
];

function StepBox({ step }: { step: Step }) {
  const tone = step.hr ? "border-accent/45 bg-accent-soft text-ink" : "border-line bg-surface text-ink/80";
  return (
    <span className={`relative block rounded-md border px-2 py-1.5 text-[0.72rem] leading-snug ${tone}`}>
      {step.text}
      {step.pain && <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-accent ring-2 ring-bg" />}
    </span>
  );
}

function PhaseColumn({ phase, index }: { phase: Phase; index: number }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-bg/85 p-2">
      <p className={`${mono} mb-2 min-h-[2.2em] text-accent`}>
        <span className="text-muted">{String(index + 1).padStart(2, "0")}</span> {phase.name}
      </p>
      <ol className="flex flex-col items-stretch">
        {phase.steps.map((step, i) => (
          <li key={step.text} className="flex flex-col items-center">
            {i > 0 && <span className="py-0.5">{down}</span>}
            <span className="w-full">
              <StepBox step={step} />
            </span>
          </li>
        ))}
      </ol>
      {phase.gate && (
        <>
          <span className="flex justify-center py-0.5">{down}</span>
          <div className="rounded-md border border-dashed border-ink/50 px-2 py-1.5 text-center text-[0.72rem] font-semibold">
            {phase.gate}
          </div>
          <div className="mt-1.5 flex items-center justify-between gap-1 text-[0.65rem] font-medium">
            <span className="inline-flex items-center gap-0.5 text-ink/70">
              <ArrowDown weight="bold" className="size-3" /> no
            </span>
            <span className="inline-flex items-center gap-0.5 text-accent">
              yes <ArrowRight weight="bold" className="size-3" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export function OnboardingAsIs() {
  const hrSteps = PHASES.flatMap((p) => p.steps).filter((s) => s.hr).length;
  return (
    <Frame label={`The manual hiring process before automation: seven phases from application to onboarding, ${hrSteps} steps done by HR by hand. Each check that fails ends in a rejection email that HR also writes by hand.`}>
      {/* Wide screens: one row, phases joined by arrows. It scrolls inside the frame if needed. */}
      <div className="-mx-1 overflow-x-auto px-1 pb-1">
        <ol className="flex flex-col items-stretch lg:min-w-[1000px] lg:flex-row">
          {PHASES.map((phase, i) => (
            <li key={phase.name} className="flex flex-col items-stretch lg:flex-1 lg:flex-row">
              {i > 0 && (
                <span className="flex items-center justify-center py-1 text-accent lg:px-0.5 lg:py-0">
                  <ArrowDown weight="bold" className="size-4 lg:hidden" />
                  <ArrowRight weight="bold" className="hidden size-4 lg:block" />
                </span>
              )}
              <div className="lg:flex-1">
                <PhaseColumn phase={phase} index={i} />
              </div>
            </li>
          ))}
        </ol>
        {/* Where every "no" ends. */}
        <div className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-dashed border-ink/50 bg-bg/85 px-3 py-2 text-center text-xs font-semibold lg:min-w-[1000px]">
          <ArrowDown weight="bold" className="size-3.5" />
          Every “no” ends here: HR writes the rejection email by hand
        </div>
      </div>
      <div className={`${mono} mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted`}>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm border border-accent/45 bg-accent-soft" />
          HR, by hand · {hrSteps} steps
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm border border-line bg-surface" />
          Candidate, supervisor, owner
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

export function OnboardingN8n() {
  return (
    <Frame label="The automated workflow in n8n, three modules. Intake: a Gmail trigger, an AI agent that parses the email, a switch, a row in Google Sheets, an interview slot in Google Calendar and the invite. Pre-boarding: a status change in Google Sheets goes through Route by status into four branches: the second-interview invite, the test task with a wait and reminders, a rejection email, or a contract copied from a template in Google Drive and sent with reminders. IT setup runs once a day: new hires from the sheet, a Jira user created over REST, cloned onboarding tickets with a comment for the supervisor; then Drive access, the welcome email, the row marked done, a seven-day wait and the invite to daily meetings.">
      <div className="space-y-3">
        <Module index="01" title="Intake" note="Runs on every new email">
          <Chain
            nodes={[
              { label: "New email", tech: "Gmail", trigger: true },
              { label: "AI agent reads the email", tech: "OpenAI API" },
              { label: "Switch", icon: ArrowsSplit },
              { label: "Add or update the row", tech: "Google Sheets" },
              { label: "Map a free interview slot", tech: "Google Calendar" },
              { label: "Send the invite", tech: "Gmail" },
            ]}
          />
        </Module>

        <Module index="02" title="Pre-boarding" note="Runs when HR changes a status in the sheet">
          <div className="flex flex-col gap-3">
            <Chain
              nodes={[
                { label: "Status changed", tech: "Google Sheets", trigger: true },
                { label: "Route by status", icon: ArrowsSplit },
              ]}
            />
            {/* The router's branches, one per status. */}
            <div className="flex flex-col gap-2.5 border-l-2 border-accent/50 pl-3 md:ml-[4.5rem]">
              <Lane label="Interview 2">
                <Chain nodes={[{ label: "Second-interview invite", tech: "Gmail" }]} />
              </Lane>
              <Lane label="Test task">
                <Chain
                  nodes={[
                    { label: "Send the test task", tech: "Gmail" },
                    { label: "Wait", icon: Hourglass },
                    { label: "Done? If not, remind", icon: ArrowsClockwise },
                  ]}
                />
              </Lane>
              <Lane label="Rejected">
                <Chain nodes={[{ label: "Rejection email", tech: "Gmail" }]} />
              </Lane>
              <Lane label="Hired">
                <Chain
                  nodes={[
                    { label: "Folder and contract copy", tech: "Google Drive" },
                    { label: "Share the folder", tech: "Google Drive" },
                    { label: "Send the contract", tech: "Gmail" },
                    { label: "Wait, then remind", icon: Signature },
                  ]}
                />
              </Lane>
            </div>
          </div>
        </Module>

        <Module index="03" title="IT setup" note="Runs once a day for new hires">
          <div className="flex flex-col gap-2.5">
            <Lane label="Accounts">
              <Chain
                nodes={[
                  { label: "Every day", icon: Clock, trigger: true },
                  { label: "Hires from the last 24 h", tech: "Google Sheets" },
                  { label: "Create the Jira user (HTTP)", icon: Globe },
                  { label: "Clone onboarding tickets", icon: Copy },
                  { label: "Comment for the supervisor", tech: "Jira" },
                ]}
              />
            </Lane>
            <Lane label="Then welcome">
              <Chain
                nodes={[
                  { label: "Grant Drive access", tech: "Google Drive" },
                  { label: "Welcome email", tech: "Gmail" },
                  { label: "Mark done in the sheet", icon: CheckSquare },
                  { label: "Wait 7 days", icon: Hourglass },
                  { label: "Invite to daily meetings", tech: "Google Calendar" },
                ]}
              />
            </Lane>
          </div>
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

function Box({ title, children, accent, className = "" }: { title: string; children: React.ReactNode; accent?: boolean; className?: string }) {
  return (
    <div className={`rounded-lg border p-3 sm:p-4 ${accent ? "border-accent/60 bg-accent-soft" : "border-line bg-surface"} ${className}`}>
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

/** Arrow cell of the data-flow grid: right from `md`, down below. */
function GridArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center text-accent ${className}`}>
      <ArrowDown weight="bold" className="size-4 md:hidden" />
      <ArrowRight weight="bold" className="hidden size-4 md:block" />
    </span>
  );
}

export function OnboardingDataFlow() {
  return (
    <Frame label="Data flow. Input: email and Google Forms go into n8n. n8n parses the data with AI, routes it by status and keeps every record in Google Sheets, the single source of truth, reading and writing back. Based on the status, n8n acts in Gmail, Google Calendar, Jira and Google Drive.">
      {/* Row 1: input → n8n → actions. Row 2: Google Sheets under n8n. Phones: one column. */}
      <div className="grid gap-2 md:grid-cols-[1fr_2rem_1.2fr_2rem_1fr] md:grid-rows-[auto_auto_auto] md:gap-x-1">
        <Box title="Input" className="md:col-start-1 md:row-start-1 md:self-center">
          <ToolList tools={["Gmail", "Google Forms"]} />
        </Box>
        <GridArrow className="md:col-start-2 md:row-start-1" />
        <Box title="n8n" accent className="md:col-start-3 md:row-start-1">
          <ul className="space-y-1.5 text-sm font-medium">
            <li className="flex items-center gap-2">
              <TechIcon name="OpenAI API" className="size-4" />
              AI reads free text
            </li>
            <li className="flex items-center gap-2">
              <ArrowsSplit weight="bold" className="size-4 text-accent" />
              Routes by status
            </li>
            <li className="flex items-center gap-2">
              <Bell weight="bold" className="size-4 text-accent" />
              Waits and reminders
            </li>
          </ul>
        </Box>
        <span className="flex items-center justify-center gap-2 py-0.5 text-accent md:col-start-3 md:row-start-2">
          <ArrowsDownUp weight="bold" className="size-4" />
          <span className={`${mono} text-muted`}>read · write back</span>
        </span>
        <Box title="Google Sheets · single source of truth" className="md:col-start-3 md:row-start-3">
          <p className="flex items-center gap-2 text-sm font-medium">
            <TechIcon name="Google Sheets" className="size-4" />
            One row per candidate: ID, status, results
          </p>
        </Box>
        <GridArrow className="md:col-start-4 md:row-start-1" />
        <Box title="Actions" className="md:col-start-5 md:row-start-1 md:self-center">
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
