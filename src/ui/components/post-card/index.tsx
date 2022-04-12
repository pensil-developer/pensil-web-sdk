import React, { useState } from "react";
import { PensilService } from "../../../services";
import { PostModel } from "../../../types";
import PostImages from "./post-images.component";
import PostPoll from "./poll-component";
import PostDescription from "./post-description.component";
import PostDocuments from "./post-documents.component";
import PostEventInfo from "./post-event-info.component";
import { PostHeader } from "./post-header.component";
import PostTags from "./post-tags.component";
import PostVideo from "./post-videos.components";
import PostProcessing from "./post-processing.component";
import PostActions from "./post-actions.compoenent";
import CreateComment from "./comment/create-comment.component";
import PostComment from "./comment/post-comment";

interface PostCardProps {
  service: PensilService;
  children?: any;
  communityId?: string;
  groupId: string;
  sectionId: string;
  post: PostModel;
  deletePost: (post: PostModel) => void;
  updatePost: (post: PostModel) => void;
}

function PostCardComponent(props: PostCardProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const post = props.post;
  return (
    <div className="PostCard rounded shadow theme-bg-surface p-4">
      {post.event ? (
        <PostEventInfo event={post.event} user={post.createdBy} />
      ) : (
        <>
          <PostHeader
            name={post.createdBy.name}
            picture={post.createdBy.picture}
            post={post}
            service={props.service}
            updatePost={props.updatePost}
            deletePost={props.deletePost}
            setIsProcessing={setIsProcessing}
          />
          <div className="cursor-pointer font-semibold my-4 text-xl">
            {props.post.title}
          </div>
          <PostImages post={post} />
          <PostVideo post={post} />
        </>
      )}

      <PostDescription
        post={post}
        user={post.createdBy}
        showFullPost={false}
        isEvent={false}
      />
      <PostPoll
        post={post}
        updatePost={props.updatePost}
        service={props.service}
      />
      <PostDocuments post={post} />
      <PostTags post={post} user={post.createdBy} />
      <PostActions
        post={post}
        service={props.service}
        groupId={props.groupId}
        sectionId={props.sectionId}
        areCommentsLoading={false}
        deletePost={props.deletePost}
        updatePost={props.updatePost}
        setCommentsLoading={function (_: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
      <CreateComment
        post={post}
        service={props.service}
        isSubComment={false}
        commentId={undefined}
        community={undefined}
        updatePost={props.updatePost}
      />
      <PostComment
        // user={user}
        post={post}
        postId={post.id}
        comment={post.comments != undefined ? post.comments .length > 0 ? post.comments[0] : undefined : undefined}
        user={post.createdBy}
        service={props.service}
        isSubComment={false}
        community={undefined}
        updatePost={props.updatePost}
        updateComment={function (_: PostModel): void {
          throw new Error("Function not implemented.");
        }} // group={group}
        // // updatePost={updatePost}
        // // areCommentsLoading={areCommentsLoading}
        // setCommentsLoading={setAreCommentsLoading}
        // setAreCommentsLoading={setAreCommentsLoading}
      />
      <PostProcessing isProcessing={isProcessing} />
    </div>
  );
}

/**
 * Return group details
 * @param {PensilService} service
 * @param {any} children
 * @param {string} communityId
 * @param {string} groupId
 * @param {string} sectionId
 * @param {PostModel} post
 * @returns
 */
const PostCard = PostCardComponent;

export default PostCard;
