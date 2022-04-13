import cx from "classnames";
import React, { useEffect, useState } from "react";
import UIcon from "./uicon.atom";

export const ActionType = Object.freeze({
  default: "default",
  primary: "primary",
  alert: "alert",
});

interface Props {
  icon: string;
  onClick?: (e: any) => {};
  className?: string;
  dropdownClassName?: string;
  actions: Array<any>;
  hideOnEmpty: boolean;
}

function IconMenu({
  onClick,
  className,
  hideOnEmpty,
  actions,
  dropdownClassName,
}: Props) {
  const [active, setActive] = useState<Boolean>(false);

  const itemList = actions.filter((i) => i.label);

  useEffect(() => {
    if ((itemList.length === 0 && hideOnEmpty) || !active) {
      return;
    }

    const closeMenuListener = async (_: any) => {
      setActive(false);
    };

    window.document.body.addEventListener("click", closeMenuListener);

    return () => {
      window.document.body.removeEventListener("click", closeMenuListener);
    };
  }, [itemList.length, hideOnEmpty, active]);

  // Hide if there is not item in list
  if (itemList.length === 0 && hideOnEmpty) {
    return <></>;
  }

  return (
    <div
      className={cx("IconMenu", {
        active,
      })}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick != null) {
          onClick(e);
        }
      }}
    >
      <div className={"flex items-center place-content-center"}>
        <span
          className={cx({
            "cursor-not-allowed": itemList.length === 0,
          })}
          onClick={(e) => {
            e.preventDefault();
            if (itemList.length !== 0) {
              setActive(!active);
            }
          }}
        >
          <UIcon
            icon="menu-dots-vertical"
            className={cx(
              "h-10 w-10 hover:shadow flex items-center place-content-center rounded-full cursor-pointer",
              className,
              {
                "cursor-not-allowed": itemList.length === 0,
              }
            )}
          />
          {itemList.length === 0 ? (
            <div className="dropdown border theme-bg-surface theme-border-default shadow rounded py-2">
              <div className="theme-text-subtitle-2 cursor-not-allowed">
                No actions available
              </div>
            </div>
          ) : (
            <div
              className={cx(
                "dropdown border theme-bg-surface theme-border-default shadow rounded py-2 w-40 ",
                dropdownClassName
              )}
            >
              <div className="flex flex-col">
                {actions.map((action, index) => (
                  <ActionButton
                    key={index}
                    action={action}
                    setActive={setActive}
                  />
                ))}
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}
function ActionButton({ action, setActive }: { action: any; setActive: any }) {
  if (action == null || action === undefined) {
    return null;
  }
  if (
    action.label === undefined ||
    action.label === null ||
    action.label === ""
  ) {
    return null;
  }
  return (
    <button
      onClick={(e) => {
        action.onClick(e);
        setActive(false);
      }}
      className={cx(
        "p-2 px-4 theme-text-default rounded hover:theme-bg-default flex  space-x-4 items-center",
        {
          "theme-text-default": action.actionType === ActionType.default,
          "theme-text-primary": action.actionType === ActionType.primary,
          "theme-text-danger": action.actionType === ActionType.alert,
        }
      )}
    >
      <UIcon icon={action.icon} solid={action.solidIcon} />
      <p>{action.label}</p>
    </button>
  );
}

export default IconMenu;
