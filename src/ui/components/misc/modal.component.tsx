import React from "react";

interface CreateCommunityModelPreps {
  setShowModal?: (value: boolean) => void;
  children: JSX.Element | JSX.Element[];
  width?: string;
  active?: boolean;
  setActive?: (value: boolean) => void;
}

export default function Model({
  active = false,
  children,
  width = "560px",
  setActive = (_: boolean) => {},
}: CreateCommunityModelPreps) {
  return (
    <>
      <div
        onClick={(_) => {
          if (active) {
            setActive(false);
          } else {
            setActive(true);
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            setActive(false);
          }
        }}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
      >
        {/*content*/}
        <div
          onClick={(e) => {
            // stop the card being closed when we click on inner divs
            if (active) {
              e.stopPropagation();
            }
          }}
          style={{ width: width }}
          className="px-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full theme-bg-surface  outline-none focus:outline-none"
        >
          {children}
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
