import React, { useEffect, useState } from "react";
import UseGroupDetail from "../../../hooks/group/use-group-detail.hook";
import usePaginatedSectionPost from "../../../hooks/section/use-paginated-section-post.hook";
import UseGetProfile from "../../../hooks/user/use-get-profile.hook";
import { PensilService } from "../../../services";
import { PostModel, User } from "../../../types";
import { withPensilWrapper } from "../../hoc/pensil-app.wrapper";
import Loader from "../atom/loader.atom";
// import { Avatar } from "../atom/avatar.atom";
// import CreateCommunityModel from "../misc/modal.component";
import PostCard from "../post-card";
import CreatePostContainer from "./create-post.component";
interface SectionDetailProps {
  user?: User;
  service: PensilService;
  children?: any;
  communityId?: string;
  groupId: string;
  sectionId: string;
  setActive: (value: boolean) => void;
}

function SectionDetailComponent(props: SectionDetailProps) {
  const { user } = UseGetProfile(props.service.services.profile);
  const { group } = UseGroupDetail(props.service.services.group, props.groupId);
  const [newPost, setNewPosts] = useState<PostModel>();
  const [list, setList] = useState<PostModel[]>();

  const { posts, isLoadingPosts, isLoadingMorePosts } = usePaginatedSectionPost(
    props.service.services.group,
    props.groupId,
    props.sectionId,
    group
  );

  useEffect(() => {
    if (posts !== undefined && newPost !== undefined) {
      posts.unshift(newPost);
      setList(posts);
      setNewPosts(undefined);
    } else if (posts !== undefined) {
      setList(posts);
    } else if (newPost !== undefined) {
      setList([newPost]);
      setNewPosts(undefined);
    }
  }, [newPost, posts]);

  const [isUpdated, setIsPostsUpdated] = useState<Boolean>(false);

  return (
    <div className="SectionDetail">
      <CreatePostContainer
        service={props.service}
        user={user}
        groupId={props.groupId}
        sectionId={props.sectionId}
        addPost={function (post: any): void {
          setNewPosts(post);
        }}
      />
      {isLoadingPosts ? (
        <div className="flex items-center justify-center h-full my-22">
          <Loader />
        </div>
      ) : list && list?.length > 0 ? (
        <>
          {list &&
            list.map((post: PostModel, index) => (
              <div key={index} className="my-4">
                <PostCard
                  service={props.service}
                  groupId={props.groupId}
                  sectionId={props.sectionId}
                  post={post}
                  updatePost={function (post: PostModel): void {
                    // Update post
                    list[index] = post;
                    console.log("updatePost", post);
                    setIsPostsUpdated(!isUpdated);
                  }}
                  deletePost={function (_: PostModel): void {
                    list.splice(index, 1);
                    setIsPostsUpdated(!isUpdated);
                  }}
                />
              </div>
            ))}
          {isLoadingMorePosts && (
            <div className="flex items-center justify-center h-full my-22">
              <Loader />
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full theme-text-heading-1">
          No Post available
        </div>
      )}
    </div>
  );
}

const SectionDetail = withPensilWrapper(SectionDetailComponent);

export { SectionDetail };
