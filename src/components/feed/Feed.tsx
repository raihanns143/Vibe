import React from 'react';
import { Image as ImageIcon, Sparkles, Users } from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { FeedFilter } from '../../types';
import { PeopleCarousel } from './PeopleCarousel';
import { PostCard } from './PostCard';
import { PostComposer } from './PostComposer';
import { StoryTray } from './StoryTray';

export const Feed: React.FC = () => {
  const { posts, feedFilter, setFeedFilter } = useApp();

  const filterTabs: { id: FeedFilter; label: string; icon: React.ElementType }[] = [
    { id: 'for-you', label: 'For You', icon: Sparkles },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'media', label: 'Media', icon: ImageIcon },
  ];

  const filteredPosts = posts.filter((post) => {
    if (feedFilter === 'following')
      return post.author.isFollowing || post.author.id === 'user_alex';
    if (feedFilter === 'media')
      return Boolean(post.mediaUrl || post.mediaUrls?.length || post.poll || post.codeSnippet);
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-20 -mx-3 border-b border-slate-200 bg-white/90 px-3 pb-3 pt-2 backdrop-blur-xl sm:-mx-5 sm:px-5">
        <div className="flex rounded-xl bg-slate-100 p-1">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = feedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFeedFilter(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <StoryTray />
      <PostComposer />
      <PeopleCarousel />

      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-800">No vibes in this view yet</p>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
              Follow more creators or switch tabs to see the latest conversations.
            </p>
            <button
              type="button"
              onClick={() => setFeedFilter('for-you')}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              Back to For You
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
