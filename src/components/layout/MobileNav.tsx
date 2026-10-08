import React from 'react';
import { Bell, Compass, Home, Plus, User } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { NavigationTab } from '../../types';

export const MobileNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    navigateToCurrentUser,
    setIsCreatePostModalOpen,
  } = useApp();

  const handleTabClick = (tab: NavigationTab) => {
    if (tab === 'profile') {
      navigateToCurrentUser();
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-1.5 backdrop-blur-md md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 items-center">
        <button
          type="button"
          onClick={() => handleTabClick('home')}
          className="flex min-h-11 flex-col items-center justify-center gap-1"
        >
          <Home
            className={`h-5 w-5 ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
          />
          <span
            className={`text-[10px] font-medium ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Home
          </span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('explore')}
          className="flex min-h-11 flex-col items-center justify-center gap-1"
        >
          <Compass
            className={`h-5 w-5 ${activeTab === 'explore' ? 'text-blue-600' : 'text-slate-400'}`}
          />
          <span
            className={`text-[10px] font-medium ${activeTab === 'explore' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Explore
          </span>
        </button>
        <button
          type="button"
          onClick={() => setIsCreatePostModalOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200 transition-transform hover:scale-105"
          aria-label="Create new vibe"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('notifications')}
          className="relative flex min-h-11 flex-col items-center justify-center gap-1"
        >
          <Bell
            className={`h-5 w-5 ${activeTab === 'notifications' ? 'text-blue-600' : 'text-slate-400'}`}
          />
          {unreadNotificationsCount > 0 && (
            <span className="absolute right-[calc(50%-18px)] top-1 h-3 w-3 rounded-full bg-blue-600 text-center text-[8px] font-bold leading-3 text-white">
              {unreadNotificationsCount}
            </span>
          )}
          <span
            className={`text-[10px] font-medium ${activeTab === 'notifications' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Alerts
          </span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('profile')}
          className="flex min-h-11 flex-col items-center justify-center gap-1"
        >
          <User
            className={`h-5 w-5 ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
          />
          <span
            className={`text-[10px] font-medium ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            Profile
          </span>
        </button>
      </div>
    </nav>
  );
};
