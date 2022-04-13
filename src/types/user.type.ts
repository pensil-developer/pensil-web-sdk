export interface User {
    id: string
    name: string
    isVerifiedByPensil: boolean
    userId: string
    countryCode: string
    mobile: string
    role: string
    picture: string
    banner: any
    followers: number
    following: number
    isFollowedByMe: boolean
    isFollowingMe: boolean
    location: string
    bio: string
    webLink: string
    instagramLink: string
    twitterLink: string
    facebookLink: string
    pintrestLink: string
    youtubeLink: string
    behanceLink: string
    dribbbleLink: string
    linkedinLink: string
    lastLoginDate: string
    communities: any[]
    fcmToken: any
    communityTypeSelection: string
    dealTier: any
    dealCount: number
    createdAt: string
    updatedAt: string
  }