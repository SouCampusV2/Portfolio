import type { DiagramId } from "@/content/site";
import { BOTCAMPUS_DIAGRAMS } from "./BotCampus";
import { ONBOARDING_DIAGRAMS } from "./Onboarding";
import { SOUTOOLS_DIAGRAMS } from "./SouTools";

/** Every diagram a case study can show, by the id used in content/site.ts. */
export const DIAGRAMS: Record<DiagramId, () => React.JSX.Element> = {
  ...ONBOARDING_DIAGRAMS,
  ...BOTCAMPUS_DIAGRAMS,
  ...SOUTOOLS_DIAGRAMS,
};
