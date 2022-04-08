import React, { useState } from "react";
import UseGroupDetail from "../../../hooks/group/use-group-detail.hook";
import usePaginatedSectionPost from "../../../hooks/section/use-paginated-section-post.hook";
import { PensilService } from "../../../services";
import { PostModel } from "../../../types";
import { withPensilWrapper } from "../../hoc/pensil-app.wrapper";
import PostCard from "../post-card";
interface SectionDetailProps {
  service: PensilService;
  children?: any;
  communityId?: string;
  groupId: string;
  sectionId: string;
}

function SectionDetailComponent(props: SectionDetailProps) {

  const { group } = UseGroupDetail(props.service.services.group, props.groupId);

  const { posts, isLoadingPosts, isLoadingMorePosts } = usePaginatedSectionPost(
    props.service.services.group,
    props.groupId,
    props.sectionId,
    group
  );

  const [isUpdated, setIsPostsUpdated] = useState<Boolean>(false);

  return (
    <div className="SectionDetail">
      {isLoadingPosts ? (
        <div className="flex items-center justify-center h-full">Loading..</div>
      ) : posts && posts?.length > 0 ? (
        <>
          {posts &&
            posts.map((post: PostModel, index) => (
              <div key={index} className="my-4">
                <PostCard
                  service={props.service}
                  groupId={props.groupId}
                  sectionId={props.sectionId}
                  post={post}
                  updatePost={function (post: PostModel): void {
                    // Update post
                    posts[index] = post;
                    console.log("updatePost", post);
                    setIsPostsUpdated(!isUpdated);
                  }}
                  deletePost={function (_: PostModel): void {
                    posts.splice(index, 1);
                    setIsPostsUpdated(!isUpdated);
                  }}
                />
              </div>
            ))}
          {isLoadingMorePosts && (
            <div className="flex items-center justify-center">Loading more</div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          No Post available
        </div>
      )}
    </div>
  );
}

const SectionDetail = withPensilWrapper(SectionDetailComponent);

export { SectionDetail };
