import React from 'react';
import { Check, UserPlus } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { INITIAL_USERS } from '../../data/mockData';

const people = INITIAL_USERS.slice(1, 6);

export const PeopleCarousel: React.FC = () => {
  const { users, toggleFollowUser, navigateToUser } = useApp();

  return (
    <section
      aria-labelledby="people-heading"
      className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 id="people-heading" className="text-sm font-semibold text-slate-900">
            People you may know
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">Fresh creators and friends</p>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-600">
          5 new
        </span>
      </div>
      <div className="flex snap-x gap-3 overflow-x-auto pb-1 scrollbar-thin">
        {people.map((person) => {
          const isFollowing = users.find((user) => user.id === person.id)?.isFollowing ?? false;
          return (
            <article
              key={person.id}
              className="w-[178px] shrink-0 snap-start rounded-xl border border-slate-100 bg-slate-50/60 p-3 text-center"
            >
              <button
                type="button"
                onClick={() => navigateToUser(person)}
                className="mx-auto block rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Avatar user={person} size="lg" />
              </button>
              <button
                type="button"
                onClick={() => navigateToUser(person)}
                className="mt-2 block w-full truncate text-left text-sm font-semibold text-slate-900 hover:text-blue-600"
              >
                {person.name}
              </button>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">@{person.username}</p>
              <button
                type="button"
                onClick={() => toggleFollowUser(person.id)}
                className={`mt-3 flex h-8 w-full items-center justify-center gap-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isFollowing
                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                    : 'bg-white text-blue-600 shadow-sm hover:bg-blue-50'
                }`}
              >
                {isFollowing ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <UserPlus className="h-3.5 w-3.5" />
                )}
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
