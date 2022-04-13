import React from "react";
import ReactLinkify from "react-linkify";

interface BlankLinkifyProps{
    children:Element
}

export default function BlankLinkify({ children }:BlankLinkifyProps) {
  return (
    <ReactLinkify
      componentDecorator={(decoratedHref:any, decoratedText:any, key:any) => (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={decoratedHref}
          key={key}>
          {decoratedText}
        </a>
      )}>
      {children}
    </ReactLinkify>
  );
}
