import type { Dispatch, SetStateAction } from "react";

type SetText = Dispatch<SetStateAction<Record<string, string>>>;
type SetTransfers = Dispatch<SetStateAction<Record<string, string>>>;
type SetAbsorbed = Dispatch<SetStateAction<Set<string>>>;

function absorbPartnerStub(
  primaryStubSmallId: string,
  partnerSmallId: string,
  setStubTransfers: SetTransfers,
  setAbsorbedStubs: SetAbsorbed,
) {
  setStubTransfers((prev) => ({
    ...prev,
    [primaryStubSmallId]: partnerSmallId,
  }));
  setAbsorbedStubs((prev) => new Set([...prev, partnerSmallId]));
}

/**
 * When connecting a dangling stub (primary) to another chain's terminal big node
 * that has stub `partner`, apply text moves / partner absorption for disconnect restore.
 */
export function applyDanglingStubConnectMerge(
  primaryStubSmallId: string,
  primaryText: string,
  partnerStub: { smallNodeId: string; smallText: string } | undefined,
  setTextOverrides: SetText,
  setStubTransfers: SetTransfers,
  setAbsorbedStubs: SetAbsorbed,
): void {
  if (!partnerStub) return;
  const a = primaryText;
  const b = partnerStub.smallText;
  if (a === "" && b !== "") {
    setTextOverrides((prev) => ({
      ...prev,
      [primaryStubSmallId]: b,
      [partnerStub.smallNodeId]: "",
    }));
    absorbPartnerStub(
      primaryStubSmallId,
      partnerStub.smallNodeId,
      setStubTransfers,
      setAbsorbedStubs,
    );
  } else if ((a !== "" && b === "") || (a === "" && b === "")) {
    absorbPartnerStub(
      primaryStubSmallId,
      partnerStub.smallNodeId,
      setStubTransfers,
      setAbsorbedStubs,
    );
  }
}

/** Add-edge flow: target stub owns the connection; absorb the source empty stub. */
export function absorbSourceStubForTargetStubConnect(
  targetStubSmallId: string,
  sourceStubSmallId: string,
  setStubTransfers: SetTransfers,
  setAbsorbedStubs: SetAbsorbed,
): void {
  absorbPartnerStub(
    targetStubSmallId,
    sourceStubSmallId,
    setStubTransfers,
    setAbsorbedStubs,
  );
}
