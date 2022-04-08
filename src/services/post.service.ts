import { PensilServiceConfig } from ".";
import axios from "axios";
import { EndpointService } from "./endpoint.service";
import { PostModel } from "../types";


export class PostService {

    private config: PensilServiceConfig;
    private endpointService: EndpointService;

    constructor(config: PensilServiceConfig) {
        this.config = config;
        this.endpointService = new EndpointService(config.baseUrl);
    }

    /**
    * Answer with the user selected option
    * @param {*} postId
    * @param {*} option
    */
    public async voteOnPoll(postId: string, option: string) {
        return axios
            .post(this.endpointService.getEndpoints().post.vote(postId), { option }, {

                headers: {
                    Authorization: "Bearer " + this.config.token ?? "",
                },
            })
            .then((response) => response.data);
    }


    /**
   * Get post detail
   * @param {*} postId
   * @returns
   */
    public async getPostDetail(postId: string) {
        return axios
            .get(this.endpointService.getEndpoints().post.detail(postId), {
                headers: {
                    Authorization: "Bearer " + (this.config.token ? this.config.token : null),
                },
            })
            .then((response) => response.data);
    }

    /**
   * Get post likes
   * @param {*} postId
   * @returns
   */
    public async getPostLikes(postId: string) {
        return axios
            .get(this.endpointService.getEndpoints().post.likes(postId), {
                headers: {
                    Authorization: "Bearer " + (this.config.token ? this.config.token : null),
                },
            })
            .then((response) => response.data);
    }

