import React from "react";
import { PostModel } from "../../../types/post.type";

interface PostVideosProps {
  post: PostModel;
}
export default function PostVideo({ post }: PostVideosProps) {
  return post.videos && post.videos.length > 0 ? (
    <div className="my-4 text-yellow-600 text-sm">
      {post.videos.map((video, index) => (
        <div key={index} className="w-full h-64 mb-2">
          <video
            src={video}
            key={index}
            controls
            controlsList="nodownload"
            className="w-full h-full object-cover"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          />
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
}
