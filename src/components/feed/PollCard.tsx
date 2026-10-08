import React from 'react';
import { Check, Radio, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { Post } from '../../types';

interface PollCardProps {
  post: Post;
}

export const PollCard: React.FC<PollCardProps> = ({ post }) => {
  const { voteOnPoll } = useApp();
  const poll = post.poll;
  if (!poll) return null;

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);
  const selected = poll.selectedOptionId;

  return (
    <div className="overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-violet-700">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100">
          <Radio className="h-4 w-4" />
        </span>
        <span>Live poll</span>
        <span className="ml-auto flex items-center gap-1 text-violet-500">
          <TrendingUp className="h-3.5 w-3.5" />
          {totalVotes} votes
        </span>
      </div>
      <h3 className="text-sm font-semibold leading-6 text-slate-900">{poll.question}</h3>
      <div className="mt-3 space-y-2.5">
        {poll.options.map((option) => {
          const percentage = totalVotes === 0 ? 0 : Math.round((option.votes / totalVotes) * 100);
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              type="button"
              disabled={poll.voted}
              onClick={() => voteOnPoll(post.id, option.id)}
              className={`group relative block w-full overflow-hidden rounded-xl border p-3 text-left transition-all ${
                isSelected
                  ? 'border-violet-300 bg-white shadow-sm'
                  : 'border-violet-100 bg-white/75 hover:border-violet-200'
              } ${poll.voted ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-violet-100/70 transition-transform duration-500 group-hover:scale-x-100"
                style={{ transform: `scaleX(${percentage / 100})` }}
              />
              <span className="relative flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  {isSelected && <Check className="h-4 w-4 text-violet-600" />}
                  {option.label}
                </span>
                <span className="font-semibold text-slate-600">{percentage}%</span>
              </span>
            </button>
          );
        })}
      </div>
      {poll.voted && (
        <p className="mt-3 text-center text-xs text-violet-600">
          You voted for {poll.options.find((option) => option.id === selected)?.label}.
        </p>
      )}
    </div>
  );
};
