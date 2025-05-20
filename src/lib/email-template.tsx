export interface HintEmailTemplateProps {
  teamDisplayName: string;
  puzzleId: string;
  puzzleName: string;
  request: string;
  response: string;
}

export const HintEmailTemplate: React.FC<Readonly<HintEmailTemplateProps>> = ({
  teamDisplayName,
  puzzleId,
  puzzleName,
  response,
  request,
}) => (
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
      Your hint request for <strong>{puzzleName}</strong> has been answered.
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
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {request}
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
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      }}
    >
      {response}
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
  </div>
);

// TODO: ideally we make these not optional
export interface ReplyEmailTemplateProps {
  teamDisplayName?: string;
  puzzleId?: string;
  puzzleName?: string;
  message: string;
}

export const ReplyEmailTemplate: React.FC<
  Readonly<ReplyEmailTemplateProps>
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
      A new reply for <strong>{puzzleName}</strong> has been posted.
    </p>

    <p style={{ color: "#333 !important" }}>
      <strong>Reply:</strong>
    </p>
    <blockquote
      style={{
        margin: "10px 0",
        padding: "10px",
        borderLeft: "4px solid #ccc",
        background: "#f9f9f9",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
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
