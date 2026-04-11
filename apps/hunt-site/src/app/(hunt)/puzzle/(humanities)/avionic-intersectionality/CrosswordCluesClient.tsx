"use client";
import React from "react";
import Image from "next/image";
import whalesShootImg from "./whales_shoot.png";

interface Props {
  acrossClues: string[];
  downClues: string[];
}

function renderClueText(text: string | undefined) {
  if (!text) return null;
  return text;
}

const CrosswordCluesClient: React.FC<Props> = ({ acrossClues, downClues }) => {
  return (
    <div className="grid w-full max-w-xl gap-8 text-left xl:grid-cols-2">
      <div>
        <h3 className="mb-2 font-semibold">Across</h3>
        <ul className="space-y-1 text-sm">
          {acrossClues.map((text, i) => (
            <li key={`A${i + 1}`} className="select-text">
              <span className="text-muted-foreground italic">
                {renderClueText(text)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Down</h3>
        <ul className="space-y-1 text-sm">
          {downClues.map((text, i) => (
            <li key={`D${i + 1}`} className="select-text">
              <span className="text-muted-foreground italic">
                {renderClueText(text)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrosswordCluesClient;
