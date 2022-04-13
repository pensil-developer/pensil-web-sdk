// import cx from "classNames";
import React from "react";

interface AvatarProps {
  name?: string;
  picture?: string;
  size?: number;
  className?: string;
  noPicture?: boolean;
  noName?: boolean;
  subCommentAvatar?: boolean;
  bold?: boolean;
  extraInfo?: string;
  onClick?: () => void;
}

export function Avatar({
  name,
  picture,
  size = 36,
  className,
  noPicture = false,
  subCommentAvatar = false,
  noName = false,
  bold = true,
  extraInfo,
  onClick,
}: AvatarProps) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <div
        onClick={onClick}
        onMouseEnter={(_) => {
          // check if have to show details on hover
        }}
        onMouseLeave={(_) => {
          // check if have to show details on hover
        }}
        className={`Avatar flex ${
          !noPicture ? "items-center" : ""
        } justify-between`}
      >
        <div className={`flex ${!noPicture ? "items-center" : ""}`}>
          {!noPicture ? (
            <div
              style={{
                backgroundImage: "url('" + picture + "')",
                width: size + "px",
                height: size + "px",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: "50%",
                marginRight: "12px",
                flexShrink: 0,
              }}
            ></div>
          ) : (
            <></>
          )}

          <div>
            <div className="flex items-center">
              {!noName ? (
                <div
                  className={
                    "name text-sm " + (bold ? "font-bold" : "font-semibold")
                  }
                >
                  {name}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div
              className={
                subCommentAvatar
                  ? "font-normal extra-info theme-text-subtitle-2"
                  : "text-xs font-semibold extra-info theme-text-subtitle-2"
              }
            >
              {extraInfo}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


