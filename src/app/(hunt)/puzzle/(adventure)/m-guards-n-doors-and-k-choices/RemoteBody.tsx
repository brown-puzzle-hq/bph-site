"use client";
import { InferSelectModel } from "drizzle-orm";
import { mnk, MNKDecision, MNKDecisionType } from "~/server/db/schema";
import { useState, useEffect } from "react";
import { insertMNKDecision } from "./actions";
import { useToast } from "~/hooks/use-toast";
import { ElapsedTime } from "~/lib/time";

type Row = InferSelectModel<typeof mnk>;
type Step = "initial" | "door_1" | "door_2" | "door_3" | "switch" | "stay";
type State = {
  run: number;
  scenario: number;
  step: Step;
};

export const coolDownTime = 30 * 60 * 1000; // 30 minutes

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
  const lastRow = getLastRow(run);
  const currState = getStateFromRow(lastRow);
  const [state, setState] = useState<State>(currState);
  const [nextAttempt, setNextAttempt] = useState<Date | null>(null);

  useEffect(() => {
    if (lastRow?.scenario === 4 && lastRow?.decisionType === "final") {
      const cooldown = new Date(lastRow.time.getTime() + coolDownTime);
      setNextAttempt(cooldown);
    }
  }, [lastRow]);

  const handleDecisionClick = async (
    decision: MNKDecision,
    decisionType: MNKDecisionType,
  ) => {
    const result = await insertMNKDecision(
      state.run,
      state.scenario,
      decision,
      decisionType,
    );

    // If error, toast and
    // Try to update the state with the last run
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      if (result?.lastRun) setState(getStateFromRow(lastRow));
    }

    // Otherwise, update the state with the last row
    if (result?.row)
      setState((prevState) => ({ ...prevState, step: decision }));

    // And check whether there is a cooldown
    if (result?.row?.decisionType === "final" && result?.row?.scenario === 4) {
      setNextAttempt(new Date(result.row.time.getTime() + coolDownTime));
    }
  };

  const handleNextScenarioClick = () => {
    setState((prevState) => {
      const isNewScenario =
        prevState.step === "stay" || prevState.step === "switch";

      const isNewRun = prevState.scenario + +isNewScenario > 4;

      // Check if the run is new
      if (isNewRun) {
        return {
          run: prevState.run + 1,
          scenario: 1,
          step: "initial",
        };
      }

      // Check if the scenario is new
      if (isNewScenario) {
        return {
          run: prevState.run,
          scenario: prevState.scenario + 1,
          step: "initial",
        };
      }

      return prevState;
    });
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

  return (
    <div>
      <div className="p-4 text-lg">{`Scenario ${state.scenario} ${state.step} video`}</div>

      <div className="py-4">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${videos[state.scenario]![state.step]}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      {state.step == "initial" && (
        <div className="flex space-x-10">
          <button onClick={() => handleDecisionClick("door_1", "door")}>
            Door 1
          </button>
          <button onClick={() => handleDecisionClick("door_2", "door")}>
            Door 2
          </button>
          <button onClick={() => handleDecisionClick("door_3", "door")}>
            Door 3
          </button>
        </div>
      )}

      {["door_1", "door_2", "door_3"].includes(state.step) && (
        <div className="flex space-x-10">
          <button onClick={() => handleDecisionClick("switch", "final")}>
            Switch
          </button>
          <button onClick={() => handleDecisionClick("stay", "final")}>
            Stay
          </button>
        </div>
      )}

      {["stay", "switch"].includes(state.step) && (
        <div>
          {state.scenario < 4 ? (
            <button onClick={handleNextScenarioClick}>Next scenario</button>
          ) : (
            <button
              onClick={handleNextScenarioClick}
              disabled={nextAttempt ? new Date() < nextAttempt : false}
            >
              {nextAttempt && new Date() < nextAttempt ? (
                <p>
                  Try again in <ElapsedTime date={nextAttempt} />
                </p>
              ) : (
                <p>Try again</p>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
