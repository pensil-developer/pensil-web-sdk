

interface Group {
    id: string;
    name: string;
}

interface Community {
    id: string;
}

interface Tab {
    name: string;
    id: string;
}

interface LiveMeeting {
    id: string;
    title?: any;
    meetingId: string;
    roomName: string;
    isLive: boolean;
    isEnded: boolean;
    recordings: any[];
    webUrl: string;
}

interface CreatedBy {
    id: string;
    name: string;
    userId: string;
    isVerifiedByPensil: boolean;
    picture: string;
    isFollowedByMe: boolean;
}

interface Reactions {
    total: number;
    details: any[];
}

interface LatestComment {
    id: string;
    description: string;
    createdBy: CreatedBy;
    images: any[];
    reactions: Reactions;
    replies: any[];
    isByMe: boolean;
    createdAt: Date;
}

interface LiveMeeting2 {
    id: string;
    title?: any;
    meetingId: string;
    roomName: string;
    isLive: boolean;
    isEnded: boolean;
    recordings: any[];
    webUrl: string;
}

interface Host {
    id: string;
    name: string;
    userId: string;
    isVerifiedByPensil: boolean;
    picture: string;
    isFollowedByMe: boolean;
}

interface CreatedBy2 {
    id: string;
    name: string;
    userId: string;
    isVerifiedByPensil: boolean;
    picture: string;
    isFollowedByMe: boolean;
}

interface Event {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    community: string;
    webURL: string;
    invitedSections: string[];
    liveMeeting: LiveMeeting2;
    isOnline: boolean;
    maximumRegistrations: number;
    host: Host;
    participantCount: number;
    myRSVPStatus: string;
    myCommunityRole: string;
    createdBy: CreatedBy2;
    createdAt: Date;
    updatedAt: Date;
    location: string;
}

interface CreatedBy3 {
    id: string;
    name: string;
    userId: string;
    isVerifiedByPensil: boolean;
    groupRole: string;
    picture: string;
    isFollowedByMe: boolean;
}

export interface PostModel {
    id: string;
    isInGroup: boolean;
    group: Group;
    community: Community;
    isPinned: boolean;
    tags: any[];
    tabId: string;
    tab: Tab;
    title: string;
    description: string;
    liveMeeting: LiveMeeting;
    scheduledTime?: any;
    images: any[];
    videoThumbnails: any[];
    videos: any[];
    likeCount: number;
    commentCount: number;
    viewCount: number;
    isCommentedOnByMe: boolean;
    poll?: any;
    shared?: any;
    likes: number;
    latestComment: LatestComment;
    latestLikes?: any;
    isLikedByMe: boolean;
    isByMe: boolean;
    isBookmarkedByMe: boolean;
    event: Event;
    createdBy: CreatedBy3;
    createdAt: Date;
    canDelete: boolean;
    canDeleteComment: boolean;
    canDeleteReply: boolean;
}