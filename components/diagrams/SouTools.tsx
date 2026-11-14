import {
  ArrowCounterClockwise,
  Cube,
  CursorClick,
  DownloadSimple,
  GameController,
  KeyReturn,
  Lightning,
  MagnifyingGlass,
  Package,
  SlidersHorizontal,
  Swap,
  Timer,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { Chain, Frame, Lane, Module, TriggerNote } from "./parts";

/**
 * Diagrams for the SouTools case study, drawn from the repository
 * (SouCampusV2/soucampusAxiomTools: README, ci/build.sh, .github/workflows/build.yml).
 */

/** How a builder uses one tool inside the Axiom editor. */
export function SouToolsUse() {
  return (
    <Frame label="Using one tool in the Axiom editor: pick a tool, add points with right click and move them with the arrows, tune the settings or a preset, undo point edits with Ctrl+Z, press Enter to place the blocks.">
      <Module index="01" title="One tool, in the game" note="Inside Axiom's own editor">
        <Chain
          nodes={[
            { label: "Pick a tool, e.g. Floating Rock", icon: Cube, trigger: true },
            { label: "Right click adds points; drag arrows to move", icon: CursorClick },
            { label: "Tune settings or a preset", icon: SlidersHorizontal },
            { label: "Ctrl+Z / Ctrl+Y: undo point edits", icon: ArrowCounterClockwise },
            { label: "Enter places the blocks", icon: KeyReturn },
          ]}
        />
      </Module>
      <TriggerNote>
        <Lightning weight="bold" className="size-3.5 text-accent" />
        Accent border = where it starts
      </TriggerNote>
    </Frame>
  );
}

/** From a push to an updated game. */
export function SouToolsRelease() {
  return (
    <Frame label="From a push to an updated game. A push to the main branch starts GitHub Actions: it downloads Axiom for compiling only, compiles the Java 21 code, checks that every Axiom and Minecraft member the code uses really exists, and publishes a release with two jars. On game start the mod checks the latest release, downloads a newer jar and swaps it after Minecraft closes. On Windows a scheduled task can also replace the jar every 10 minutes while the game is closed.">
      <div className="space-y-3">
        <Module index="01" title="Build and release" note="Every push to main">
          <Chain
            nodes={[
              { label: "Push to main", tech: "GitHub", trigger: true },
              { label: "Axiom downloaded for compiling only", tech: "Modrinth" },
              { label: "Compile Java 21", tech: "Java" },
              { label: "Check every Axiom / Minecraft call exists", icon: MagnifyingGlass },
              { label: "Release build-N: two jars", tech: "GitHub Actions" },
            ]}
          />
        </Module>
        <Module index="02" title="Update" note="On the builder's machine">
          <div className="flex flex-col gap-2.5">
            <Lane label="In the mod">
              <Chain
                nodes={[
                  { label: "Game starts", icon: GameController, trigger: true },
                  { label: "Mod checks the latest release", icon: MagnifyingGlass },
                  { label: "Downloads the newer jar", icon: DownloadSimple },
                  { label: "Swaps it after the game closes", icon: Swap },
                ]}
              />
            </Lane>
            <Lane label="Optional">
              <Chain
                nodes={[
                  { label: "Windows task, every 10 min", icon: Timer, trigger: true },
                  { label: "Game closed? Replace every installed jar", icon: Package },
                  { label: "Next start is up to date", icon: Wrench },
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

export const SOUTOOLS_DIAGRAMS = {
  "soutools-use": SouToolsUse,
  "soutools-release": SouToolsRelease,
};
