export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location?: string;
  website?: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
  verified?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  mediaUrl?: string;
  mediaUrls?: string[];
  mediaType?: 'image' | 'code' | 'quote';
  poll?: {
    question: string;
    options: PollOption[];
    voted?: boolean;
    selectedOptionId?: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
  };
  tags?: string[];
  comments?: Comment[];
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: User;
  postId?: string;
  postSnippet?: string;
  createdAt: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participant: User;
  messages: Message[];
  unreadCount: number;
  lastActivity: string;
}

export type NavigationTab =
  'home' | 'explore' | 'notifications' | 'messages' | 'bookmarks' | 'profile' | 'settings';

export type FeedFilter = 'for-you' | 'following' | 'media';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}
