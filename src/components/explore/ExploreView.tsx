import React, { useState } from 'react';
import { Search, Compass, TrendingUp, Users } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { PostCard } from '../feed/PostCard';
import { CATEGORIES, TRENDING_TOPICS } from '../../data/mockData';

export const ExploreView: React.FC = () => {
  const {
    users,
    posts,
    currentUser,
    toggleFollowUser,
    navigateToUser,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');

  // Filter users by search
  const filteredUsers = users.filter((u) => {
    if (u.id === currentUser.id) return false;
    if (!localSearch.trim()) return true;
    const query = localSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.username.toLowerCase().includes(query) ||
      u.bio.toLowerCase().includes(query)
    );
  });

  // Filter posts by search and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !localSearch.trim() ||
      post.content.toLowerCase().includes(localSearch.toLowerCase()) ||
      post.author.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(localSearch.toLowerCase())));

    const matchesCategory =
      selectedCategory === 'All' ||
      (post.tags && post.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-5">
      {/* Search Header */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search by keyword, creator, or topic..."
          className="w-full h-11 pl-10 pr-4 bg-[#111115] border border-neutral-850 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600/60 focus:ring-1 focus:ring-red-600/30 transition-all"
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-red-600 text-white font-semibold shadow-sm'
                  : 'bg-[#121216] border border-neutral-850 text-neutral-400 hover:text-white hover:border-neutral-750'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Discover Featured Creators Carousel/Grid */}
      <div className="rounded-2xl bg-[#111115] border border-neutral-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-300">
            <Users className="w-4 h-4 text-red-500" />
            <h2 className="text-xs font-semibold uppercase tracking-wider font-mono">
              Featured Creators
            </h2>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            {filteredUsers.length} creators
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-3 rounded-xl bg-[#16161B] border border-neutral-850/80 flex items-center justify-between gap-3 group hover:border-neutral-750 transition-all"
            >
              <div
                onClick={() => navigateToUser(user)}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer"
              >
                <Avatar user={user} size="sm" showVerified={user.verified} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-neutral-500 truncate font-mono">
                    @{user.username}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleFollowUser(user.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 cursor-pointer transition-all ${
                  user.isFollowing
                    ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-750'
                    : 'bg-white text-black hover:bg-neutral-200 font-semibold'
                }`}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Topics (On Mobile/Compact views) */}
      <div className="rounded-2xl bg-[#111115] border border-neutral-900 p-4 space-y-3 lg:hidden">
        <div className="flex items-center gap-2 text-neutral-300">
          <TrendingUp className="w-4 h-4 text-red-500" />
          <h2 className="text-xs font-semibold uppercase tracking-wider font-mono">
            Trending Conversations
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TRENDING_TOPICS.map((topic) => (
            <div
              key={topic.tag}
              onClick={() => setSelectedCategory(topic.tag.replace('#', ''))}
              className="p-2.5 rounded-xl bg-[#16161B] border border-neutral-850 cursor-pointer hover:border-neutral-700"
            >
              <p className="text-[10px] text-neutral-500">{topic.category}</p>
              <p className="text-xs font-medium text-neutral-200 mt-0.5 truncate">{topic.tag}</p>
              <span className="text-[10px] font-mono text-neutral-500">{topic.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Discovered Posts List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-neutral-400">
            <Compass className="w-4 h-4 text-red-500" />
            <h2 className="text-xs font-semibold uppercase tracking-wider font-mono">
              Explore Vibes {selectedCategory !== 'All' ? `Â· #${selectedCategory}` : ''}
            </h2>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            {filteredPosts.length} results
          </span>
        </div>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-8 rounded-2xl bg-[#111115] border border-neutral-900 text-center space-y-2">
            <p className="text-xs font-medium text-neutral-300">No matching vibes found</p>
            <p className="text-[11px] text-neutral-500">
              Try searching for different keywords or clear your active category filter.
            </p>
            <button
              onClick={() => {
                setLocalSearch('');
                setSelectedCategory('All');
              }}
              className="px-3.5 py-1.5 bg-neutral-850 text-xs text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
