import {
  Archive,
  ArrowsSplit,
  ChatCircleDots,
  CheckCircle,
  ClipboardText,
  CreditCard,
  Hammer,
  Lightning,
  ListChecks,
  ShieldCheck,
  Star,
  Ticket,
  Timer,
  UserCheck,
} from "@phosphor-icons/react/dist/ssr";
import { Chain, Frame, Lane, Module, TriggerNote } from "./parts";

/**
 * Diagrams for the BotCampus case study, drawn from the bot's code and docs
 * (repository SouCampusV2/soucampusBot: README, docs/ARCHITECTURE.md,
 * src/modules/tickets/TicketStatus.js).
 */

/** The path of one order. Tags are the real ticket statuses in the database. */
export function BotCampusOrderFlow() {
  return (
    <Frame label="The path of one order in Discord. The client opens a ticket and fills the order form; status form. Submit order opens it to builders; status open. Builders send quotes; the client accepts one; status assigned. A manager confirms the payment; status paid. The work is marked complete; status completed. The client leaves one review. Closing archives the channel and deletes it after 48 hours; status closed.">
      <div className="space-y-3">
        <Module index="01" title="Order" note="Client · builders · manager">
          <Chain
            nodes={[
              { label: "Client opens a ticket", icon: Ticket, trigger: true, tag: "form" },
              { label: "Order form in pop-ups", icon: ClipboardText },
              { label: "Submit: open to builders", icon: ArrowsSplit, tag: "open" },
              { label: "Builders send quotes", icon: ChatCircleDots },
              { label: "Client picks a builder", icon: UserCheck, tag: "assigned" },
            ]}
          />
        </Module>
        <Module index="02" title="Work" note="After the client's choice">
          <Chain
            nodes={[
              { label: "Manager confirms payment", icon: CreditCard, tag: "paid" },
              { label: "Builder works; deadline reminders", icon: Hammer },
              { label: "Marked complete", icon: CheckCircle, tag: "completed" },
              { label: "Client leaves one review", icon: Star },
              { label: "Closed: archived, deleted after 48 h", icon: Archive, tag: "closed" },
            ]}
          />
        </Module>
      </div>
      <TriggerNote>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        Red caption = the ticket status saved in the database
      </TriggerNote>
    </Frame>
  );
}

/** What happens on one button press, and what reacts to it. */
export function BotCampusSystem() {
  return (
    <Frame label="What happens on one button press. Discord sends the click; the router finds the handler by the button's ID. The handler checks who pressed it, moves the ticket to the next status with one database update, answers within three seconds and only then does the slow work. A status change is an event: the order card, the staff log, the transcript and the client roles react to it. With the client's consent, reviews and portfolio drafts go to soucampus.online through a signed queue with retries; the website posts new maps back to Discord.">
      <div className="space-y-3">
        <Module index="01" title="One button press" note="Every button is a public door: the check comes first">
          <Chain
            nodes={[
              { label: "Click in Discord", tech: "Discord", trigger: true },
              { label: "Router finds the handler by button ID", icon: ArrowsSplit },
              { label: "Who pressed it? Client or manager", icon: ShieldCheck },
              { label: "Next status: one SQL update", tech: "SQLite" },
              { label: "Answer within 3 s", icon: Timer },
              { label: "Then the slow work: channels, messages", tech: "Discord" },
            ]}
          />
        </Module>
        <Module index="02" title="A status changed" note="Features listen to the event; handlers do not call them">
          <div className="flex flex-col gap-2.5">
            <Lane label="Each reacts">
              <Chain
                parallel
                nodes={[
                  { label: "Live order card redrawn", icon: ListChecks },
                  { label: "Line in the staff log", icon: ClipboardText },
                  { label: "Transcript on close", icon: Archive },
                  { label: "Client role after payment", icon: UserCheck },
                ]}
              />
            </Lane>
          </div>
        </Module>
        <Module index="03" title="Website" note="Both directions">
          <div className="flex flex-col gap-2.5">
            <Lane label="To the site">
              <Chain
                nodes={[
                  { label: "Client agrees to share", icon: CheckCircle, trigger: true },
                  { label: "Queued in the database", tech: "SQLite" },
                  { label: "Signed request, retries with back-off", icon: ShieldCheck },
                  { label: "Review or portfolio draft on the site", tech: "Next.js" },
                ]}
              />
            </Lane>
            <Lane label="From the site">
              <Chain
                nodes={[
                  { label: "New map published", tech: "Next.js", trigger: true },
                  { label: "Webhook post in the channel", tech: "Discord" },
                  { label: "Bot reacts under the post", icon: Star },
                ]}
              />
            </Lane>
          </div>
        </Module>
      </div>
      <TriggerNote>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        Accent border = what starts the chain
      </TriggerNote>
    </Frame>
  );
}

export const BOTCAMPUS_DIAGRAMS = {
  "botcampus-order-flow": BotCampusOrderFlow,
  "botcampus-system": BotCampusSystem,
};
