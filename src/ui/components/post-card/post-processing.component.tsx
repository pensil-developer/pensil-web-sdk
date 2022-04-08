import React from "react";
import Loader from "../atom/loader.atom";

/**
 * Show post is processing
 * @param {*} isProcessing
 * @returns
 */
export default function PostProcessing({isProcessing = false}) {
  if (!isProcessing) return <></>;

  return (
    <div className="PostProcessing">
      <Loader />
    </div>
  );
}
