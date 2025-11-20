import { Post, PostStatus, Platform, DriveFile, AnalyticsMetric } from '../types';

// Simulating API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Exciting news coming next week! #SteadyGrow #Growth',
    platforms: [Platform.LINKEDIN, Platform.FACEBOOK],
    scheduledTime: new Date(Date.now() + 86400000).toISOString(),
    status: PostStatus.SCHEDULED,
    isRecycled: false
  },
  {
    id: '2',
    content: 'Check out our latest product demo.',
    mediaUrl: 'https://picsum.photos/400/300',
    platforms: [Platform.FACEBOOK, Platform.INSTAGRAM],
    scheduledTime: new Date(Date.now() - 86400000).toISOString(),
    status: PostStatus.PUBLISHED,
    isRecycled: true,
    stats: { likes: 120, shares: 34, comments: 12 }
  }
];

export const mockDriveFiles: DriveFile[] = [
  { id: 'f1', name: 'promo_video_v1.mp4', mimeType: 'video/mp4', thumbnailLink: 'https://picsum.photos/id/1/100/100' },
  { id: 'f2', name: 'infographic_q3.png', mimeType: 'image/png', thumbnailLink: 'https://picsum.photos/id/2/100/100' },
  { id: 'f3', name: 'team_photo.jpg', mimeType: 'image/jpeg', thumbnailLink: 'https://picsum.photos/id/3/100/100' },
  { id: 'f4', name: 'logo_transparent.png', mimeType: 'image/png', thumbnailLink: 'https://picsum.photos/id/4/100/100' },
];

export const mockAnalytics: AnalyticsMetric[] = [
  { platform: Platform.FACEBOOK, followers: 12500, engagementRate: 4.2, postsLast30Days: 15 },
  { platform: Platform.INSTAGRAM, followers: 8300, engagementRate: 6.8, postsLast30Days: 22 },
  { platform: Platform.LINKEDIN, followers: 5400, engagementRate: 3.5, postsLast30Days: 8 },
  { platform: Platform.TIKTOK, followers: 15200, engagementRate: 12.5, postsLast30Days: 30 },
];

export const fetchPosts = async (): Promise<Post[]> => {
  await delay(500);
  return mockPosts;
};

export const fetchDriveFiles = async (): Promise<DriveFile[]> => {
  await delay(800);
  return mockDriveFiles;
};

export const fetchAnalytics = async (): Promise<AnalyticsMetric[]> => {
  await delay(600);
  return mockAnalytics;
};

export const createPost = async (post: Partial<Post>): Promise<Post> => {
  await delay(1000);
  return {
    id: Math.random().toString(36).substr(2, 9),
    content: post.content || '',
    platforms: post.platforms || [],
    scheduledTime: post.scheduledTime || new Date().toISOString(),
    status: PostStatus.SCHEDULED,
    isRecycled: false,
    ...post
  } as Post;
};