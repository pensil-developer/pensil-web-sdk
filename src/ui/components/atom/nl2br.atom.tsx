import React from "react";
import BlankLinkify from "./blank-linkify.atom";

export function NL2BR({ text = "", passTextThrough = (text:any) => text }) {
  const parsedText = text.split("\n");

  return (
    <p className="NL2BR">
      {parsedText.map((text, index) => (
        <span key={index}>
          {index !== 0 ? <br /> : <></>}
          <BlankLinkify>{passTextThrough(text)}</BlankLinkify>
        </span>
      ))}
    </p>
  );
}
