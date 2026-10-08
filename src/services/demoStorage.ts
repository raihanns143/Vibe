import { Conversation, NotificationItem, Post, User } from '../types';
import {
  INITIAL_CONVERSATIONS,
  INITIAL_CURRENT_USER,
  INITIAL_NOTIFICATIONS,
  INITIAL_POSTS,
  INITIAL_USERS,
} from '../data/mockData';

export const DEMO_STORAGE_KEYS = {
  currentUser: 'vibe_demo_current_user_v2',
  users: 'vibe_demo_users_v2',
  posts: 'vibe_demo_posts_v2',
  notifications: 'vibe_demo_notifications_v2',
  conversations: 'vibe_demo_conversations_v2',
} as const;

export interface DemoState {
  currentUser: User;
  users: User[];
  posts: Post[];
  notifications: NotificationItem[];
  conversations: Conversation[];
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const readJson = <T>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    const parsed: unknown = JSON.parse(stored);
    return isRecord(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
};

export const loadDemoState = (): DemoState => ({
  currentUser: readJson<User>(DEMO_STORAGE_KEYS.currentUser, INITIAL_CURRENT_USER),
  users: readJson<User[]>(DEMO_STORAGE_KEYS.users, INITIAL_USERS),
  posts: readJson<Post[]>(DEMO_STORAGE_KEYS.posts, INITIAL_POSTS),
  notifications: readJson<NotificationItem[]>(
    DEMO_STORAGE_KEYS.notifications,
    INITIAL_NOTIFICATIONS,
  ),
  conversations: readJson<Conversation[]>(DEMO_STORAGE_KEYS.conversations, INITIAL_CONVERSATIONS),
});

export const persistDemoState = (state: DemoState): void => {
  try {
    localStorage.setItem(DEMO_STORAGE_KEYS.currentUser, JSON.stringify(state.currentUser));
    localStorage.setItem(DEMO_STORAGE_KEYS.users, JSON.stringify(state.users));
    localStorage.setItem(DEMO_STORAGE_KEYS.posts, JSON.stringify(state.posts));
    localStorage.setItem(DEMO_STORAGE_KEYS.notifications, JSON.stringify(state.notifications));
    localStorage.setItem(DEMO_STORAGE_KEYS.conversations, JSON.stringify(state.conversations));
  } catch {
    throw new Error('Demo state could not be saved in this browser.');
  }
};

export const clearDemoState = (): void => {
  try {
    Object.values(DEMO_STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  } catch {
    throw new Error('Demo state could not be cleared from this browser.');
  }
};

export const getInitialDemoState = (): DemoState => ({
  currentUser: structuredClone(INITIAL_CURRENT_USER),
  users: structuredClone(INITIAL_USERS),
  posts: structuredClone(INITIAL_POSTS),
  notifications: structuredClone(INITIAL_NOTIFICATIONS),
  conversations: structuredClone(INITIAL_CONVERSATIONS),
});
