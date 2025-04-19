"use client";
import { InferSelectModel } from "drizzle-orm";
import { mnk, MNKDecision, MNKDecisionType } from "~/server/db/schema";
import { useState, useEffect } from "react";
import { insertMNKDecision } from "./actions";
import { useToast } from "~/hooks/use-toast";
import { Countdown } from "./Countdown";
import { Triangle } from "lucide-react";
import Image from "next/image";
import DOOR from "./door.svg";
import { cn } from "~/lib/utils";

type Row = InferSelectModel<typeof mnk>;

type Step = "initial" | "door_1" | "door_2" | "door_3" | "switch" | "stay";

type State = {
  run: number;
  scenario: number;
  step: Step;
};

function Dot() {
  return (
    <div className="absolute -start-[7px] mt-1.5 h-3 w-3 rounded-full border border-main-header bg-main-header"></div>
  );
}

function Marker({
  variant,
  selected,
}: {
  variant: "scenario" | "normal";
  selected: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-[6.2px] opacity-0",
        variant === "scenario" ? "-translate-x-[37px]" : "-translate-x-10",
        selected ? "opacity-100" : "group-hover:opacity-50",
      )}
    >
      <Triangle className="size-3 rotate-90 fill-main-header" />
    </div>
  );
}

const coolDownTime = 30 * 60 * 1000; // 30 minutes

const stateDisplay = (currRun: Row[], inRow: Row) => {
  if (inRow.decisionType === "door") {
    return (
      <div className="flex">
        {["door_1", "door_2", "door_3"].map((decision) => (
          <p
            key={`state-${inRow.scenario}-${inRow.decisionType}-${decision}`}
            className={cn(
              "w-4 rounded-sm",
              decision === inRow.decision && "border",
            )}
          >
            {decision.slice(-1)}
          </p>
        ))}
      </div>
    );
  }

  const doorDecision = currRun.find(
    (row) => row.scenario === inRow.scenario && row.decisionType === "door",
  );
  const switchDoor = doorDecision?.decision === "door_2" ? "door_1" : "door_2";

  return (
    <div className="flex">
      {["door_1", "door_2", "door_3"].map((decision) => (
        <p
          key={`state-${inRow.scenario}-${inRow.decisionType}-${decision}`}
          className={cn(
            "w-4 rounded-sm",
            ((decision === doorDecision?.decision &&
              inRow.decision === "stay") ||
              (decision === switchDoor && inRow.decision === "switch")) &&
              "border",
            decision ===
              (doorDecision?.decision === "door_3" ? "door_1" : "door_3") &&
              "opacity-50",
          )}
        >
          {decision.slice(-1)}
        </p>
      ))}
    </div>
  );
};

const videos: Record<number, Partial<Record<Step, string>>> = {
  1: {
    initial: "K9U6X0WJunQ",
    door_1: "E94aGrxoyuk",
    door_2: "gAorxB3oJU4",
    door_3: "eBtARI1LfPI",
    switch: "WshgkZDiavo",
    stay: "w0qqX6vp4AE",
  },
  2: {
    initial: "U9ZURnPDRFs",
    door_1: "zGcKUldar5c",
    door_2: "1xwWnd1oiKo",
    door_3: "K7_pRbiM9Kg",
    switch: "3C5J7UNoD3g",
    stay: "3gC6vh-WjHs",
  },
  3: {
    initial: "voL9aS-gNEc",
    door_1: "o6FmcOb9Vaw",
    door_2: "Uqk-uERUiBs",
    door_3: "DVqhJrtwBw4",
    switch: "Sfw6BRGhCI0",
    stay: "WwPlpm7grE8",
  },
  4: {
    initial: "P3_MFiB9aHY",
    door_1: "Iq-oIEBbWzg",
    door_2: "Okf-8Aw7kkY",
    door_3: "TQzzUHRKuqU",
    switch: "M2SVM4gwRgc",
    stay: "7ovWo95JNRc",
  },
};

// Get the last row of a run
const getLastRow = (run: Row[]): Row | null => {
  return run.length
    ? run.reduce((acc, curr) => {
        if (curr.scenario > acc.scenario) return curr;
        if (curr.scenario < acc.scenario) return acc;
        if (curr.decisionType === "final") return curr;
        return acc;
      })
    : null;
};

// Get the previous state from a row
const getStateFromRow = (row: Row | null): State => {
  // Initial state
  if (!row)
    return {
      run: 1,
      scenario: 1,
      step: "initial",
    };

  return {
    run: row.run,
    scenario: row.scenario,
    step: row.decision,
  };
};

