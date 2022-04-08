import React from "react";
import moment from "moment";
import { Avatar } from "../atom/avatar.atom";
import IconMenu, { ActionType } from "../atom/icon-menu.atom";
import { CreatedBy } from "../../../types/index";
import { PostModel } from "../../../types";
import { PensilService } from "../../../services";
interface PostHeaderProps {
  name?: string;
  picture?: string;
  user?: CreatedBy;
  post: PostModel;
  service: PensilService;
  deletePost: (post: PostModel) => void;
  setIsProcessing: (isProcessing: boolean) => void;
  updatePost: (post: PostModel) => void;
}

function PostHeader({
  name,
  picture,
  user,
  post,
  service,
  updatePost,
  deletePost,
  setIsProcessing,
}: PostHeaderProps) {
  const sample = moment
    .duration(moment(new Date()).diff(moment(post.createdAt)))
    .asDays();

  return (
    <div className="PostHeader flex justify-between items-center">
      <Avatar
        bold={false}
        className="justify-start cursor-pointer"
        name={name}
        picture={picture}
        extraInfo={
          sample < 1
            ? moment(post.createdAt).fromNow()
            : moment(post.createdAt).format("DD MMM YYYY")
        }
        size={42}
        onClick={function (): void {
          console.log("Picture log");
        }}
      />
      <div></div>
      {user && <div></div>}
      <IconMenu
        icon={""}
        className={""}
        dropdownClassName={""}
        actions={[
          {
            icon: "copy",
            label: "Copy Post url",
            onClick: () => {
              // Display model to copy post url
            },
          },
          {
            // Toggle bookmark
            icon: "bookmark",
            solidIcon: post.isBookmarkedByMe,
            label: post.isBookmarkedByMe ? "Remove Bookmark" : "Bookmark",
            onClick: () => {
              (post.isBookmarkedByMe
                ? service.services.post.removeBookmark(post.id)
                : service.services.post.bookmarkPost(post.id)
              )
                .then(() => {
                  // bookmark updated, update the post
                  updatePost({
                    ...post,
                    isBookmarkedByMe: !post.isBookmarkedByMe,
                  });
                  console.log(
                    !post.isBookmarkedByMe
                      ? "Bookmark added!"
                      : "Bookmark removed",
                    "",
                    !post.isBookmarkedByMe
                      ? "ToastTypes.success"
                      : "ToastTypes.info"
                  );
                })
                .catch((error) => {
                  console.log("Error", error);
                  alert("Failed performing action!");
                });
            },
          },
          {
            // show delete button
            icon: "trash",
            label: post.canDelete ? "Delete" : "",
            actionType: ActionType.alert,
            onClick: () => {
              setIsProcessing(true);
              service.services.post
                .deletePost(post.id)
                .then((response) => {
                  // update post
                  setIsProcessing(false);
                  deletePost(response.post);
                })
                .catch((err) => {
                  console.log("Error in deletePost", err);
                  setIsProcessing(false);
                });
            },
          },
        ]}
        hideOnEmpty={false}
        onClick={function (_: any): {} {
          throw new Error("Function not implemented.");
        }}
      ></IconMenu>
    </div>
  );
}

export { PostHeader };
