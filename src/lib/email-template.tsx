import { HintWithRelations } from "~/app/(admin)/admin/hints/components/hint-table/Columns";

export interface HintEmailTemplateProps {
  hint: HintWithRelations;
  response: string;
}

export const HintEmailTemplate: React.FC<Readonly<HintEmailTemplateProps>> = ({
  hint,
  response,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      color: "#333 !important",
    }}
  >
    <p style={{ marginTop: "0", color: "#333 !important" }}>
      Hi {hint.team.displayName},
    </p>

    <p style={{ color: "#333 !important" }}>
      Your hint request for <strong>{hint.puzzle.name}</strong> has been
      answered.
    </p>

    <p style={{ color: "#333 !important" }}>
      <strong>Request:</strong>
    </p>
    <blockquote
      style={{
        margin: "10px 0",
        padding: "10px",
        borderLeft: "4px solid #ccc",
        background: "#f9f9f9",
      }}
    >
      {hint.request}
    </blockquote>

    <p style={{ color: "#333 !important" }}>
      <strong>Response:</strong>
    </p>
    <blockquote
      style={{
        margin: "10px 0",
        padding: "10px",
        borderLeft: "4px solid #4caf50",
        background: "#f1f8e9",
      }}
    >
      {response}
    </blockquote>

    <p style={{ color: "#333 !important" }}>
      You can view it at{" "}
      <a
        href={`https://www.brownpuzzlehunt.com/puzzle/${hint.puzzleId}/hint`}
        style={{ color: "#1a73e8", textDecoration: "none", fontWeight: "bold" }}
      >
        https://www.brownpuzzlehunt.com/puzzle/{hint.puzzleId}/hint
      </a>
      .
    </p>

    <p style={{ marginBottom: "0", color: "#333 !important" }}>
      Happy hunting,
      <br />
      Puzzle HQ
    </p>
  </div>
);

// TODO: ideally we make these not optional
export interface FollowUpEmailTemplateProps {
  teamDisplayName?: string;
  puzzleId?: string;
  puzzleName?: string;
  message: string;
}

export const FollowUpEmailTemplate: React.FC<
  Readonly<FollowUpEmailTemplateProps>
> = ({ teamDisplayName, puzzleId, puzzleName, message }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      color: "#333 !important",
    }}
  >
    <p style={{ marginTop: "0", color: "#333 !important" }}>
      Hi {teamDisplayName},
    </p>

    <p style={{ color: "#333 !important" }}>
      A new follow-up for <strong>{puzzleName}</strong> has been posted.
    </p>

    <p style={{ color: "#333 !important" }}>
      <strong>Follow-Up:</strong>
    </p>
    <blockquote
      style={{
        margin: "10px 0",
        padding: "10px",
        borderLeft: "4px solid #ccc",
        background: "#f9f9f9",
      }}
    >
      {message}
    </blockquote>

    <p style={{ color: "#333 !important" }}>
      You can view it at{" "}
      <a
        href={`https://www.brownpuzzlehunt.com/puzzle/${puzzleId}/hint`}
        style={{ color: "#1a73e8", textDecoration: "none", fontWeight: "bold" }}
      >
        https://www.brownpuzzlehunt.com/puzzle/{puzzleId}/hint
      </a>
      .
    </p>

    <p style={{ marginBottom: "0", color: "#333 !important" }}>
      Happy hunting,
      <br />
      Puzzle HQ
    </p>
    {/* TODO: alternate placing and not placing invisible character to prevent gmail from clipping email */}
  </div>
);

export interface ErratumEmailTemplateProps {
  puzzleId: string;
  puzzleName: string;
  erratum: string;
}

export const ErratumEmailTemplate: React.FC<
  Readonly<ErratumEmailTemplateProps>
> = ({ puzzleId, puzzleName, erratum }) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      fontSize: "14px",
      color: "#333 !important",
    }}
  >
    <p style={{ marginTop: "0", color: "#333 !important" }}>
      An erratum for <strong>{puzzleName}</strong> has been posted.
    </p>

    <p style={{ color: "#333 !important" }}>
      <strong>Erratum:</strong>
    </p>
    <blockquote
      style={{
        margin: "10px 0",
        padding: "10px",
        borderLeft: "4px solid #f44336",
        background: "#ffebee",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {erratum}
    </blockquote>

    <p style={{ color: "#333 !important" }}>
      You can view it at{" "}
      <a
        href={`https://www.brownpuzzlehunt.com/puzzle/${puzzleId}`}
        style={{ color: "#1a73e8", textDecoration: "none", fontWeight: "bold" }}
      >
        https://www.brownpuzzlehunt.com/puzzle/{puzzleId}
      </a>
      .
    </p>

    <p style={{ marginBottom: "0", color: "#333 !important" }}>
      Happy hunting,
      <br />
      Puzzle HQ
    </p>
  </div>
);
