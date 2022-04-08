import React from "react";

const loaderStyle = {
  // position: "fixed",
  // zIndex: 100,
  // left: 0,
  // right: 0,
  // bottom: 0,
  // backgroundColor: "white",
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
  // top: 0
  padding: "2px",
};

export default function Loader({ white = false }) {
  return (
    <div className="flex Loader justify-center" style={loaderStyle}>
      <div
        className="spinner"
        style={{
          content: " ",
          display: "block",
          background: 0,
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          margin: 0,
          boxSizing: "border-box",
          border: "2px solid #fff",
          borderColor: !white
            ? "#3B82F6 transparent #3B82F6 transparent"
            : "white transparent white transparent",
        }}
      ></div>
    </div>
  );
}
