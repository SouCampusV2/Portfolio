import type { DiagramId } from "@/content/site";
import { ONBOARDING_DIAGRAMS } from "./Onboarding";

/** Every diagram a case study can show, by the id used in content/site.ts. */
export const DIAGRAMS: Record<DiagramId, () => React.JSX.Element> = {
  ...ONBOARDING_DIAGRAMS,
};
