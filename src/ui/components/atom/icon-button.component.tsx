import cx from "classnames";
import React from "react";
import UIcon from "./uicon.atom";

interface Props {
  icon: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  iconClass?: string;
  solid?: boolean;
  label?: String;
  hoverable?: boolean;
  size?: "xxs" | "xs" | "sm" | "base" | "lg" | "md" | "xl" | "2xl" | "3xl";
}
function IconButton({
  icon,
  onClick,
  className,
  iconClass = "",
  label,
  solid = false,
  active = false,
  hoverable,
  size = "xl",
}: Props) {
  return (
    <div
      onClick={(_) => {
        if (onClick != null) {
          onClick();
        }
      }}
      className={cx(
        `h-10 w-10 flex items-center rounded-full cursor-pointer ${className}`,
        { "hover:shadow": hoverable }
      )}
    >
      <UIcon
        icon={icon}
        className={`${iconClass}  ${active ? 'theme-text-primary' : ''}`}
        solid={solid}
        size={size}
      />
      {label && (
        <span className={cx(`text-xs ml-1 font-semibold`, {  "theme-text-primary":active })}>
          {label}
        </span>
      )}
    </div>
  );
}
export default IconButton;
