import React from 'react';
import { Bell, Bookmark, Settings } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const MobileHeader: React.FC = () => {
  const { activeTab, setActiveTab, unreadNotificationsCount, viewingUser, currentUser } = useApp();

  const getTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Feed';
      case 'explore':
        return 'Explore';
      case 'notifications':
        return 'Notifications';
      case 'messages':
        return 'Messages';
      case 'bookmarks':
        return 'Saved Bookmarks';
      case 'profile':
        return viewingUser && viewingUser.id !== currentUser.id
          ? `@${viewingUser.username}`
          : 'My Profile';
      case 'settings':
        return 'Settings';
      default:
        return 'Vibe';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md md:hidden">
      <button
        type="button"
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-2.5"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 font-black text-white shadow-sm">
          V
        </span>
        <h1 className="text-sm font-semibold tracking-tight text-slate-900">{getTitle()}</h1>
      </button>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('bookmarks')}
          className={`rounded-lg p-2 transition-colors ${activeTab === 'bookmarks' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
          aria-label="Bookmarks"
        >
          <Bookmark className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className="relative rounded-lg p-2 text-slate-400 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`rounded-lg p-2 transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-700'}`}
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};