export default function RemoteBody({ run }: { run: Row[] }) {
  const { toast } = useToast();

  // Keep track of the current run
  // Initialize the current state of the puzzle
  const [currRun, setRun] = useState<Row[]>(run);
  const lastRow = getLastRow(run);
  const currState = getStateFromRow(lastRow);
  const [state, setState] = useState<State>(currState);
  const [pendingConfirmation, setPendingConfirmation] = useState<{
    decision: MNKDecision;
    decisionType: MNKDecisionType;
  } | null>(null);

  // Figure out when the cooldown ends
  const [cooldown, setCooldown] = useState<Date | null>(null);
  useEffect(() => {
    if (lastRow?.scenario === 4 && lastRow?.decisionType === "final") {
      const cooldown = new Date(lastRow.time.getTime() + coolDownTime);
      setCooldown(cooldown);
    }
  }, [lastRow]);

  const handleDecisionClick = async (
    decision: MNKDecision,
    decisionType: MNKDecisionType,
    e: React.MouseEvent,
  ) => {
    // Prevent the click from bubbling up to the document
    e.stopPropagation();

    if (
      pendingConfirmation &&
      pendingConfirmation.decision === decision &&
      pendingConfirmation.decisionType === decisionType
    ) {
      const result = await insertMNKDecision(
        state.run,
        state.scenario,
        decision,
        decisionType,
      );
      setPendingConfirmation(null);

      // If error, toast and
      // Try to update the state with the last run
      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });

        if (result?.lastRun) {
          setRun(result.lastRun);
          setState(getStateFromRow(getLastRow(result.lastRun)));
        }
      }

      // Otherwise, update the run and the state with the last row
      // And check whether there is a cooldown
      if (result?.row != null) {
        const row = result.row;
        setRun((prevState) => [...prevState, row]);
        setState((prevState) => ({ ...prevState, step: decision }));
        if (row.decisionType === "final" && row.scenario === 4)
          setCooldown(new Date(result.row.time.getTime() + coolDownTime));
      }
    } else {
      setPendingConfirmation({ decision, decisionType });

      toast({
        title: "Click again to confirm",
        description: "This decision is final for this attempt.",
      });
    }
  };

  const handleNextScenarioClick = () => {
    setState((prevState) => ({
      run: prevState.run,
      scenario: prevState.scenario === 4 ? 1 : prevState.scenario + 1,
      step: "initial",
    }));
  };

  const handlePreviousScenarioClick = (scenario: number, step: Step) => {
    setState((prevState) => ({
      ...prevState,
      scenario,
      step,
    }));
  };

  useEffect(() => {
    // Handler for clicks anywhere on the document
    const handleGlobalClick = () => {
      if (pendingConfirmation) {
        setPendingConfirmation(null);
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [pendingConfirmation, toast]);

  return (
    <div>
      <div className="mb-6 max-w-3xl text-center">
        Warning! This puzzle contains choices that your team will not be able to change for a certain time period.
        </div>
        <hr className="my-6 mb-6 w-full border-t border-white" />
      <div className="mb-2 flex space-x-8">
        {/* List of states of the puzzles */}
        <div className="ml-4 flex flex-col items-center space-y-4 text-main-text">
          <h2 className="text-xl font-semibold text-main-header">Timeline</h2>
          <div className="relative space-y-0.5 border-s-2 border-main-header">
            {currRun.map((row) => (
              <div className="ms-4" key={`${row.scenario}-${row.decisionType}`}>
                {row.decisionType === "door" && (
                  <div>
                    <Dot />
                    <div className="group relative w-fit">
                      <button
                        onClick={() =>
                          handlePreviousScenarioClick(row.scenario, "initial")
                        }
                        className={cn(
                          "mb-0.5 w-[84px] rounded-md font-semibold",
                          row.scenario !== state.scenario && "opacity-60",
                        )}
                      >
                        Scenario {row.scenario}
                      </button>
                      <Marker
                        variant="scenario"
                        selected={
                          state.scenario === row.scenario &&
                          state.step === "initial"
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="group relative ml-2 w-fit">
                  <button
                    onClick={() =>
                      handlePreviousScenarioClick(row.scenario, row.decision)
                    }
                    className={cn(
                      "rounded-md",
                      row.scenario !== state.scenario && "opacity-60",
                    )}
                  >
                    {stateDisplay(currRun, row)}
                  </button>
                  <Marker
                    variant="normal"
                    selected={
                      state.scenario === row.scenario &&
                      state.step === row.decision
                    }
                  />
                </div>
              </div>
            ))}
            {(() => {
              const lastRow = getLastRow(currRun);
              if (
                !lastRow ||
                (lastRow?.decisionType === "final" && lastRow.scenario < 4)
              ) {
                return (
                  <div className="ms-4">
                    <Dot />
                    <div className="group relative w-fit">
                      <button
                        onClick={() =>
                          handlePreviousScenarioClick(
                            (lastRow?.scenario ?? 0) + 1,
                            "initial",
                          )
                        }
                        className={cn(
                          "mb-0.5 w-[84px] rounded-md font-semibold",
                          (lastRow?.scenario ?? 0) + 1 !== state.scenario &&
                            "opacity-60",
                        )}
                      >
                        Scenario {(lastRow?.scenario ?? 0) + 1}
                      </button>
                      <Marker
                        variant="scenario"
                        selected={
                          state.scenario === (lastRow?.scenario ?? 0) + 1 &&
                          state.step === "initial"
                        }
                      />
                    </div>
                  </div>
                );
              }
            })()}
          </div>
          {cooldown &&
            getLastRow(currRun)?.scenario === 4 &&
            getLastRow(currRun)?.decisionType === "final" && (
              <Countdown
                targetDate={cooldown}
                callBack={() => {
                  setRun([]);
                  setState((prevState) => ({
                    run: prevState.run + 1,
                    scenario: 1,
                    step: "initial",
                  }));
                }}
              />
            )}
        </div>

        <div className="border-l-2 border-main-header"></div>

        <div className="flex flex-col items-center space-y-8">
          {/* Video */}
          <div>
            <iframe
              className="rounded-md"
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/${videos[state.scenario]![state.step]}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          {/* Door 1, Door 2, and Door 3 buttons */}
          {(() => {
            if (state.step !== "initial") return null;

            const prevDecision = currRun.find(
              (row) =>
                row.scenario === state.scenario && row.decisionType === "door",
            );

            return (
              <div className="flex space-x-8">
                {["door_1", "door_2", "door_3"].map((decision) => (
                  <button
                    key={decision}
                    disabled={
                      !!prevDecision && prevDecision.decision !== decision
                    }
                    onClick={(e) =>
                      prevDecision
                        ? handlePreviousScenarioClick(
                            state.scenario,
                            decision as Step,
                          )
                        : handleDecisionClick(decision as MNKDecision, "door", e)
                    }
                    className={cn(
                      "grid enabled:hover:opacity-90 disabled:cursor-not-allowed",
                      pendingConfirmation?.decision === decision &&
                        pendingConfirmation.decisionType === "door" &&
                        "animate-subtlePulse enabled:hover:animate-none enabled:hover:opacity-80",
                    )}
                  >
                    <Image
                      src={DOOR}
                      width={166}
                      alt=""
                      className="col-start-1 row-start-1"
                    />
                    <p className="col-start-1 row-start-1 mt-[60px] text-4xl font-bold text-[#44413D]">
                      {decision.slice(-1)}
                    </p>
                  </button>
                ))}
              </div>
            );
          })()}

          {/* Switch and Stay buttons */}
          {(() => {
            if (!["door_1", "door_2", "door_3"].includes(state.step)) return null;

            const doorDecision = currRun.find(
              (row) =>
                row.scenario === state.scenario && row.decisionType === "door",
            );
            const stayDoor = doorDecision?.decision;
            const switchDoor =
              doorDecision?.decision === "door_2" ? "door_1" : "door_2";

            const prevDecision = currRun.find(
              (row) =>
                row.scenario === state.scenario && row.decisionType === "final",
            );

            return (
              <div className="flex space-x-8">
                {["door_1", "door_2", "door_3"].map((decision) => (
                  <button
                    key={decision}
                    disabled={
                      (!!prevDecision &&
                        prevDecision.decision !==
                          (decision === stayDoor ? "stay" : "switch")) ||
                      (decision !== stayDoor && decision !== switchDoor)
                    }
                    onClick={(e) =>
                      prevDecision
                        ? handlePreviousScenarioClick(
                            state.scenario,
                            (decision === stayDoor ? "stay" : "switch") as Step,
                          )
                        : handleDecisionClick(
                            (decision === stayDoor
                              ? "stay"
                              : "switch") as MNKDecision,
                            "final",
                            e,
                          )
                    }
                    className={cn(
                      "grid enabled:hover:opacity-90 disabled:cursor-not-allowed",
                      decision !== stayDoor && decision !== switchDoor
                        ? "disabled:opacity-50"
                        : pendingConfirmation?.decision ===
                            (decision === stayDoor ? "stay" : "switch") &&
                            pendingConfirmation.decisionType === "final" &&
                            "animate-subtlePulse enabled:hover:animate-none enabled:hover:opacity-80",
                    )}
                  >
                    <Image
                      src={DOOR}
                      width={166}
                      alt=""
                      className="col-start-1 row-start-1"
                    />
                    <p className="col-start-1 row-start-1 mt-[60px] text-4xl font-bold text-[#44413D]">
                      {decision.slice(-1)}
                    </p>
                  </button>
                ))}
              </div>
            );
          })()}

          {/* Next Scenario button */}
          {(() => {
            if (!["stay", "switch"].includes(state.step)) return null;

            const doorDecision = currRun.find(
              (row) =>
                row.scenario === state.scenario && row.decisionType === "door",
            );

            const switchDecision = currRun.find(
              (row) =>
                row.scenario === state.scenario && row.decisionType === "final",
            );

            const finalDecision =
              switchDecision?.decision === "switch"
                ? doorDecision?.decision === "door_2"
                  ? "door_1"
                  : "door_2"
                : doorDecision?.decision;

            return (
              <div className="flex space-x-8">
                {["door_1", "door_2", "door_3"].map((decision) => (
                  <button
                    key={decision}
                    disabled={decision !== finalDecision}
                    onClick={handleNextScenarioClick}
                    className="grid hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Image
                      src={DOOR}
                      width={166}
                      alt=""
                      className="col-start-1 row-start-1"
                    />
                    <p className="col-start-1 row-start-1 mt-[60px] text-4xl font-bold text-[#44413D]">
                      {finalDecision === decision ? "✓" : decision.slice(-1)}
                    </p>
                  </button>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
