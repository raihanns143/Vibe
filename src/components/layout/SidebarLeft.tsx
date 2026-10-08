import React from 'react';
import {
  Bell,
  Bookmark,
  Compass,
  Home,
  Mail,
  PlusSquare,
  Settings,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { NavigationTab } from '../../types';
import { Avatar } from '../common/Avatar';

export const SidebarLeft: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadNotificationsCount,
    unreadMessagesCount,
    currentUser,
    navigateToCurrentUser,
    setIsCreatePostModalOpen,
  } = useApp();
  const navItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: number }[] =
    [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'explore', label: 'Explore', icon: Compass },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
      { id: 'messages', label: 'Messages', icon: Mail, badge: unreadMessagesCount },
      { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
      { id: 'profile', label: 'Profile', icon: UserIcon },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];

  return (
    <aside className="sticky top-0 hidden h-screen w-[244px] shrink-0 flex-col justify-between border-r border-slate-200 bg-white px-4 py-6 z-30 lg:flex">
      <div className="space-y-7">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 px-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-black text-white shadow-sm shadow-blue-100 transition-transform hover:scale-105">
            V
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-950">Vibe</span>
          <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-slate-400">
            Demo
          </span>
        </button>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  item.id === 'profile' ? navigateToCurrentUser() : setActiveTab(item.id)
                }
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                  <span>{item.label}</span>
                </span>
                {item.badge && item.badge > 0 && (
                  <span className="min-w-4 rounded-full bg-blue-600 px-1.5 py-0.5 text-center text-[10px] font-mono font-semibold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsCreatePostModalOpen(true)}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm shadow-blue-100 transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          <PlusSquare className="h-4 w-4" />
          New Vibe
        </button>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <Avatar user={currentUser} size="sm" showVerified={currentUser.verified} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-900">{currentUser.name}</p>
              <p className="truncate text-[11px] text-slate-400">@{currentUser.username}</p>
            </div>
            <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 text-center">
            <div>
              <p className="text-xs font-semibold text-slate-800">
                {currentUser.followersCount.toLocaleString()}
              </p>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Followers</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">
                {currentUser.followingCount.toLocaleString()}
              </p>
              <p className="text-[9px] uppercase tracking-wider text-slate-400">Following</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={navigateToCurrentUser}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-800"
        >
          View profile
        </button>
      </div>
    </aside>
  );
};
