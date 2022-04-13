import React, { useEffect, useState } from "react";
import { Reply } from "../../../../types/post.type";
import IconButton from "../../atom/icon-button.component";
import UIcon from "../../atom/uicon.atom";

interface PostSubCommentDocumentPreviewProps {
  reply: Reply;
  activityType?: string;
  isActivity?: boolean;
}
/**
 * Component to show a post comment
 * @param {*} param0
 * @returns
 */
export function PostSubCommentDocumentPreview({
  reply,
  activityType = "",
  isActivity = false,
}: PostSubCommentDocumentPreviewProps) {
  const [subcommentImageToBePreviewed, setSubcommentImageToBePreviewed] =
    useState<string|null>(null);

  const videoFormat = ["mp4", "mov", "webm", "ogg"];
  const imageFormat = ["png", "jpg", "jpeg", "gif"];

  const [fileType, setFileType] = useState("");

  useEffect(() => {
    if (activityType == "" || activityType == "comment-reply") {
      setFileType(
        reply.documents.length > 0
          ? reply.documents[0].location.split(".").pop() ?? ''
          : ""
      );
    } else if (reply.images && reply.images.length > 0) {
      setFileType(reply.images[0].split(".").pop() ?? '');
    } 
    // else if (reply.document && reply.document !== "") {
    //   setFileType(reply.document.split(".").pop());
    // }
  }, []);

  return (
    <>
      {subcommentImageToBePreviewed &&
      imageFormat.includes(subcommentImageToBePreviewed.split(".").pop() ?? '') ? (
        <div
          className="PostImageFullPreview"
          onClick={(_) => {
            setSubcommentImageToBePreviewed(null);
          }}
        >
          <div className="holder">
            <img src={subcommentImageToBePreviewed} alt="Preview" />
            <IconButton
              icon="plus"
              className="close-button"
              onClick={() => {
                setSubcommentImageToBePreviewed(null);
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {
        // Post preview and activity comment-reply preview
        activityType == "" || activityType == "comment-reply" ? (
          <div
            key={reply.id}
            className="PostComment m-auto mt-2"
            style={{ backgroundColor: !isActivity ? "#F6F9FB" : "" }}
          >
            {videoFormat.includes(fileType) && reply.documents.length > 0 ? (
              <div className="py-1 pl-12 mt-2 pr-4">
                <video
                  className="m-0 rounded-md h-64 w-full object-cover"
                  controls
                >
                  <source src={reply.documents[0].location} />
                </video>
              </div>
            ) : imageFormat.includes(fileType) && reply.documents.length > 0 ? (
              <div className="PostImage w-full pl-12 pr-2 relative">
                <img
                  onClick={(e: any) => setSubcommentImageToBePreviewed(e.target.src)}
                  alt=""
                  className="rounded-md h-60 w-full object-cover object-center "
                  src={reply.documents[0].location}
                />
              </div>
            ) : reply.documents.length > 0 ? (
              <div className="relative m-2 ml-12">
                <a
                  download
                  target="_blank"
                  rel="noreferrer"
                  href={
                    reply.documents.length > 0 && !isActivity
                      ? reply.documents[0].location
                      : ""
                  }
                  title="Open file"
                  className="flex items-center space-x-2 border-2 theme-border-default rounded px-4 font-semibold py-2 "
                >
                  <UIcon icon="document" className="text-3xl h-9" />
                  <div className="flex items-center justify-between flex-grow space-x-4">
                    <div className="items-center ">
                      <div>
                        {reply.documents.length > 0
                          ? reply.documents[0].name
                          : ""}
                      </div>
                      <div className="uppercase text-xs">
                        {reply.documents.length > 0
                          ? reply.documents[0].name.split(".").pop()
                          : ""}
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
            )}
          </div>
        ) : (
          // for post-comment
          <div key={reply.id} className="PostComment m-auto mt-2">
            {reply.images.length > 0 && imageFormat.includes(fileType) ? (
              <div className="PostImage w-full pl-12 pr-2 relative">
                <img
                  className="rounded-md w-full h-60 object-cover object-center"
                  src={reply.images[0]}
                  alt=""
                />
              </div>
            ) : reply.documents && videoFormat.includes(fileType) ? (
              <div className="py-1 pl-12 mt-2 pr-4">
                <video
                  className="m-0 rounded-md h-64 w-full object-cover "
                  controls
                >
                  <source src={reply.documents[0].location} />
                </video>
              </div>
            ) : reply.documents[0] && reply.documents[0].location !== "" ? (
              <div className="relative m-2 ml-12">
                <a
                  download
                  target="_blank"
                  rel="noreferrer"
                  href="#"
                  title="Open file"
                  className="flex items-center space-x-2 border-2 theme-border-default rounded px-4 font-semibold py-2 "
                >
                  <UIcon icon="document" className="text-3xl h-9" />
                  <div className="flex items-center justify-between flex-grow space-x-4">
                    <div className="items-center ">
                      <div>
                        {reply.documents[0].name !== "" ? reply.documents[0].name : ""}
                      </div>
                      <div className="uppercase text-xs">
                        {reply.documents[0].name && reply.documents[0].name !== ""
                          ? reply.documents[0].name.split(".").pop()
                          : ""}
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
            )}
          </div>
        )
      }
    </>
  );
}
