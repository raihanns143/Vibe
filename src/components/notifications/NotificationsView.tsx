import React, { useState } from 'react';
import { Heart, MessageSquare, UserPlus, AtSign, CheckCheck, Bell } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { NotificationItem } from '../../types';

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    navigateToUser,
    setActiveTab,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'interactions' | 'follows'>('all');

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'interactions') {
      return notif.type === 'like' || notif.type === 'comment' || notif.type === 'mention';
    }
    if (activeFilter === 'follows') {
      return notif.type === 'follow';
    }
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />;
      case 'comment':
        return <MessageSquare className="w-3.5 h-3.5 text-blue-400" />;
      case 'follow':
        return <UserPlus className="w-3.5 h-3.5 text-emerald-400" />;
      case 'mention':
        return <AtSign className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-neutral-400" />;
    }
  };

  const getActionText = (item: NotificationItem) => {
    switch (item.type) {
      case 'like':
        return 'liked your vibe';
      case 'comment':
        return 'replied to your vibe';
      case 'follow':
        return 'started following you';
      case 'mention':
        return 'mentioned you in a conversation';
      default:
        return 'interacted with your profile';
    }
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markNotificationAsRead(item.id);
    if (item.type === 'follow') {
      navigateToUser(item.user);
    } else {
      setActiveTab('home');
    }
  };

  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <div className="space-y-4">
      {/* Header with Mark All as Read */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-red-500" />
          <h1 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
            Activity & Notifications
          </h1>
        </div>

        {hasUnread && (
          <button
            onClick={markAllNotificationsAsRead}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5 text-red-500" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Segmented Filter */}
      <div className="flex items-center gap-1 p-1 bg-[#121216] border border-neutral-850 rounded-xl">
        {(['all', 'interactions', 'follows'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
              activeFilter === filter
                ? 'bg-[#1C1C22] text-white font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                !item.isRead
                  ? 'bg-[#141419] border-red-900/30 hover:border-red-800/50'
                  : 'bg-[#111115] border-neutral-900 hover:border-neutral-800'
              }`}
            >
              <div className="relative shrink-0">
                <Avatar user={item.user} size="sm" showVerified={item.user.verified} />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1A1A20] border border-neutral-800 flex items-center justify-center">
                  {getIcon(item.type)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span className="text-xs font-semibold text-white">{item.user.name}</span>
                  <span className="text-xs text-neutral-400">{getActionText(item)}</span>
                  <span className="text-neutral-600 text-xs">Â·</span>
                  <span className="text-[11px] font-mono text-neutral-500">{item.createdAt}</span>
                </div>

                {item.postSnippet && (
                  <p className="text-xs text-neutral-400 mt-1 italic line-clamp-1 border-l-2 border-neutral-800 pl-2">
                    &ldquo;{item.postSnippet}&rdquo;
                  </p>
                )}
              </div>

              {!item.isRead && <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />}
            </div>
          ))
        ) : (
          <div className="p-8 rounded-2xl bg-[#111115] border border-neutral-900 text-center space-y-2">
            <p className="text-xs font-medium text-neutral-300">No notifications to display</p>
            <p className="text-[11px] text-neutral-500">
              You are all caught up with your interactions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
