import moment from "moment";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import { PensilService } from "../../../../services";
import { CreatedBy, PostModel, Reply } from "../../../../types/post.type";
import { Avatar } from "../../atom/avatar.atom";
import IconButton from "../../atom/icon-button.component";
import IconMenu, { ActionType } from "../../atom/icon-menu.atom";
import Loader from "../../atom/loader.atom";
import UIcon from "../../atom/uicon.atom";
import CreateComment from "./create-comment.component";
import { Remarkable } from "remarkable";
import PostDocument from "../post-documents.component";
import { PostImage } from "../post-images.component";
import EmojiPicker from "../../form-control/emoji-picker.component";
import PostSubComment from "./post-sub-comments.component";

const md = new Remarkable();

interface PostCommentProps {
  postId: string;
  post: PostModel;
  comment: PostModel | undefined;
  user: CreatedBy;
  service: PensilService;
  isSubComment: boolean;
  commentId?: String;
  community: any;
  updatePost: (post: PostModel) => void;
  updateComment: (post: PostModel) => void;
}

/**
 * Component to show a post comment
 * @param {*} param0
 * @returns
 */
export default function PostComment({
  post,
  user,
  //   group,
  service,
  comment,
  postId,
  updatePost,
  updateComment,
}: PostCommentProps) {
  if (comment === undefined) {
    return <></>;
  }
  const imageFormat = ["png", "jpg", "jpeg", "gif"];

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [subCommentView, setSubCommentView] = useState<boolean>(false);
  const [commentRepliesArr, setCommentRepliesArr] = useState<Reply[]>([]);

  const [commentImageToBePreviewed, setCommentImageToBePreviewed] = useState<
    string | null
  >("");

  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedEmoji, _] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCommentRepliesArr(comment.replies ? comment.replies : []);
  }, [comment.replies]);

  const showSubComment = () => {
    setSubCommentView(!subCommentView);
  };

  const onCommentUpdate = (commentReply: any) => {
    let newSubCommentArr = [...commentRepliesArr, commentReply];
    setCommentRepliesArr(newSubCommentArr);
    console.log("Replies", newSubCommentArr);
    setSubCommentView(true);
  };

  // handle react to comment
  const handleReactToComment = (emoji: any) => {
    service.services.post
      .addCommentReaction(postId, comment.id, emoji.id)

      .then(({ comment }) => {
        // update comment
        updateComment(comment);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  // handle react to comment
  const handleRemoveReactToComment = () => {
    service.services.post
      .removeCommentReaction(postId, comment.id)
      .then(({ comment }) => {
        // update comment
        updateComment(comment);
      })
      .catch((err: any) => {
        console.log({ err });
      });
  };

  const onSubCommentDelete = (commentReply: any) => {
    let updatedSubCommentArr = commentRepliesArr.filter(
      (re) => re.id !== commentReply.id
    );
    setCommentRepliesArr(updatedSubCommentArr);
  };

  useEffect(() => {
    const cb = (e: any) => {
      setCommentImageToBePreviewed(e.target.src);
    };

    document
      .querySelectorAll("#PostComment PostImages PostImage img")
      .forEach((img) => {
        img.addEventListener("click", cb);
      });

    return () => {
      document
        .querySelectorAll("#PostComment PostImages PostImage img")
        .forEach((img) => {
          img.removeEventListener("click", cb);
        });
    };
  }, [post]);

  const sample = moment
    .duration(moment(new Date()).diff(moment(comment.createdAt)))
    .asDays();

  return (
    <>
      {commentImageToBePreviewed &&
      imageFormat.includes(commentImageToBePreviewed.split(".").pop() ?? "") ? (
        <div
          className="PostImageFullPreview"
          onClick={(_) => {
            setCommentImageToBePreviewed(null);
          }}
        >
          <div className="holder">
            <img src={commentImageToBePreviewed} alt="Preview" />
            <IconButton
              icon="plus"
              className="close-button"
              onClick={() => {
                setCommentImageToBePreviewed(null);
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex">
        <div className="mt-3">
          <div className="cursor-pointer">
            <Avatar
              name={comment.createdBy.name}
              picture={comment.createdBy.picture}
              noName
              onClick={() => {
                // window.open(
                //   createUserWallPageRoute(comment.createdBy.id, "activity")
                // );
              }}
            />
          </div>
          {subCommentView ? (
            <div className="border-l-2 theme-border-default ml-4 mt-3 avatar-thread-border"></div>
          ) : (
            <></>
          )}
        </div>
        <div
          key={comment.id}
          id={"PostComment"}
          className="PostComment w-full my-2 pl-3 pt-1 rounded theme-bg-default"
        >
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <Avatar
                name={comment.createdBy.name}
                picture={comment.createdBy.picture}
                extraInfo={
                  sample < 1
                    ? moment(comment.createdAt).fromNow()
                    : moment(comment.createdAt).format("DD MMM YYYY")
                }
                noPicture
                size={36}
                className="cursor-pointer"
                onClick={() => {
                  //   window.open(
                  //     createUserWallPageRoute(comment.createdBy.id, "activity")
                  //   );
                }}
              />
            </div>
            <IconMenu
              icon="menu-dots"
              actions={[
                {
                  icon: "trash",
                  label:
                    (user &&
                      comment.createdBy &&
                      comment.createdBy.id === user.id) ||
                    post.canDeleteComment
                      ? "Delete"
                      : "",
                  onClick: () => {
                    setIsProcessing(true);
                    service.services.post
                      .deleteComment(postId, comment.id)
                      .then((response) => {
                        updatePost(response.post);
                      })
                      .catch((error) => {
                        console.error(error);
                      })
                      .finally(() => {
                        setIsProcessing(false);
                      });
                  },
                  actionType: ActionType.alert,
                },
              ]}
              hideOnEmpty
              dropdownClassName={""}
            />
          </div>
          <div className="py-1 text-sm font-light">
            <div
              className="NL2BR"
              dangerouslySetInnerHTML={{
                __html: md.render(comment.description),
              }}
            />
          </div>
          <div className="PostImages">
            {comment.images && comment.images.length > 0 ? (
              <PostImage
                image={comment.images[0]}
                className="object-cover object-center"
              />
            ) : (
              <></>
            )}
            <PostDocument post={comment} smallMargin />
          </div>
          <div className="flex justify-between items-center my-2 pb-1.5 pr-2">
            {/* left side icons */}
            <div className="flex items-center space-x-1.5">
              <div onClick={showSubComment}>
                {user ? (
                  <div className="flex p-0.5 pl-2 pr-2 rounded theme-bg-disable items-center cursor-pointer">
                    <UIcon icon="undo" />
                    <span className="text-xs font-light pl-1">Reply</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* emoji picker */}
              <EmojiPicker
                emoji={selectedEmoji}
                hidePlaceholder={true}
                setEmoji={(emoji: any) => {
                  // set emoji
                  handleReactToComment(emoji);
                  // hide picker
                  setIsEmojiPickerVisible(false);
                }}
                visible={isEmojiPickerVisible}
                setVisible={setIsEmojiPickerVisible}
              />
              {/* emoji icon */}
              {/* <IconButton large hoverable={false} icon={emojiIcon} onClick={() => {
                                  setIsEmojiPickerVisible(!isEmojiPickerVisible);
                              }} className="p-0" /> */}
              <span
                className="cursor-pointer"
                onClick={() => {
                  setIsEmojiPickerVisible(!isEmojiPickerVisible);
                }}
              >
                <UIcon icon="grin-alt" className="theme-text-subtitle-2" />
              </span>
              {/* reactions list */}
              {comment.reactions != undefined &&
                comment.reactions.details &&
                comment.reactions.details.map((reaction, index) => (
                  <div
                    key={reaction.emoji + reaction.count + index}
                    className={cx(
                      "flex items-center py-0.5 px-1 text-xs font-light rounded cursor-pointer mr-2",
                      {
                        "theme-bg-primary theme-text-on-primary":
                          reaction.isByMe,
                        "theme-bg-disable": !reaction.isByMe,
                      }
                    )}
                    onClick={(_) => {
                      // set reaction as this emoji
                      if (reaction.isByMe) {
                        handleRemoveReactToComment();
                      } else {
                        handleReactToComment(reaction.emoji);
                      }
                      // hit like api
                    }}
                    title={
                      "Reacted by " +
                      reaction.users
                        .map((user: CreatedBy) => user.name)
                        .join(", ")
                    }
                  >
                    <span className="pr-1">{reaction.emoji}</span>
                    <span className="pl-1">{reaction.count}</span>
                  </div>
                ))}
            </div>
            {commentRepliesArr && commentRepliesArr.length > 0 ? (
              <div onClick={showSubComment} className="mr-2">
                <span className="p-0.5 pl-2.5 pr-2.5 rounded text-xs theme-bg-disable font-light cursor-pointer">
                  {`${commentRepliesArr.length} ${
                    commentRepliesArr.length > 1 ? "Replies" : "Reply"
                  }`}
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          {subCommentView ? (
            <>
              <div
                className={
                  commentRepliesArr.length > 0
                    ? "mr-2 rounded "
                    : "mr-2 pb-2 rounded "
                }
              >
                {commentRepliesArr.length > 0 ? (
                  commentRepliesArr.map((reply, index) => (
                    <PostSubComment
                      post={post}
                      //   group={group}
                      //   user={user}
                      postId={post.id}
                      commentRepliesArr={commentRepliesArr}
                      comment={comment}
                      reply={reply}
                      index={index}
                      key={reply.id}
                      deleteSubComment={onSubCommentDelete}
                      updateComment={updateComment}
                      user={user}
                      service={service}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
          {subCommentView ? (
            <div className="mr-4 pb-3">
              {!subCommentView ? (
                <div className="border-t theme-border-default mr-2 mt-4"></div>
              ) : (
                <></>
              )}
              <div className="my-1">
                <CreateComment
                  post={post}
                  user={user}
                  updatePost={onCommentUpdate}
                  commentId={comment.id}
                  isSubComment
                  service={service}
                  community={undefined}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
          {isProcessing ? (
            <div className="processing">
              <Loader />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
