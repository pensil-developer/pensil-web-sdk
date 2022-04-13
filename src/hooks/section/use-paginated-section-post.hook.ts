import { useEffect, useState } from "react";
import { GroupService } from "../../services/group.service";
import { PostModel } from "../../types/post.type";

/**
 * Return paginated section posts
 * @param {GroupService} groupService
 * @param {string} groupId
 * @param {string} sectionId
 * @param {any} group
 * @returns
 */

export default function usePaginatedSectionPost(
  groupService: GroupService,
  groupId: string,
  sectionId: string,
  group: any
) {
  // holds the selected currentPage
  const [currentPage, setCurrentPage] = useState(1);

  // post related states
  const [posts, setPosts] = useState<[PostModel]>();
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  // helps with pagination
  const [isLoadingMorePosts, setIsLoadingMorePosts] = useState(false);
  const [noMorePosts, setNoMorePosts] = useState(false);

  useEffect(() => {
    if (groupId) {
      setIsLoadingPosts(true);
      groupService
        .getSectionPostsPaginated(groupId, sectionId)
        .then((res) => {
          setPosts(res.posts);
        })
        .catch((err) => {
          console.log("err fetching posts", err);
        })
        .finally(() => {
          setIsLoadingPosts(false);
        });
    }
  }, [group]);

  useEffect(() => {
    // create callback
    const callBack = () => {
      if (
        window.innerHeight + window.scrollY + 100 >=
        document.body.offsetHeight
      ) {
        // you're at the bottom of the page
        // do this when we reach end
        if (!isLoadingMorePosts && !noMorePosts) {
          // if we are not already loading more posts, load more posts

          setIsLoadingMorePosts(true);
          groupService
            .getSectionPostsPaginated(groupId, sectionId, currentPage + 1)
            .then((res: any) => {
              // setPosts(res.posts);
              if (res.posts.length === 0) {
                setNoMorePosts(true);
              } else {
                // const cont = [posts,...res.posts];
                posts?.push(...res.posts);
                setPosts(posts);
                setCurrentPage(res.page);
              }
            })
            .catch((err: any) => {
              console.log("err fetching posts", err);
            })
            .finally(() => {
              setIsLoadingMorePosts(false);
            });
        }
      }
    };
    window.addEventListener("scroll", callBack);

    return () => {
      window.removeEventListener("scroll", callBack);
    };
  }, [isLoadingMorePosts, currentPage, posts, groupId, sectionId, noMorePosts]);

  return { posts, isLoadingPosts, isLoadingMorePosts };
}
