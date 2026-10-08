import React from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { PostCard } from '../feed/PostCard';

export const BookmarksView: React.FC = () => {
  const { posts, setActiveTab } = useApp();

  const bookmarkedPosts = posts.filter((p) => p.isBookmarked);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-white">
          <Bookmark className="w-4 h-4 text-red-500 fill-current" />
          <h1 className="text-sm font-semibold uppercase tracking-wider font-mono">
            Saved Bookmarks
          </h1>
        </div>
        <span className="text-[11px] font-mono text-neutral-500">
          {bookmarkedPosts.length} saved
        </span>
      </div>

      {/* Bookmarked list */}
      <div className="space-y-4">
        {bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-12 rounded-2xl bg-[#111115] border border-neutral-900 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-200">
                You haven&apos;t saved any vibes yet
              </p>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Bookmark articles, design insights, or code snippets from your feed to review
                anytime.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('home')}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Explore Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
