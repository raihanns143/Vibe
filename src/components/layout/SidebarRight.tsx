import React from 'react';
import { ArrowUpRight, Mail, RotateCcw, Search, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { TRENDING_TOPICS } from '../../data/mockData';

export const SidebarRight: React.FC = () => {
  const {
    users,
    currentUser,
    toggleFollowUser,
    navigateToUser,
    startOrOpenConversation,
    searchQuery,
    setSearchQuery,
    setActiveTab,
    setSelectedCategory,
    resetDemoData,
  } = useApp();
  const suggestedUsers = users.filter((user) => user.id !== currentUser.id).slice(0, 3);

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') setActiveTab('explore');
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-[292px] shrink-0 flex-col overflow-y-auto border-l border-slate-200 bg-white px-4 py-6 z-30 lg:flex">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search vibes or people..."
          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="mt-5 space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              People you may know
            </h2>
            <button
              type="button"
              onClick={() => setActiveTab('explore')}
              className="text-[11px] font-medium text-blue-600 hover:text-blue-700"
            >
              Explore all
            </button>
          </div>
          <div className="space-y-3">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => navigateToUser(user)}
                  className="flex min-w-0 items-center gap-2.5 text-left"
                >
                  <Avatar user={user} size="sm" showVerified={user.verified} />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold text-slate-800">
                      {user.name}
                    </span>
                    <span className="block truncate text-[11px] text-slate-400">
                      @{user.username}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleFollowUser(user.id)}
                  className={`shrink-0 rounded-lg px-3 py-1 text-[11px] font-semibold transition-colors ${user.isFollowing ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-slate-900 text-white hover:bg-slate-700'}`}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => startOrOpenConversation(users.find((user) => user.id === 'user_maya')!)}
          className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left transition-colors hover:border-blue-200 hover:bg-blue-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Mail className="h-4 w-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-slate-800">Open messages</span>
            <span className="block text-[11px] text-slate-400">Continue your conversations</span>
          </span>
          <span className="h-2 w-2 rounded-full bg-blue-500" />
        </button>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-slate-500">
            <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
            <h2 className="text-xs font-semibold uppercase tracking-wider">Trending in Vibe</h2>
          </div>
          <div className="space-y-2">
            {TRENDING_TOPICS.slice(0, 5).map((topic) => (
              <button
                key={topic.tag}
                type="button"
                onClick={() => {
                  setSelectedCategory(topic.tag.replace('#', ''));
                  setActiveTab('explore');
                }}
                className="flex w-full items-start justify-between rounded-lg py-1 text-left hover:bg-slate-50"
              >
                <span>
                  <span className="block text-[10px] text-slate-400">{topic.category}</span>
                  <span className="mt-0.5 block text-xs font-medium text-slate-700 hover:text-blue-600">
                    {topic.tag}
                  </span>
                </span>
                <span className="mt-0.5 text-[10px] font-mono text-slate-400">{topic.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-semibold text-slate-800">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            Portfolio showcase
          </span>
          <span className="font-mono text-[10px] text-slate-400">v1.0-demo</span>
        </div>
        <p className="mt-2 leading-5 text-slate-500">
          Frontend-only social architecture demo. State persists in your browser via localStorage.
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-[11px]">
          <button
            type="button"
            onClick={resetDemoData}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="h-3 w-3" />
            Reset demo data
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-slate-700"
          >
            GitHub
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
