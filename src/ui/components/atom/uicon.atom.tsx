import React from "react";
interface Props {
  icon?: string;
  solid?: Boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: String;
  size?: "xxs" | "xs" | "sm" | "base" | "lg" | "md" | "xl" | "2xl" | "3xl";
}

function UIcon({ icon, className, solid = false, size }: Props) {
  return (
      <i
        className={`${
          !solid ? "fi-rr" : "fi-sr"
        }-${icon}  ${className} text-${size}`}
      />
  );
}
export default UIcon;
