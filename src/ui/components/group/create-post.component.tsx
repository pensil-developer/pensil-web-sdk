// @ts-ignore
import React, { useRef, useState } from "react";
import { PensilService } from "../../../services";
import { User } from "../../../types/user.type";
import { Avatar } from "../atom/avatar.atom";
import { Button } from "../atom/button";
import Loader from "../atom/loader.atom";
import RichTextEditor from "../form-control/rich-text-editor.component";
import Model from "../misc/modal.component";
import cx from "classnames";
import TurndownService from "turndown";
const tds = new TurndownService();

interface CreatePostContainerProps {
  service: PensilService;
  user?: User;
  addPost: (post: any) => void;
  groupId: string;
  sectionId: string;
}

export default function CreatePostContainer({
  service,
  user,
  addPost,
  sectionId,
  groupId,
}: CreatePostContainerProps) {
  //   const [active, setActive] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  // @ts-ignore
  const [errors, setErrors] = useState(null);
  // @ts-ignore
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // @ts-ignore
  const [imageUploadPercent, setImageUploadPercent] = useState(0);
  // @ts-ignore
  const [videoUploadPercent, setVideoUploadPercent] = useState(0);
  // @ts-ignore
  const [documentUploadPercent, setDocumentUploadPercent] = useState(0);

  //   const [isPosting, setIsPosting] = useState<Boolean>(false);

  // media related
  // @ts-ignore
  const [images, setImages] = useState<any[]>([]);
  // @ts-ignore
  const [document, setDocument] = useState<any>(null);

  // doc upload for sub comment
  //   const [subDocument, setSubDocument] = useState<any>([]);
  // @ts-ignore
  const [videos, setVideos] = useState<any[]>([]);

  //   const imageElement = useRef<any>();
  //   const textAreaElement = useRef<any>();

  const createPost = async () => {
    try {
      // create post
      const post = {
        title: title,
        description: tds.turndown(description),
        groupId,
        // embedCode,
        tabId: sectionId,
        // notifyUsers,
        // tags: selectedTags,
      };

      // start loading
      setIsLoading(true);
      // create post
      let createdPostResponse = await service.services.post.createPost(post);

      // add post
      addPost(createdPostResponse.post);

      // stop loading
      setIsLoading(false);

      setActive(false);

      // show toast
      //   addToast("Post added successfully!");

      // close the modal
      //   closeModal();
    } catch (error) {
      //
      setIsLoading(false);
      console.log({ error });
    }
  };

  const closeModal = (prompt = false) => {
    // if we are said to prompt and user can post, show prompt
    if (prompt && !canPost) {
      if (!window.confirm("Are you sure you want to discard current post?")) {
        return;
      }
    }

    // reset the form
    setTitle("");
    setDescription("");
    setImages([]);
    setVideos([]);
    setDocument(null);
    // reset upload percentage
    setImageUploadPercent(0);
    setVideoUploadPercent(0);
    setDocumentUploadPercent(0);
    setErrors(null);
    // set the form inactive
    setActive(false);
  };

  let rows = description.split("\n").length;
  rows = rows > 0 ? rows : 1;

  const canPost = (() => {
    // return true for disabled
    return (
      title.length === 0 &&
      description.length === 0 &&
      images.length === 0 &&
      videos.length === 0 &&
      !document
    );
  })();

  if (user == null) {
    return <></>;
  }
  return (
    <>
      <div
        onClick={(_) => {
          setActive(true);
        }}
        className="p-4 flex items-center justify-between border theme-border-default my-4 cursor-pointer select-none"
      >
        <div className="flex items-center place-content-center space-x-4">
          <Avatar picture={user.picture} />
          <h4 className="font-semibold theme-text-subtitle-1">
            Start Discussions
          </h4>
        </div>
        <Button label="Post" onClick={() => {}} />
      </div>
      {active ? (
        <Model
          setActive={(_) => closeModal(true)}
          active={active}
          children={
            <div className="p-4 rounded z-10">
              <div className="flex justify-between items-center">
                <Avatar name={user.name} picture={user.picture} />
                {/* <Button label="Post" onClick={() => {}} /> */}
                <CreatePostButton
                  createPost={createPost}
                  isLoading={isLoading}
                  active={active}
                  canPost={canPost}
                  label="Post"
                />
              </div>
              <div className="mt-2">
                <input
                  className="post-title bg-transparent font-semibold text-xl py-1 md:px-4 flex-grow focus:outline-none w-full"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  autoFocus
                  placeholder="Title (Optional)"
                  value={title}
                />
              </div>
              <div className="pt-2 pb-2">
                <RichTextEditor
                  text={description}
                  setText={setDescription}
                  placeholder="Write something..."
                  displayInnerBorder={true}
                />
              </div>
            </div>
          }
        />
      ) : (
        <></>
      )}
    </>
  );
}

const CreatePostButton = ({
  label = "",
  isLoading = false,
  canPost = false,
  createPost = () => {},
  active = false,
}) => {
  return isLoading ? (
    <div className="my-1 mx-5">
      {" "}
      <Loader />
    </div>
  ) : (
    <Button
      label={label ? label : "Post"}
      className={cx({
        "md:block hidden": !active,
      })}
      disabled={canPost}
      onClick={createPost}
    />
  );
};
