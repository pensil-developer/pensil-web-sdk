import React from "react";
import cx from "classnames";
import Loader from "./loader.atom";

export const ButtonType = Object.freeze({
    warning: "warning",
    alert: "alert",
    primary: "primary",
  });
function Button({
  label = "Submit",
  disabled = false,
  isLoading = false,
  outlined = false,
  large = false,
  className = "",
  flat = false,
  btnColor = "",
  onClick = (_: any) => {},
}) {
  if (isLoading) {
    return <Loader />;
  }

  let defaultState =
    "theme-bg-primary theme-border-primary theme-text-on-primary";
  if (flat) {
    defaultState =
      "theme-border-default theme-text-primary hover:theme-border-primary";
  }
  if (btnColor === "red") {
    defaultState = "bg-pensil-red border-pensil-red theme-text-on-primary";
  }
  if (btnColor === "green") {
    defaultState = "bg-green-500 border-green-500 theme-text-on-primary";
  }

  return (
    <button
      disabled={disabled}
      className={cx("focus:outline-none border-2 font-semibold " + className, {
        "theme-text-primary theme-border-primary cursor-not-allowed":
          disabled && outlined,
        "theme-text-primary theme-border-primary": !disabled && outlined,
        "theme-bg-disable theme-border-default theme-text-on-primary cursor-not-allowed":
          disabled && !outlined,
        [defaultState]: !disabled && !outlined,
        "py-1 px-3 rounded": !large,
        "py-2 px-6 rounded": large,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export { Button };
