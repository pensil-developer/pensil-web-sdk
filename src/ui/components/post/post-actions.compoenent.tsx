import React, { useState } from "react";
import { PensilService } from "../../../services";
import { PostModel } from "../../../types/post.type";
import IconButton from "../atom/icon-button.component";
import Loader from "../atom/loader.atom";

interface PostActionsProps {
  service: PensilService;
  children?: any;
  communityId?: string;
  groupId: string;
  sectionId: string;
  post: PostModel;
  areCommentsLoading: boolean;
  deletePost: (post: PostModel) => void;
  updatePost: (post: PostModel) => void;
  setCommentsLoading: (isLoading: boolean) => void;
}
/**
 * Post Actions
 * @param {*} param0
 * @returns
 */
export default function PostActions({
  post,
  updatePost,
  service,
  areCommentsLoading = false,
}: PostActionsProps) {
  const [inProgress, setInProgress] = useState(false);

  return (
    <div className="PostActions flex justify-between items-center text-xs border-t theme-border-default">
      {/* left options */}
      <div className="flex justify-start items-center">
        <IconButton
          icon={"thumbs-up"}
          className="w-40"
          active={post.isLikedByMe}
          label={
            post.likes > 0
              ? post.likes === 1
                ? "1 Upvote"
                : post.likes + " Upvotes"
              : "Upvote"
          }
          //   active={post.isLikedByMe}
          onClick={() => {
            // if already loading, do nothing
            if (inProgress) {
              return;
            }
            // if user not logged in redirect to login screen
            // if (!user) {
            //   //   return addToast(
            //   //     "You need to login to enable interaction!",
            //   //     "",
            //   //     ToastTypes.info
            //   //   );
            // }
            // if post is liked by me, unlike it, else, like it
            if (post.isLikedByMe) {
              // dislike the post
              setInProgress(true); // setLoading
              service.services.post
                .dislikePost(post.id)
                .then((response) => {
                  // update the post
                  updatePost(response.post);
                })
                .catch((error) => {
                  console.log("Error in liking post", error);
                })
                .finally(() => {
                  setInProgress(false);
                });
            } else {
              setInProgress(true); // setLoading
              service.services.post
                .likePost(post.id)
                .then((response) => {
                  // update the post
                  updatePost(response.post);
                })
                .catch((error) => {
                  console.log("Error in liking post", error);
                })
                .finally(() => {
                  setInProgress(false);
                });
            }
          }}
        />
        {areCommentsLoading ? (
          <Loader />
        ) : (
          <IconButton
            icon="comment"
            className="w-40"
            label={
              post.commentCount > 0
                ? post.commentCount === 1
                  ? "1 Comment"
                  : post.commentCount + " Comments"
                : "Comment"
            }
            onClick={() => {
              // if user not logged in redirect to login screen
              //   if (!user) {
              //     return addToast(
              //       "You need to login to enable interaction!",
              //       "",
              //       ToastTypes.info
              //     );
              //   }
              //   // get post comments if not already loaded
              //   if (!post.comments && !areCommentsLoading) {
              //     // load comments
              //     setCommentsLoading(true);
              //     PostService.getPostDetail(user, post.id)
              //       .then((response) => {
              //         // add the comments in post
              //         updatePost(response.post);
              //         setCommentsLoading(false);
              //       })
              //       .catch((err) => {
              //         console.log({ err });
              //         setCommentsLoading(false);
              //       });
              //   }
            }}
          />
        )}
      </div>
      {/* right options */}
      <div className="flex">
        {/* <IconButton icon="share" className="mx-4" /> */}
      </div>
    </div>
  );
}
