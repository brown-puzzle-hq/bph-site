import AnalogicalSemanticsMachine from "./AnalogicalSemanticsMachine";

export const puzzleId = "analogical-semantics";

export const inPersonBody = (
  <div className="max-w-3xl">
    <div className="mb-4">
      <i>My LLM thinks that these words are related.</i>
    </div>
    <AnalogicalSemanticsMachine />
  </div>
);

export const remoteBody = inPersonBody;

import Solution from "./solution/solution.mdx";
export const solutionBody = <Solution />;

export const authors = "Chai Harsha";

export const copyText = `Analogical Semantics
My LLM thinks that these words are related.

man : woman :: A : herself
italy : mussolini :: B : franco
B : mexico :: portugal : C
A : C :: herself : D
goober : D :: E : route
D : E :: F : environmentalists
copper : F :: (G : help) : saint
G : freckle :: (D : E) : (A : H)
B : H :: I : (C : (A : F))
(I : G) : (D : F) :: (C : H) : (E : J)
J + I = _____`;

export const partialSolutions: Record<string, string> = {};

export const tasks: Record<string, JSX.Element> = {};
