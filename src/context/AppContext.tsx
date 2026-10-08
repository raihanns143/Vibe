import React, { useEffect, useState, ReactNode } from 'react';
import {
  User,
  Post,
  NotificationItem,
  Conversation,
  NavigationTab,
  FeedFilter,
  ToastMessage,
  Comment,
} from '../types';
import {
  clearDemoState,
  getInitialDemoState,
  loadDemoState,
  persistDemoState,
} from '../services/demoStorage';
import { AppContext } from './AppContextValue';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [demoState] = useState(loadDemoState);
  const [currentUser, setCurrentUser] = useState<User>(demoState.currentUser);
  const [users, setUsers] = useState<User[]>(demoState.users);
  const [posts, setPosts] = useState<Post[]>(demoState.posts);
  const [notifications, setNotifications] = useState<NotificationItem[]>(demoState.notifications);
  const [conversations, setConversations] = useState<Conversation[]>(demoState.conversations);

  // UI state
  const [activeTab, setActiveTabState] = useState<NavigationTab>('home');
  const [feedFilter, setFeedFilter] = useState<FeedFilter>('for-you');
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_maya');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    try {
      persistDemoState({ currentUser, users, posts, notifications, conversations });
    } catch (error) {
      addToast(
        'Local storage unavailable',
        error instanceof Error ? error.message : 'Changes are active for this session.',
        'error',
      );
    }
  }, [conversations, currentUser, notifications, posts, users]);

  const addToast = (
    title: string,
    description?: string,
    type: 'success' | 'info' | 'error' = 'info',
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setActiveTab = (tab: NavigationTab) => {
    setActiveTabState(tab);
    setViewingUser(tab === 'profile' ? currentUser : null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToUser = (user: User) => {
    setViewingUser(user);
    setActiveTabState('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCurrentUser = () => {
    setViewingUser(currentUser);
    setActiveTabState('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const currentlyLiked = Boolean(post.isLiked);
          return {
            ...post,
            isLiked: !currentlyLiked,
            likesCount: currentlyLiked ? Math.max(0, post.likesCount - 1) : post.likesCount + 1,
          };
        }
        return post;
      }),
    );
  };

  const toggleBookmarkPost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const currentlyBookmarked = Boolean(post.isBookmarked);
          const nextState = !currentlyBookmarked;
          if (nextState) {
            addToast(
              'Saved to Bookmarks',
              'You can review this in your saved collection.',
              'success',
            );
          } else {
            addToast('Removed from Bookmarks', undefined, 'info');
          }
          return {
            ...post,
            isBookmarked: nextState,
          };
        }
        return post;
      }),
    );
  };

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return;

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      postId,
      author: currentUser,
      content: content.trim(),
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const comments = post.comments || [];
          return {
            ...post,
            comments: [newComment, ...comments],
            commentsCount: post.commentsCount + 1,
          };
        }
        return post;
      }),
    );

    addToast('Comment published', undefined, 'success');
  };

  const toggleLikeComment = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId && post.comments) {
          const updatedComments = post.comments.map((comment) => {
            if (comment.id === commentId) {
              const currentlyLiked = Boolean(comment.isLiked);
              return {
                ...comment,
                isLiked: !currentlyLiked,
                likesCount: currentlyLiked
                  ? Math.max(0, comment.likesCount - 1)
                  : comment.likesCount + 1,
              };
            }
            return comment;
          });
          return { ...post, comments: updatedComments };
        }
        return post;
      }),
    );
  };

  const voteOnPoll = (postId: string, optionId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId || !post.poll) return post;
        if (post.poll.voted) return post;
        return {
          ...post,
          poll: {
            ...post.poll,
            voted: true,
            selectedOptionId: optionId,
            options: post.poll.options.map((option) =>
              option.id === optionId ? { ...option, votes: option.votes + 1 } : option,
            ),
          },
        };
      }),
    );
    addToast('Vote recorded', 'Your response is now part of the live poll.', 'success');
  };

  const createPost = ({
    content,
    mediaUrl,
    mediaUrls,
    mediaType = 'image',
    tags = [],
  }: {
    content: string;
    mediaUrl?: string;
    mediaUrls?: string[];
    mediaType?: 'image' | 'code' | 'quote';
    tags?: string[];
  }) => {
    if (!content.trim()) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      author: currentUser,
      content: content.trim(),
      createdAt: 'Just now',
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      isBookmarked: false,
      mediaUrl,
      mediaUrls,
      mediaType,
      tags,
      comments: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setIsCreatePostModalOpen(false);
    addToast('Vibe published to feed', 'Your post is now live in the demo stream.', 'success');
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    addToast('Post removed', undefined, 'info');
  };

  const toggleFollowUser = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const isNowFollowing = !user.isFollowing;
          const updatedUser = {
            ...user,
            isFollowing: isNowFollowing,
            followersCount: isNowFollowing
              ? user.followersCount + 1
              : Math.max(0, user.followersCount - 1),
          };

          // Also update currentUser following count
          setCurrentUser((prevMe) => ({
            ...prevMe,
            followingCount: isNowFollowing
              ? prevMe.followingCount + 1
              : Math.max(0, prevMe.followingCount - 1),
          }));

          // If we are currently viewing this user in profile view, sync state
          if (viewingUser && viewingUser.id === userId) {
            setViewingUser(updatedUser);
          }

          if (isNowFollowing) {
            addToast(`Following @${user.username}`, undefined, 'success');
          } else {
            addToast(`Unfollowed @${user.username}`, undefined, 'info');
          }

          return updatedUser;
        }
        return user;
      }),
    );
  };

  const updateCurrentUserProfile = (updatedData: Partial<User>) => {
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);

    // Also update in users list
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));

    // Also update authors in posts created by currentUser
    setPosts((prev) =>
      prev.map((p) => (p.author.id === currentUser.id ? { ...p, author: updated } : p)),
    );

    if (viewingUser && viewingUser.id === currentUser.id) {
      setViewingUser(updated);
    }

    addToast('Profile updated successfully', undefined, 'success');
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('All notifications marked as read', undefined, 'info');
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return;

    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      content: content.trim(),
      createdAt: 'Just now',
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastActivity: 'Just now',
          };
        }
        return conv;
      }),
    );

    // Simulated interactive realistic auto-reply after 1.2s for fun demo interactivity!
    const targetConv = conversations.find((c) => c.id === conversationId);
    if (targetConv && targetConv.participant.id !== currentUser.id) {
      setTimeout(() => {
        const replyResponses = [
          'Agreed! Will review the latest commit tonight.',
          'Love this direction. Clean and fast.',
          'Checking this out right now!',
          'Sounds great! Let us sync more on this tomorrow.',
        ];
        const randomReply = replyResponses[Math.floor(Math.random() * replyResponses.length)];
        const replyMsg = {
          id: `msg_reply_${Date.now()}`,
          senderId: targetConv.participant.id,
          content: randomReply,
          createdAt: 'Just now',
        };

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === conversationId) {
              return {
                ...c,
                messages: [...c.messages, replyMsg],
                lastActivity: 'Just now',
              };
            }
            return c;
          }),
        );
      }, 1200);
    }
  };

  const startOrOpenConversation = (user: User) => {
    const existing = conversations.find((c) => c.participant.id === user.id);
    if (existing) {
      setActiveConversationId(existing.id);
      setActiveTabState('messages');
    } else {
      const newConv: Conversation = {
        id: `conv_${user.username}_${Date.now()}`,
        participant: user,
        messages: [
          {
            id: `msg_welcome_${Date.now()}`,
            senderId: user.id,
            content: `Hey @${currentUser.username}, nice to connect with you on Vibe!`,
            createdAt: 'Just now',
          },
        ],
        unreadCount: 0,
        lastActivity: 'Just now',
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
      setActiveTabState('messages');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetDemoData = () => {
    try {
      clearDemoState();
    } catch (error) {
      addToast(
        'Reset failed',
        error instanceof Error ? error.message : 'Browser storage is unavailable.',
        'error',
      );
      return;
    }

    const initialState = getInitialDemoState();
    setCurrentUser(initialState.currentUser);
    setUsers(initialState.users);
    setPosts(initialState.posts);
    setNotifications(initialState.notifications);
    setConversations(initialState.conversations);
    setActiveTabState('home');
    setViewingUser(null);
    setActiveConversationId('conv_maya');
    setSearchQuery('');
    setSelectedCategory('All');

    addToast('Demo data restored', 'Initial sandbox state re-established.', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        posts,
        notifications,
        conversations,
        activeTab,
        feedFilter,
        viewingUser,
        activeConversationId,
        isCreatePostModalOpen,
        toasts,
        unreadNotificationsCount,
        unreadMessagesCount,
        searchQuery,
        selectedCategory,
        setActiveTab,
        setFeedFilter,
        navigateToUser,
        navigateToCurrentUser,
        setActiveConversationId,
        setIsCreatePostModalOpen,
        setSearchQuery,
        setSelectedCategory,
        addToast,
        removeToast,
        toggleLikePost,
        toggleBookmarkPost,
        addComment,
        toggleLikeComment,
        voteOnPoll,
        createPost,
        deletePost,
        toggleFollowUser,
        updateCurrentUserProfile,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendMessage,
        startOrOpenConversation,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
