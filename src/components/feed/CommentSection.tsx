import React, { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { Comment } from '../../types';
import { Avatar } from '../common/Avatar';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments }) => {
  const { currentUser, addComment, toggleLikeComment, navigateToUser } = useApp();
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!commentText.trim()) return;
    addComment(postId, commentText);
    setCommentText('');
  };

  return (
    <div className="space-y-3 border-t border-slate-100 pt-3">
      <form onSubmit={handleSubmit} className="flex items-start gap-2.5">
        <Avatar user={currentUser} size="sm" />
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
          <input
            value={commentText}
            onChange={(event) => setCommentText(event.target.value.slice(0, 240))}
            placeholder="Write a thoughtful reply..."
            className="min-w-0 flex-1 bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          <span className="font-mono text-[10px] text-slate-400">{commentText.length}/240</span>
          <button
            type="submit"
            disabled={!commentText.trim()}
            className="rounded-lg p-1 text-blue-600 hover:bg-blue-50 disabled:text-slate-300"
            aria-label="Send comment"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>

      {comments.length > 0 ? (
        <div className="space-y-3 border-l border-slate-100 pl-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-2.5">
                <Avatar
                  user={comment.author}
                  size="xs"
                  onClick={() => navigateToUser(comment.author)}
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-1.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => navigateToUser(comment.author)}
                      className="font-semibold text-slate-800 hover:text-blue-600"
                    >
                      {comment.author.name}
                    </button>
                    <span className="text-slate-400">@{comment.author.username}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">{comment.createdAt}</span>
                  </div>
                  <p className="mt-0.5 break-words text-xs leading-5 text-slate-600">
                    {comment.content}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleLikeComment(postId, comment.id)}
                className={`flex shrink-0 items-center gap-1 rounded p-1 text-[10px] ${comment.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-slate-700'}`}
                aria-label="Like comment"
              >
                <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                {comment.likesCount > 0 && <span className="font-mono">{comment.likesCount}</span>}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-2 text-center text-[11px] text-slate-400">
          <MessageCircle className="mr-1 inline h-3.5 w-3.5" />
          No replies yet. Start the conversation.
        </p>
      )}
    </div>
  );
};
