import moment from "moment";
import cx from "classnames";
import React, { useState } from "react";
import { PensilService } from "../../../../services";
import { CreatedBy, PostModel, Reply } from "../../../../types/post.type";
import { Avatar } from "../../atom/avatar.atom";
import IconButton from "../../atom/icon-button.component";
import IconMenu, { ActionType } from "../../atom/icon-menu.atom";
import EmojiPicker from "../../form-control/emoji-picker.component";
import { Remarkable } from "remarkable";
import Loader from "../../atom/loader.atom";
import { PostSubCommentDocumentPreview } from "./post-sub-comments.document-preview.component";

const md = new Remarkable();

interface PostSubCommentsProps {
  post: PostModel;
  user: CreatedBy;
  service: PensilService;
  comment: PostModel;
  reply: Reply;
  index: number;
  postId: string;
  commentRepliesArr: Reply[];
  deleteSubComment: (post: PostModel) => void;
  updateComment: (post: PostModel) => void;
}
/**
 * Component to show a post comment
 * @param {*} param0
 * @returns
 */
export default function PostSubComment({
  service,
  post,
  user,
  comment,
  reply,
  index,
  commentRepliesArr,
  postId,
  deleteSubComment,
  updateComment,
}: PostSubCommentsProps) {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] =
    useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState(false);

  // handle react to comment
  const handleReactToComment = (emoji: any) => {
    service.services.post
      .addCommentReplyReaction(postId, comment.id, reply.id, emoji)
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
      .removeCommentReplyReaction(postId, comment.id, reply.id)
      .then(({ comment }) => {
        // update comment
        updateComment(comment);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const sample = moment
    .duration(moment(new Date()).diff(moment(reply.createdAt)))
    .asDays();
  return (
    <>
      <div
        key={reply.id}
        className="PostComment border-t theme-border-default rounded zm-auto mt-2 pl-1 pt-1"
      >
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <Avatar
              name={reply.createdBy.name}
              extraInfo={
                sample < 1
                  ? moment(reply.createdAt).fromNow()
                  : moment(reply.createdAt).format("DD MMM YYYY")
              }
              size={36}
              className="cursor-pointer"
              subCommentAvatar
              onClick={() => {
                // open the user page
                // window.open(
                //   createUserWallPageRoute(reply.createdBy.id, "activity")
                // );
              }}
            />
          </div>
          <IconMenu
            icon="menu-dots"
            hideOnEmpty
            actions={[
              {
                label:
                  (user && reply.createdBy && reply.createdBy.id === user.id) ||
                  post.canDeleteReply
                    ? "Delete"
                    : "",
                onClick: () => {
                  setIsProcessing(true);
                  service.services.post
                    .deleteSubComment(postId, comment.id, reply.id)
                    .then((response: any) => {
                      deleteSubComment(response.commentReply);
                      setIsProcessing(false);
                    })
                    .catch(() => {
                      setIsProcessing(false);
                    });
                },
                actionType: ActionType.alert,
                icon: "trash",
              },
            ]}
          />
        </div>
        <div className="pl-12">
          <div className="py-1 text-sm font-light">
            <div
              className="NL2BR"
              dangerouslySetInnerHTML={{ __html: md.render(reply.description) }}
            />
          </div>
          <div className="PostSubCommentDocumentPreview">
            {reply.documents.length > 0 ? (
              <PostSubCommentDocumentPreview reply={reply} />
            ) : (
              <></>
            )}
          </div>
          {/* post reply reactions */}
          <div className="flex justify-between items-center">
            {/* left side icons */}
            <div className="flex items-center">
              {/* emoji icon */}
              <IconButton
                icon="grin-alt"
                size="md"
                iconClass="theme-text-subtitle-2"
                className="h-4"
                onClick={() => {
                  setIsEmojiPickerVisible(!isEmojiPickerVisible);
                }}
                //   className="p-0"
              />
              {/* emoji picker */}
              <EmojiPicker
                emoji={undefined}
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
              {/* reactions list */}
              {reply.reactions.details.map((reaction, index) => (
                <div
                  key={reaction.emoji + reaction.count + index}
                  className={cx(
                    "flex items-center py-0.5 px-1 text-xs font-light rounded cursor-pointer mr-2",
                    {
                      "theme-bg-primary theme-text-on-primary": reaction.isByMe,
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
          </div>
        </div>
        <div
          className={
            commentRepliesArr && commentRepliesArr.length - 1 === index
              ? ""
              : "ml-12 mt-2"
          }
        />
        {isProcessing ? (
          <div className="processing">
            <Loader />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
