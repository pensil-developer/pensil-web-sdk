import React from "react";
import cx from "classnames";
import { PostModel } from "../../../types/post.type";
import UIcon from "../atom/uicon.atom";

interface PostDocumentProps {
  post: PostModel;
  smallMargin?: boolean;
}

/**
 * Show post document if necessary
 * @param {*} param0
 * @returns
 */
export default function PostDocument({
  post,
  smallMargin = false,
}: PostDocumentProps) {
  const videoFormat = ["mp4", "mov", "webm", "ogg"];
  return post.document &&
    videoFormat.includes(post.document.split(".").pop() ?? '') ? (
    <div
      className={cx("relative", {
        "my-8": !smallMargin,
        "my-2": smallMargin,
      })}
    >
      <div className="py-1 mt-2 mr-3">
        <video className="m-0 rounded-md" controls>
          <source src={post.document} />
        </video>
      </div>
    </div>
  ) : post.document ? (
    <div
      className={cx("relative", {
        "my-8": !smallMargin,
        "my-2": smallMargin,
      })}
    >
      <a
        download
        target="_blank"
        rel="noreferrer"
        href={post.document}
        title="Open file"
        className="flex items-center space-x-2 border-2 theme-border-default rounded px-4 font-semibold py-2"
      >
        <UIcon icon="document" className="text-3xl h-9" />
        <div className="flex items-center justify-between flex-grow space-x-4">
          <div className="items-center ">
            <div>{post.documentName ? post.documentName : post.document}</div>
            <div className="uppercase text-xs">
              {(post.documentName ? post.documentName : post.document)
                .split(".")
                .pop()}
            </div>
          </div>
          <span className="flex-none">
            <UIcon icon="download" className="text-xl" />
          </span>
        </div>
      </a>
    </div>
  ) : (
    <></>
  );
}
