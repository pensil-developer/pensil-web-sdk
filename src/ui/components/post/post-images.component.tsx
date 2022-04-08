import React from "react";
import { PostModel } from "../../../types/post.type";

interface PostImagesProps {
    post: PostModel;
}
/**
 * Show all the post images
 * @param {*} param0
 * @returns
 */
 export default function PostImages({ post }:PostImagesProps) {
    // 0 images
    if (!Array.isArray(post.images) || post.images.length < 1) {
      return null;
    }
  
    // 1 image
    if (post.images.length === 1) {
      return (
        <div className="PostImages flex align-center justify-center my-4">
          <PostImage
            image={post.images[0]}
            className="w-full h-52 object-contain object-center"
          />
        </div>
      );
    }
    // 2 images
    if (post.images.length === 2) {
      return (
        <div className="PostImages flex justify-between my-4">
          {post.images.map((image) => (
            <PostImage
              key={image}
              image={image}
              className="w-full h-52 object-cover object-center"
            />
          ))}
        </div>
      );
    }
    // 3 images
    if (post.images.length === 3) {
      return (
        <div className="PostImages my-4 ">
          <PostImage
            className="w-full h-full object-cover object-center flex justify-center"
            image={post.images[0]}
          />
          <div className="flex mt-2">
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[1]}
            />
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[2]}
            />
          </div>
        </div>
      );
    }
    // 4 images
    if (post.images.length === 4) {
      return (
        <div className="PostImages my-4 ">
          <PostImage
            className="w-full h-full object-cover object-center flex justify-center"
            image={post.images[0]}
          />
          <div className="flex mt-2">
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[1]}
            />
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[2]}
            />
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[3]}
            />
          </div>
        </div>
      );
    }
  
    // 5 or more than 5 images (right now showing 5 images only)
    if (post.images.length >= 5) {
      // n images
      return (
        <div className="PostImages my-4 ">
          <div className="flex">
            <PostImage
              className="w-full h-full object-cover object-center flex justify-center"
              image={post.images[0]}
            />
            <PostImage
              className="w-full h-full object-cover object-center"
              image={post.images[1]}
            />
          </div>
          <div className="flex  mt-2">
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[2]}
            />
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[3]}
            />
            <PostImage
              className="w-full h-52 object-cover object-center"
              image={post.images[4]}
              more={post.images.length - 5}
            />
          </div>
        </div>
      );
    }
    
    return <></>;
}

interface PostImageProps{
    image: string;
    more?: number;
    className?: string;
}

function PostImage({ image, more = 0, className = "" }:PostImageProps) {
    return (
      <div className={"PostImage p-1 relative h-64"}>
        {more > 0 ? (
          <div className="more rounded-md h-full">
            <span>+{more}</span>
          </div>
        ) : (
          <></>
        )}
        <img
          src={image}
          className={"h-full w-full " + className}
          alt="PostImage"
        />
      </div>
    );
  }



  