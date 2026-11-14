import {
  Bell,
  Browser,
  ChartLine,
  Copy,
  DeviceMobile,
  EnvelopeSimple,
  Lightning,
  Prohibit,
  Receipt,
  User,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import { Chain, Frame, Lane, Module, TriggerNote } from "./parts";

/**
 * Diagrams for the CMI case study, from the owner's interview (brief, section 3,
 * 14.11.2026). Only what the owner confirmed: no push service is named, the
 * credit rules are described in general words.
 */

/** Before and after: how the analysis reached people. */
export function CmiDelivery() {
  return (
    <Frame label="How the market analysis reached people. Before: the ready AI analysis went out through the browser and email. After: the CMI app on iOS and Android shows the insights, sends push notifications and shows the balance and account. Buying and selling in the app were not shipped: that needs licences.">
      <div className="space-y-3">
        <Module index="01" title="Before" note="The analysis already existed">
          <Chain
            nodes={[
              { label: "AI market analysis: stocks, Bitcoin…", icon: ChartLine, trigger: true },
              { label: "Read it in a browser", icon: Browser },
              { label: "Or wait for the email", icon: EnvelopeSimple },
            ]}
          />
        </Module>
        <Module index="02" title="After" note="The CMI app, June 2025 – March 2026">
          <div className="flex flex-col gap-2.5">
            <Lane label="Every day">
              <Chain
                nodes={[
                  { label: "AI market analysis", icon: ChartLine, trigger: true },
                  { label: "Backend API", icon: Receipt },
                  { label: "App on iOS and Android", tech: "Flutter" },
                  { label: "Push notification", icon: Bell },
                  { label: "Insights, balance, account", icon: DeviceMobile },
                ]}
              />
            </Lane>
            <Lane label="Not shipped">
              <Chain nodes={[{ label: "Buy and sell in the app: needs licences", icon: Prohibit }]} />
            </Lane>
          </div>
        </Module>
      </div>
      <TriggerNote>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        Accent border = where it starts
      </TriggerNote>
    </Frame>
  );
}

/** The database rework: from duplicated data to users, accounts and subscriptions. */
export function CmiDataModel() {
  return (
    <Frame label="The database rework. Before: tables were badly linked, data was duplicated for no reason, some data was missing, and there were no real users, only one-time payments. After: real user accounts, a credit account for each user, subscriptions, and a monthly charge based on use after a free first month.">
      <div className="space-y-3">
        <Module index="01" title="Before" note="What the team inherited">
          <Chain
            parallel
            nodes={[
              { label: "Tables badly linked", icon: Prohibit },
              { label: "The same data in many places", icon: Copy },
              { label: "Some data missing", icon: Prohibit },
              { label: "No real users: one-time payments", icon: Receipt },
            ]}
          />
        </Module>
        <Module index="02" title="After" note="Worked out with the backend developer">
          <Chain
            nodes={[
              { label: "User account", icon: User, trigger: true },
              { label: "Credit account (1 credit = €1)", icon: Wallet },
              { label: "Subscription", icon: Receipt },
              { label: "First month free, then a monthly charge by use", icon: ChartLine },
            ]}
          />
        </Module>
      </div>
      <TriggerNote>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        Each fact now lives in one place
      </TriggerNote>
    </Frame>
  );
}

export const CMI_DIAGRAMS = {
  "cmi-delivery": CmiDelivery,
  "cmi-data-model": CmiDataModel,
};
