import React from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { INITIAL_USERS } from '../../data/mockData';

const stories = [
  { user: INITIAL_USERS[0], image: '/assets/posts/workspace.svg', live: false },
  { user: INITIAL_USERS[3], image: '/assets/posts/typography.svg', live: false },
  { user: INITIAL_USERS[1], image: '/assets/posts/architecture.svg', live: true },
  { user: INITIAL_USERS[2], image: '/assets/posts/workspace.svg', live: false },
  { user: INITIAL_USERS[5], image: '/assets/posts/architecture.svg', live: false },
];

export const StoryTray: React.FC = () => {
  const { currentUser, navigateToUser } = useApp();

  return (
    <section
      aria-label="Stories"
      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm"
    >
      <div className="mb-2 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-slate-900">Stories</h2>
        <span className="text-xs text-slate-500">Updated now</span>
      </div>
      <div className="flex snap-x gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          type="button"
          className="group relative h-28 w-[76px] shrink-0 snap-start overflow-hidden rounded-xl bg-slate-900 text-left transition-all hover:-translate-y-0.5"
          aria-label="Add your story"
        >
          <img
            src={currentUser.avatar}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <span className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 p-2 text-center text-[11px] font-semibold text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-600">
              <Plus className="h-4 w-4" />
            </span>
            Your story
          </span>
        </button>
        {stories.map(({ user, image, live }) => (
          <button
            key={user.id}
            type="button"
            onClick={() => navigateToUser(user)}
            className="group relative h-28 w-[76px] shrink-0 snap-start overflow-hidden rounded-xl bg-slate-900 text-left transition-all hover:-translate-y-0.5"
          >
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <span className="absolute left-2 top-2">
              <Avatar user={user} size="xs" className="ring-2 ring-white" />
            </span>
            <span className="absolute inset-x-0 bottom-0 p-2 text-center text-[11px] font-semibold leading-tight text-white">
              {user.name.split(' ')[0]}
            </span>
            {live && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
};
