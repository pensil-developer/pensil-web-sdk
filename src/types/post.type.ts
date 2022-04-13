

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

export interface CreatedBy {
    id: string;
    name: string;
    userId: string;
    isVerifiedByPensil: boolean;
    picture: string;
    isFollowedByMe: boolean;
}

export interface Reactions {
    total: number
    details: Detail[]
  }
  
  export interface Detail {
    emoji: string
    count: number
    isByMe: boolean
    users:CreatedBy[]
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


interface Host {
    id: string;
    name: string;
    userId: string;
    isVerifiedByPensil: boolean;
    picture: string;
    isFollowedByMe: boolean;
}


export interface Event {
    id: string;
    title: string;
    banner: string;
    startTime: Date;
    endTime: Date;
    community: string;
    webURL: string;
    isBookmarkedByMe: boolean;
    invitedSections: string[];
    liveMeeting: LiveMeeting;
    isOnline: boolean;
    maximumRegistrations: number;
    host: Host;
    participantCount: number;
    myRSVPStatus: string;
    myCommunityRole: string;
    createdBy: EventCreatedBy;
    createdAt: Date;
    updatedAt: Date;
    location: string;
}

export interface EventCreatedBy {
    id: string;
    name: string;
    groupRole: string;
    userId: string;
    isVerifiedByPensil: boolean;
    picture: string;
    isFollowedByMe: boolean;
}

export interface Reply {
    id: string
    description: string
    reactions: Reactions
    createdBy: CreatedBy
    documents: Document[]
    images: string[]
    isByMe: boolean
    createdAt: string
  }
  export interface Document {
    _id: string
    location: string
    name: string
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
    document: string;
    documentName: string;
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
    comments:PostModel[];
    replies:Reply[];
    createdBy: CreatedBy;
    reactions: Reactions;
    createdAt: Date;
    canDelete: boolean;
    canDeleteComment: boolean;
    canDeleteReply: boolean;
}