    /**
   * Create a post from post object
   * @param {*} post
   * @returns
   */
    public async createPost(post: PostModel) {
        return axios
            .post(this.endpointService.getEndpoints().post.create, post, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    /**
   * Update a post from post object
   
   * @param {PostModel} post
   * @param {string} postId
   * @returns
   */
    public async updatePost(post: PostModel, postId: string) {
        return axios
            .post(this.endpointService.getEndpoints().post.update(postId), post, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    /**
     * Upload images
     
     * @param {*} postId
     * @param {*} images
     * @returns
     */
    public async uploadImages(

        postId: string,
        images = [],
        setPercentComplete = (_: any) => { }
    ) {
        const formData = new FormData();
        images.forEach((image: any) => {
            formData.append("images[]", image, image.fileName);
        });
        return axios
            .post(this.endpointService.getEndpoints().post.uploadImage(postId), formData, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
                onUploadProgress: function (progressEvent) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setPercentComplete(percentCompleted);
                },
            })
            .then((response) => response.data);
    }

    /**
     * Delete images
     
     * @param {*} postId
     * @returns
     */
    public async deleteImages(postId: string) {
        return axios
            .delete(this.endpointService.getEndpoints().post.uploadImage(postId), {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    /**
     * Upload videos in post
     
     * @param {*} postId
     * @param {*} videos
     * @returns
     */
    public async uploadVideos(

        postId: string,
        videos = [],
        setPercentComplete = (_: any) => { }
    ) {
        const formData = new FormData();
        videos.forEach((video: any) => {
            formData.append("videos[]", video, video.fileName);
        });
        return axios
            .post(this.endpointService.getEndpoints().post.uploadVideo(postId), formData, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
                onUploadProgress: function (progressEvent) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setPercentComplete(percentCompleted);
                },
            })
            .then((response) => response.data);
    }

    /**
     * Upload document
     
     * @param {*} postId
     * @param {*} document
     * @returns
     */
    public async uploadDocument(

        postId: string,
        document: any,
        setPercentComplete = (_: any) => { }
    ) {
        const formData = new FormData();
        formData.append("document", document, document.fileName);
        return axios
            .post(this.endpointService.getEndpoints().post.uploadDocument(postId), formData, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
                onUploadProgress: function (progressEvent) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setPercentComplete(percentCompleted);
                },
            })
            .then((response) => response.data);
    }

    /**
     * Pin a post
     
     * @param {*} postId
     * @returns
     */
    public async pinPost(postId: string) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.pin(postId),
                {},
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
     * Unpin a post
     
     * @param {*} postId
     * @returns
     */
    public async unpinPost(postId: String) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.unpin(postId),
                {},
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
* Bookmark a post
* @param {*} postId
* @returns
*/
    public async bookmarkPost(postId: string) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.bookmark(postId),
                {},
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
     * Un??Bookmark a post
     
     * @param {*} postId
     * @param {*} document
     * @returns
     */
    public async removeBookmark(postId = "") {
        return axios
            .delete(this.endpointService.getEndpoints().post.removeBookmark(postId), {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    /**
     * Get user bookmarks
     * @returns
     */
    public async getBookmarks() {
        return axios
            .get(this.endpointService.getEndpoints().post.getBookmarks, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }


    /**
     * Like a post
     
     * @param {*} groupId
     * @returns
     */
    public async likePost(postId: string) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.like(postId),
                {},
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
     * Dislike a post
     
     * @param {*} groupId
     * @returns
     */
    public async dislikePost(postId: string) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.dislike(postId),
                {},
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
   * Add comment on pole
   * @param {*} postId
   * @param {*} comment
   * @returns
   */
    public async addComment(postId: String, comment = { description: "" }) {
        return axios
            .post(this.endpointService.getEndpoints().post.addComment(postId), comment, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    public async uploadImagesToComment(postId: String, commentId: String, images: any[]) {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append("images[]", image, image.fileName);
        });

        return axios
            .post(this.endpointService.getEndpoints().post.uploadImagesToComment(postId, commentId), formData, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    public async uploadDocumentToComment(postId: String, commentId: String, document: any) {
        const formData = new FormData();
        formData.append("document", document, document.fileName);

        return axios
            .post(
                this.endpointService.getEndpoints().post.uploadDocumentToComment(postId, commentId),
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    public async uploadDocumentToCommentReply(

        postId: String,
        commentId: String,
        replyId: String,
        document: any
    ) {
        const formData = new FormData();
        document.forEach((document: any) => {
            formData.append("documents[]", document, document.fileName);
        });
        return axios
            .post(
                this.endpointService.getEndpoints().post.uploadDocumentToCommentReply(postId, commentId, replyId),
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    public async deleteComment(postId: String, commentId: String) {
        return axios
            .delete(this.endpointService.getEndpoints().post.deleteComment(postId, commentId), {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    public async deleteSubComment(postId: String, commentId: String, replyId: String) {
        return axios
            .delete(this.endpointService.getEndpoints().post.deleteSubComment(postId, commentId, replyId), {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    /**
     * Delete a post
     
     * @param {*} groupId
     * @returns
     */
    public async deletePost(postId: String) {
        return axios
            .delete(this.endpointService.getEndpoints().post.delete(postId), {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    /**
     * Add comment on pole
     
     * @param {*} postId
     * @param {*} commentId
     * @returns
     */
    public async addCommentReply(postId: String, commentId: String, description: { description: String }) {
        return axios
            .post(this.endpointService.getEndpoints().post.addCommentReply(postId, commentId), description, {
                headers: {
                    Authorization: "Bearer " + this.config.token,
                },
            })
            .then((response) => response.data);
    }

    /**
     * Add comment reaction
     * @param {*} postId
     * @param {*} commentId
     * @param {*} emoji
     * @returns
     */
    public async addCommentReaction(postId: String, commentId: String, emoji: String) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.addCommentReaction(postId, commentId),
                { emoji },
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
     * remove comment reaction
     * @param {*} postId
     * @param {*} commentId
     * @param {*}
     * @returns
     */
    public async removeCommentReaction(postId: String, commentId: String) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.removeCommentReaction(postId, commentId),
                {},
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
     * Add comment reply reaction
     * @param {*} postId
     * @param {*} commentId
     * @param {*} emoji
     * @returns
     */
    public async addCommentReplyReaction(

        postId: String,
        commentId: String,
        replyId: String,
        emoji: String
    ) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.addCommentReplyReaction(postId, commentId, replyId),
                { emoji },
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
     * remove comment reaction
     * @param {*} postId
     * @param {*} commentId
     * @param {*}
     * @returns
     */
    public async removeCommentReplyReaction(postId: String, commentId: String, replyId: String) {
        return axios
            .post(
                this.endpointService.getEndpoints().post.removeCommentReplyReaction(postId, commentId, replyId),
                {},
                {
                    headers: {
                        Authorization: "Bearer " + this.config.token,
                    },
                }
            )
            .then((response) => response.data);
    }
}