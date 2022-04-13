export class EndpointService {
    private baseUrl = process.env.REACT_APP_PENSIL_COMMUNITY_BASE_URL;

    constructor(baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl;
        }
    }

    
    public getEndpoints() {

        const service = this;

        return {
            user: {
                profile: `${service.baseUrl}/profile`,
            },
            groupDetail: (groupId: string) => `${service.baseUrl}group/${groupId}`,
            sectionPostsPaginated: (groupId: string, sectionId: string, page = 1) =>
                service.baseUrl + "group/" + groupId + "/section/" + sectionId + "/posts?page=" + page,
            post: {
                create: service.baseUrl + "post",
                like: (postId: String) => service.baseUrl + "post/" + postId + "/like",
                dislike: (postId: String) => service.baseUrl + "post/" + postId + "/dislike",
                delete: (postId: String) => service.baseUrl + "post/" + postId,
                vote: (postId: String) => service.baseUrl + "post/" + postId + "/vote",
                bookmark: (postId: String) => service.baseUrl + "post/" + postId + "/bookmark",
                removeBookmark: (postId: String) => service.baseUrl + "post/" + postId + "/bookmark",

                update: (postId: String) => service.baseUrl + "post/" + postId,
                uploadImage: (postId: String) => service.baseUrl + "post/" + postId + "/images",
                uploadVideo: (postId: String) => service.baseUrl + "post/" + postId + "/videos",
                uploadDocument: (postId: String) => service.baseUrl + "post/" + postId + "/document",
                paginated: (page: String) => service.baseUrl + "post-paginated?page=" + page,
                popularPaginated: (page: String) => service.baseUrl + "post/explore-paginated?page=" + page,
                detail: (postId: String) => service.baseUrl + "post/" + postId,
                likes: (postId: String) => service.baseUrl + "post/" + postId + "/likes",
                pin: (postId: String) => service.baseUrl + "post/" + postId + "/pin",
                unpin: (postId: String) => service.baseUrl + "post/" + postId + "/unpin",
                getBookmarks: service.baseUrl + "bookmark",
                addComment: (postId: String) => service.baseUrl + "post/" + postId + "/comment",
                addCommentReply: (postId: String, commentId: String) =>
                    service.baseUrl + "post/" + postId + "/comment/" + commentId + "/reply",
                addCommentReaction: (postId: String, commentId: String) =>
                    service.baseUrl + "post/" + postId + "/comment/" + commentId + "/like",
                removeCommentReaction: (postId: String, commentId: String) =>
                    service.baseUrl + "post/" + postId + "/comment/" + commentId + "/dislike",
                addCommentReplyReaction: (postId: String, commentId: String, replyId: String) =>
                    service.baseUrl +
                    "post/" +
                    postId +
                    "/comment/" +
                    commentId +
                    "/reply/" +
                    replyId +
                    "/like",
                removeCommentReplyReaction: (postId: String, commentId: String, replyId: String) =>
                    service.baseUrl +
                    "post/" +
                    postId +
                    "/comment/" +
                    commentId +
                    "/reply/" +
                    replyId +
                    "/dislike",
                uploadImagesToComment: (postId: String, commentId: String) =>
                    service.baseUrl + "post/" + postId + "/comment/" + commentId + "/images",
                uploadDocumentToComment: (postId: String, commentId: String) =>
                    service.baseUrl + "post/" + postId + "/comment/" + commentId + "/document",
                uploadDocumentToCommentReply: (postId: String, commentId: String, replyId: String) =>
                    service.baseUrl +
                    "post/" +
                    postId +
                    "/comment/" +
                    commentId +
                    "/reply/" +
                    replyId +
                    "/documents?documents[]",
                deleteComment: (postId: String, commentId: String) =>
                    service.baseUrl + "post/" + postId + "/comment/" + commentId,
                deleteSubComment: (postId: String, commentId: String, replyId: String) =>
                    service.baseUrl + "post/" + postId + "/comment/" + commentId + "/reply/" + replyId,
                getMeetingData: (meetingId: String,) =>
                    service.baseUrl + "dyte/join-meeting/" + meetingId + "/json",
                toggleMeetingRecording: (roomName: String, endingKey: String) =>
                    service.baseUrl + "dyte/meeting/" + roomName + "/toggle-recording/" + endingKey,
                endMeeting: (roomName: String, endingKey: String,) =>
                    service.baseUrl + "dyte/meeting/" + roomName + "/end/" + endingKey,
            }
        }
    }
}