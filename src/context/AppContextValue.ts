import { createContext } from 'react';
import {
  User,
  Post,
  NotificationItem,
  Conversation,
  NavigationTab,
  FeedFilter,
  ToastMessage,
} from '../types';

export interface AppContextType {
  currentUser: User;
  users: User[];
  posts: Post[];
  notifications: NotificationItem[];
  conversations: Conversation[];
  activeTab: NavigationTab;
  feedFilter: FeedFilter;
  viewingUser: User | null;
  activeConversationId: string | null;
  isCreatePostModalOpen: boolean;
  toasts: ToastMessage[];
  unreadNotificationsCount: number;
  unreadMessagesCount: number;
  searchQuery: string;
  selectedCategory: string;
  setActiveTab: (tab: NavigationTab) => void;
  setFeedFilter: (filter: FeedFilter) => void;
  navigateToUser: (user: User) => void;
  navigateToCurrentUser: () => void;
  setActiveConversationId: (id: string | null) => void;
  setIsCreatePostModalOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  toggleLikeComment: (postId: string, commentId: string) => void;
  voteOnPoll: (postId: string, optionId: string) => void;
  createPost: (postData: {
    content: string;
    mediaUrl?: string;
    mediaUrls?: string[];
    mediaType?: 'image' | 'code' | 'quote';
    tags?: string[];
  }) => void;
  deletePost: (postId: string) => void;
  toggleFollowUser: (userId: string) => void;
  updateCurrentUserProfile: (updatedData: Partial<User>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  sendMessage: (conversationId: string, content: string) => void;
  startOrOpenConversation: (user: User) => void;
  resetDemoData: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
