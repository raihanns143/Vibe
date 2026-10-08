import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  Code2,
  Copy,
  Heart,
  MessageSquare,
  MoreHorizontal,
  Share2,
  Trash2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/useApp';
import type { Post } from '../../types';
import { Avatar } from '../common/Avatar';
import { MediaImage } from '../common/MediaImage';
import { CommentSection } from './CommentSection';
import { PollCard } from './PollCard';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    currentUser,
    toggleLikePost,
    toggleBookmarkPost,
    deletePost,
    navigateToUser,
    addToast,
    setSelectedCategory,
    setActiveTab,
  } = useApp();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAuthor = currentUser.id === post.author.id;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(`${window.location.origin}#vibe_${post.id}`);
    setCopied(true);
    addToast('Link copied to clipboard', undefined, 'success');
    setIsMenuOpen(false);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleTagClick = (tag: string) => {
    setSelectedCategory(tag);
    setActiveTab('explore');
  };

  return (
    <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 sm:p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            user={post.author}
            size="md"
            showVerified={post.author.verified}
            onClick={() => navigateToUser(post.author)}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => navigateToUser(post.author)}
                className="truncate text-sm font-semibold text-slate-900 hover:text-blue-600"
              >
                {post.author.name}
              </button>
              <span className="truncate text-slate-400">@{post.author.username}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">{post.createdAt}</span>
            </div>
            {post.author.bio && (
              <p className="mt-0.5 hidden truncate text-[11px] text-slate-400 sm:block">
                {post.author.bio}
              </p>
            )}
          </div>
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Post options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-9 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-xs text-slate-700 shadow-xl">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                Copy post link
              </button>
              {isAuthor && (
                <button
                  type="button"
                  onClick={() => {
                    deletePost(post.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete post
                </button>
              )}
              {!isAuthor && (
                <button
                  type="button"
                  onClick={() => {
                    addToast('Post muted from feed', undefined, 'info');
                    setIsMenuOpen(false);
                  }}
                  className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-50"
                >
                  Mute @{post.author.username}
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="space-y-2">
        <p className="whitespace-pre-line break-words text-sm leading-6 text-slate-700">
          {post.content}
        </p>
        {post.tags?.length && (
          <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-blue-600">
            {post.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="hover:text-blue-700"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {post.codeSnippet && (
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-3.5 font-mono text-xs">
          <div className="mb-2 flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 uppercase">
              <Code2 className="h-3.5 w-3.5 text-blue-500" />
              {post.codeSnippet.language}
            </span>
            <span>UTF-8</span>
          </div>
          <pre className="overflow-x-auto leading-6 text-slate-200">
            <code>{post.codeSnippet.code}</code>
          </pre>
        </div>
      )}

      {post.mediaUrls?.length ? (
        <div
          className={`grid gap-1.5 overflow-hidden rounded-2xl border border-slate-200 ${post.mediaUrls.length > 1 ? 'grid-cols-2' : ''}`}
        >
          {post.mediaUrls.map((mediaUrl, index) => (
            <MediaImage
              key={`${post.id}-${index}`}
              src={mediaUrl}
              alt={`${post.content.slice(0, 40)} — image ${index + 1}`}
              aspectRatio={post.mediaUrls!.length > 1 ? 'square' : 'video'}
              className={post.mediaUrls!.length > 1 && index === 0 ? 'col-span-2' : ''}
            />
          ))}
        </div>
      ) : post.mediaUrl ? (
        <MediaImage src={post.mediaUrl} alt={post.content.slice(0, 40)} aspectRatio="video" />
      ) : null}

      <PollCard post={post} />

      <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
        <button
          type="button"
          onClick={() => toggleLikePost(post.id)}
          className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100 ${post.isLiked ? 'text-red-500' : 'hover:text-slate-700'}`}
          aria-label="Like post"
        >
          <motion.span whileTap={{ scale: 1.25 }}>
            <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
          </motion.span>
          <span className="font-mono tabular-nums">{post.likesCount}</span>
        </button>
        <button
          type="button"
          onClick={() => setIsCommentsOpen((open) => !open)}
          className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100 ${isCommentsOpen ? 'text-blue-600' : 'hover:text-slate-700'}`}
          aria-label="Comments"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="font-mono tabular-nums">{post.commentsCount}</span>
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Share post"
        >
          <Share2 className="h-4 w-4" />
          <span className="font-mono tabular-nums">{post.sharesCount}</span>
        </button>
        <button
          type="button"
          onClick={() => toggleBookmarkPost(post.id)}
          className={`rounded-lg p-1.5 transition-colors hover:bg-slate-100 ${post.isBookmarked ? 'text-blue-600' : 'hover:text-slate-700'}`}
          aria-label="Bookmark post"
        >
          <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {isCommentsOpen && <CommentSection postId={post.id} comments={post.comments || []} />}
    </article>
  );
};
