import React,{ useState } from "react";
import { Remarkable } from "remarkable";
import cx from "classnames";
import { CreatedBy, PostModel } from "../../../types/post.type";

interface PostDescriptionProps {
    post: PostModel;
    user: CreatedBy;
    showFullPost?: boolean;
    isEvent?: boolean;
  }
  
  export default function PostDescription({
    post,
    showFullPost = false,
    isEvent = false,
  }: PostDescriptionProps) {
    const [fullView, setFullView] = useState(false);
  
    let { description } = post;
  
  
    if (!description) return <></>;
  
    const hasMore = description.split("\n").length > 9 ? true : false;
  
    const md = new Remarkable();
  
    const renderedDescription = md.render(description);
  
    let descriptionWithMentions = renderedDescription;
    try {
      descriptionWithMentions = renderedDescription.replace(
        /\B\@([\w\-]+)/gim,
        (match:any) => {
          return `<span class="theme-text-primary cursor-pointer theme-theme-bg-primary-light">${match}</span>`;
        }
      );
    } catch (error) {}
  
    const descriptionWithEmbeds = getVideoEmbedFromDescription(
      descriptionWithMentions
    );
  
    return (
      <div
        className={cx("PostDescription", {
          "has-more": hasMore && !fullView && !showFullPost,
          "my-4": !isEvent,
        })}
      >
        <div
          className="NL2BR"
          dangerouslySetInnerHTML={{ __html: descriptionWithEmbeds }}
        ></div>
        {hasMore && !fullView && !showFullPost ? (
          <span
            onClick={() => {
              setFullView(true);
            }}
            className="read-more text-sm font-bold uppercase theme-text-primary-default"
          >
            read more...
          </span>
        ) : (
          <></>
        )}
        {/* <PostYoutubeEmbedFromDescription description={post.description} /> */}
        {/* <PostVimeoEmbedFromDescription description={post.description} /> */}
      </div>
    );
  
    function getVideoEmbedFromDescription(description = "") {
      // check for youtube video // for link
      let newDescription = description.replace(
        /(<a href=")(?:(?:http:|https:)(?:\/\/))?(?:www\.)?(?:youtube.com|youtu.be)\/(?:watch)?(?:\?v=)?([^&<"\>\(\)\[\] \n]+)([^"]+)(">)([^<]+)(<\/a>)/g,
        '<p><iframe title="Youtube Embed" src="https://www.youtube.com/embed/$2" width="100%" height="315" className="my-2" allowFullScreen></iframe></p>'
      );
      // for text link
      newDescription = description.replace(
        /(?:(?:http:|https:)(?:\/\/))?(?:www\.)?(?:youtube.com|youtu.be)\/(?:watch)?(?:\?v=)?([^&<"\>\(\)\[\] \n]+)([^" \n]+)/g,
        '<p><iframe title="Youtube Embed" src="https://www.youtube.com/embed/$1" width="100%" height="315" className="my-2" allowFullScreen></iframe></p>'
      );
      // check for vimeo video
      newDescription = newDescription.replace(
        /(?:[^"'httpsw.:\/\/])(?:(?:http:|https:)(?:\/\/))?(?:www\.)?(?:player\.)?(?:vimeo.com)\/(?:video\/)?([^<"\>\(\)\[\] \n]+)/g,
        '<p><iframe title="Vimeo Embed" src="https://player.vimeo.com/video/$1" width="100%" height="360" className="my-2" frameBorder="0" allow="fullscreen" allowFullScreen></iframe></p>'
      );
  
      return newDescription;
    }
  }