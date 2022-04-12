import React, { useRef, useState } from "react";
import { PensilService } from "../../../../services";
import { CreatedBy, PostModel } from "../../../../types/post.type";
import IconButton from "../../atom/icon-button.component";
import Loader from "../../atom/loader.atom";
// @ts-ignore
import TurndownService from "turndown";
import RichTextEditor from "../../form-control/rich-text-editor.component";
import PostDocumentPreview from "../post-document-preview.component";

const tds = new TurndownService();

interface CreateCommentProps {
  post: PostModel;
  user?: CreatedBy;
  service: PensilService;
  isSubComment: boolean;
  commentId?: String;
  community: any;
  updatePost: (post: PostModel) => void;
}

/**
 * Component to create comment
 * @param {*} param0
 * @returns
 */
export default function CreateComment({
  service,
  post,
  updatePost,
  isSubComment = false,
  commentId,
}: CreateCommentProps) {
  const [description, setDescription] = useState<string>("");
  const [isPosting, setIsPosting] = useState<Boolean>(false);

  // media related
  const [images, setImages] = useState<any[]>([]);
  const [document, setDocument] = useState<any>(null);

  // doc upload for sub comment
  const [subDocument, setSubDocument] = useState<any>([]);
  const [videos, setVideos] = useState<any[]>([]);

  const imageElement = useRef<any>();
  const textAreaElement = useRef<any>();

  let rows = description.split("\n").length;
  rows = rows > 0 ? rows : 1;

  // if no user, dont show the comment box
  // if (!user) {
  //   return <></>;
  // }

  return (
    <>
      <div className="CreateComment pt-2">
        <div className="flex items-start border  theme-border-default rounded theme-bg-default">
          {/* <textarea
                type="text"
                ref={textAreaElement}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  window.setTimeout(() => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }, 0);
                }}
                className="px-4 py-2 w-full flex-grow block theme-bg-default"
                rows={rows}
                placeholder={isSubComment ? "Post Reply" : "Post Comment"}
              /> */}
          <RichTextEditor
            className="RichEditorComment w-full"
            text={description}
            setText={(val: string): void => {
              setDescription(val);
            }}
            placeholder={isSubComment ? "Post Reply" : "Post Comment"}
            showInfoText={false}
          />
          {/* for media upload */}
          <input
            type="file"
            className="hidden"
            ref={imageElement}
            onChange={(e) => {
              // check if file is image?
              if (e != null && e.target != null && e.target.files != null) {
                const file = e.target.files[0] ?? null;
                if (file) {
                  if (isSubComment) {
                    setVideos([]);
                    setImages([]);
                    setSubDocument([]);
                    if (file.type.startsWith("image")) {
                      setImages([file]);
                    } else if (file.type.startsWith("video")) {
                      setVideos([file]);
                    } else {
                      setSubDocument([file]);
                    }
                  } else {
                    setDocument(null);
                    setImages([]);
                    if (file.type.startsWith("image")) {
                      setImages([file]);
                    } else {
                      setDocument(file);
                    }
                  }
                }
              }
            }}
          />
          {/* controls */}
          <div className="flex justify-end items-center theme-bg-default">
            {isPosting ? (
              <div className="send-message m-2">
                <Loader />
              </div>
            ) : (
              <>
                <IconButton
                  icon="clip"
                  onClick={() => {
                    if (imageElement.current) imageElement.current.click();
                  }}
                />
                <IconButton
                  icon="paper-plane"
                  hoverable={false}
                  onClick={async () => {
                    // create comment
                    if (!description) {
                      return window.alert("Comment text is required!");
                    }

                    setIsPosting(true);
                    if (!isSubComment) {
                      try {
                        const embedlessComment = await description.replace(
                          /(?:<figure class="media"><oembed url=")([^"^<^>^\[^\]]+)(?:"><\/oembed><\/figure>)/g,
                          " $1 "
                        );
                        let finalComment = await tds.turndown(embedlessComment);

                        let { post: newPost, commentId } =
                          await service.services.post.addComment(post.id, {
                            description: finalComment,
                          });
                        // try uploading attachments
                        if (images.length > 0) {
                          newPost = (
                            await service.services.post.uploadImagesToComment(
                              post.id,
                              commentId,
                              images
                            )
                          ).post;
                        }

                        if (document) {
                          newPost = (
                            await service.services.post.uploadDocumentToComment(
                              post.id,
                              commentId,
                              images
                            )
                          ).post;
                        }

                        setImages([]);
                        setDocument(null);
                        setDescription("");
                        if (textAreaElement.current) {
                          window.setTimeout(() => {
                            textAreaElement.current.style.height = "auto";
                          }, 0);
                        }
                        setIsPosting(false);

                        updatePost(newPost);
                        return;
                      } catch (error) {
                        setIsPosting(false);
                      }
                    } else {
                      // create Sub Comment
                      try {
                        const embedlessSubComment = await description.replace(
                          /(?:<figure class="media"><oembed url=")([^"^<^>^\[^\]]+)(?:"><\/oembed><\/figure>)/g,
                          " $1 "
                        );
                        let finalSubComment = await tds.turndown(
                          embedlessSubComment
                        );

                        let { commentReply: commentReply } =
                          await service.services.post.addCommentReply(
                            post.id,
                            commentId!,
                            { description: finalSubComment }
                          );

                        // if document
                        if (subDocument.length > 0) {
                          commentReply = (
                            await service.services.post.uploadDocumentToCommentReply(
                              post.id,
                              commentId!,
                              commentReply.id,
                              subDocument
                            )
                          ).commentReply;
                        }
                        // if image
                        if (images.length > 0) {
                          commentReply = (
                            await service.services.post.uploadDocumentToCommentReply(
                              post.id,
                              commentId!,
                              commentReply.id,
                              images
                            )
                          ).commentReply;
                        }
                        // if video
                        if (videos.length > 0) {
                          commentReply = (
                            await service.services.post.uploadDocumentToCommentReply(
                              post.id,
                              commentId!,
                              commentReply.id,
                              videos
                            )
                          ).commentReply;
                        }

                        setDescription("");
                        setSubDocument([]);
                        setImages([]);
                        setVideos([]);
                        if (textAreaElement.current) {
                          window.setTimeout(() => {
                            textAreaElement.current.style.height = "auto";
                          }, 0);
                        }
                        setIsPosting(false);
                        console.log("Do Update comment");
                        // updatePost(commentReply, commentId);
                        return;
                      } catch (error) {
                        setIsPosting(false);
                      }
                    }
                  }}
                  className="comment-button"
                />
              </>
            )}
          </div>
        </div>
        {/* media preview */}
        {images.length > 0 ? (
          <div className="preview-image mb-2">
            <img
              className="h-40 w-full"
              src={URL.createObjectURL(images[0])}
              alt="CommentImage"
            />
            <span
              className="remove"
              onClick={(_) => {
                setImages([]);
              }}
            >
              &times;
            </span>
          </div>
        ) : (
          <></>
        )}
        {videos.length > 0 ? (
          <div className="preview-video">
            <div className="py-1 mt-2">
              <video className="m-0 w-full" controls>
                <source src={URL.createObjectURL(videos[0])} />
              </video>
            </div>
            <span
              className="remove"
              onClick={(_) => {
                setVideos([]);
              }}
            >
              &times;
            </span>
          </div>
        ) : (
          <></>
        )}
        {document &&
        ["mp4", "mov", "webm", "ogg"].includes(
          document.name.split(".").pop()
        ) ? (
          <div className="preview-video">
            <div className="py-1 mt-2">
              <video className="m-0" controls>
                <source src={URL.createObjectURL(document)} />
              </video>
            </div>
            <span
              className="remove"
              onClick={(_) => {
                setDocument(null);
              }}
            >
              &times;
            </span>
          </div>
        ) : (
          <>
            <PostDocumentPreview
              document={document}
              isSubComment={isSubComment}
              subDocument={subDocument}
              setDocument={setDocument}
              setSubDocument={setSubDocument}
            />
            <></>
          </>
        )}
      </div>
    </>
  );
}
