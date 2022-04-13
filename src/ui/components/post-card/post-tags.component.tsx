import React from "react";
import { CreatedBy, PostModel } from "../../../types";

interface PostTagsProps {
    post: PostModel;
    user?:CreatedBy;
}

/**
 * Post tags
 * @param {*} param0
 * @returns
 */
 export default function PostTags({ post }:PostTagsProps) {
    let { tags } = post;
  
    if (tags.length === 0) return <></>;
  
    return (
      <div className="tags-container items-center">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex ml-2 border theme-border-default theme-bg-disable hover:theme-bg-primary-light tag-body cursor-pointer  text-xs"
            onClick={(_) => {
            //   history.push(showTagPageRoute(tag));
            }}>
            <span className="tag-title">
              {tag.length > 30 ? tag.substr(0, 30) + "..." : tag}
            </span>
          </div>
        ))}
      </div>
    );
  }