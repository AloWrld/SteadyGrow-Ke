export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  country: string;
  region: string;
  niche: string;
  organization?: string;
}

export enum Platform {
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  LINKEDIN = 'LinkedIn',
  YOUTUBE = 'YouTube'
}

export enum PostStatus {
  SCHEDULED = 'SCHEDULED',
  PUBLISHED = 'PUBLISHED',
  RECYCLED = 'RECYCLED',
  DRAFT = 'DRAFT'
}

export interface Post {
  id: string;
  content: string;
  mediaUrl?: string;
  platforms: Platform[];
  scheduledTime: string; // ISO date string
  status: PostStatus;
  isRecycled: boolean;
  stats?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface AnalyticsMetric {
  platform: Platform;
  followers: number;
  engagementRate: number;
  postsLast30Days: number;
}

export interface DriveFile {
  id: string;
  name: string;
  thumbnailLink?: string;
  mimeType: string;
}