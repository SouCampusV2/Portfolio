import {
  Buildings,
  EyeSlash,
  Globe,
  Handshake,
  IdentificationCard,
  Lightning,
  ListMagnifyingGlass,
  LockKey,
  Robot,
  ShieldCheck,
  TreeStructure,
} from "@phosphor-icons/react/dist/ssr";
import { Chain, Frame, Lane, Module, TriggerNote } from "./parts";

/**
 * Diagrams for the Crossdesk case study, from the public repository
 * (Dennel04/b2b-match: README, PLAN.md, supabase/migrations) and its commit
 * history. Steps tagged "mine" are the owner's commits; the rest is the team's.
 */

const MINE = "mine";

/** The product, one company's path; the owner's parts are tagged. */
export function CrossdeskFlow() {
  return (
    <Frame label="How Crossdesk works. A company signs in with Google, pastes its website, and the site reader fills its profile; it describes its services in public and its problem in private. Two AI agents negotiate budget, timing and contract fit; the vendor's agent never sees the buyer's problem, and a guard rejects any transcript that leaks it. People are introduced only when the terms fit. Sign-in, onboarding with the site reader, and the screens are the owner's part; matching, the agents and the guard are the team's.">
      <div className="space-y-3">
        <Module index="01" title="A company joins" note="Red caption = my part (from the commit history)">
          <Chain
            nodes={[
              { label: "Sign in with Google", icon: LockKey, trigger: true, tag: MINE },
              { label: "Paste the website", icon: Globe, tag: MINE },
              { label: "Reader fills the profile", icon: IdentificationCard, tag: MINE },
              { label: "Services in public", icon: Buildings, tag: MINE },
              { label: "The problem in private", icon: EyeSlash, tag: MINE },
            ]}
          />
        </Module>
        <Module index="02" title="Matching" note="The team's part">
          <Chain
            nodes={[
              { label: "Find vendors that fit", icon: TreeStructure, trigger: true },
              { label: "Two AI agents negotiate", tech: "Claude API" },
              { label: "Guard: the problem never leaks", icon: ShieldCheck },
              { label: "Intro only when the terms fit", icon: Handshake },
            ]}
          />
        </Module>
      </div>
      <TriggerNote>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        Accent border = where it starts
      </TriggerNote>
    </Frame>
  );
}

/** The company directory: read off public websites, safe to show to every member. */
export function CrossdeskDirectory() {
  return (
    <Frame label="The company directory, the owner's part. A script reads public company websites and follows the site's own links; it pulls the name, logo, city, size, languages and services; the profile is saved in the directory table. Every signed-in user may read it; only the server writes. Directory companies never take part in matching.">
      <Module index="01" title="Company directory" note="So a new member sees real companies on day one">
        <div className="flex flex-col gap-2.5">
          <Lane label="Read">
            <Chain
              nodes={[
                { label: "Public company website", icon: Globe, trigger: true },
                { label: "Follow the site's own links", icon: ListMagnifyingGlass },
                { label: "Name, logo, city, size, languages, services", icon: IdentificationCard },
                { label: "Directory table", tech: "Supabase" },
              ]}
            />
          </Lane>
          <Lane label="Access (RLS)">
            <Chain
              parallel
              nodes={[
                { label: "Signed-in users: read", icon: LockKey },
                { label: "Only the server: write", icon: ShieldCheck },
                { label: "Never used in matching", icon: Robot },
              ]}
            />
          </Lane>
        </div>
      </Module>
      <TriggerNote>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        All of it is my part
      </TriggerNote>
    </Frame>
  );
}

export const CROSSDESK_DIAGRAMS = {
  "crossdesk-flow": CrossdeskFlow,
  "crossdesk-directory": CrossdeskDirectory,
};
