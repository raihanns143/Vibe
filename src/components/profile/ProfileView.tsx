import React, { useState } from 'react';
import {
  MapPin,
  Link as LinkIcon,
  Calendar,
  MessageCircle,
  Edit3,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { PostCard } from '../feed/PostCard';
import { EditProfileModal } from './EditProfileModal';
import { User } from '../../types';

interface ProfileViewProps {
  user?: User;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user: propUser }) => {
  const {
    currentUser,
    viewingUser,
    posts,
    toggleFollowUser,
    startOrOpenConversation,
    setActiveTab,
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState<'posts' | 'media' | 'likes'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Determine active profile to show
  const profileUser = propUser || viewingUser || currentUser;
  const isMe = profileUser.id === currentUser.id;

  // Filter posts for this profile
  const userPosts = posts.filter((p) => p.author.id === profileUser.id);
  const userMediaPosts = userPosts.filter((p) => Boolean(p.mediaUrl || p.codeSnippet));
  const userLikedPosts = posts.filter((p) => Boolean(p.isLiked));

  const displayPosts =
    activeProfileTab === 'posts'
      ? userPosts
      : activeProfileTab === 'media'
        ? userMediaPosts
        : userLikedPosts;

  return (
    <div className="space-y-4">
      {/* Top back banner on mobile/desktop if navigated to another user */}
      {!isMe && (
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Feed</span>
        </button>
      )}

      {/* Profile Header Card */}
      <div className="rounded-2xl bg-[#111115] border border-neutral-900 overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-36 sm:h-44 w-full bg-neutral-950 overflow-hidden">
          <img src={profileUser.coverImage} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111115] via-transparent to-transparent opacity-80" />
        </div>

        {/* Profile Info Section */}
        <div className="px-5 pb-5 -mt-12 sm:-mt-14 relative space-y-4">
          {/* Avatar and Action CTA */}
          <div className="flex items-end justify-between gap-4">
            <div className="relative ring-4 ring-[#111115] rounded-full">
              <Avatar user={profileUser} size="xl" showVerified={profileUser.verified} />
            </div>

            <div className="flex items-center gap-2 pb-1">
              {isMe ? (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold border border-neutral-750 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => startOrOpenConversation(profileUser)}
                    className="p-2 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-200 hover:text-white border border-neutral-750 transition-colors cursor-pointer"
                    title={`Send message to @${profileUser.username}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleFollowUser(profileUser.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      profileUser.isFollowing
                        ? 'bg-neutral-850 text-neutral-300 hover:bg-neutral-800 border border-neutral-750'
                        : 'bg-red-600 hover:bg-red-500 text-white shadow-sm'
                    }`}
                  >
                    {profileUser.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* User Names & Bio */}
          <div className="space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {profileUser.name}
                </h1>
                {profileUser.verified && (
                  <span className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-[10px]">
                    âœ“
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-neutral-500">@{profileUser.username}</p>
            </div>

            {profileUser.bio && (
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-xl">
                {profileUser.bio}
              </p>
            )}

            {/* Unboxed Metadata (Zero-pill discipline) */}
            <div className="flex items-center gap-4 flex-wrap text-xs text-neutral-400 pt-1">
              {profileUser.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{profileUser.location}</span>
                </div>
              )}
              {profileUser.website && (
                <a
                  href={profileUser.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-red-400 hover:underline"
                >
                  <LinkIcon className="w-3.5 h-3.5 text-red-500" />
                  <span>{profileUser.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              <div className="flex items-center gap-1.5 text-neutral-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Joined {profileUser.joinedDate}</span>
              </div>
            </div>

            {/* Metrics Counters */}
            <div className="flex items-center gap-5 pt-2 text-xs border-t border-neutral-900">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white font-mono tabular-nums">
                  {profileUser.followingCount}
                </span>
                <span className="text-neutral-500">Following</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white font-mono tabular-nums">
                  {profileUser.followersCount}
                </span>
                <span className="text-neutral-500">Followers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white font-mono tabular-nums">
                  {userPosts.length}
                </span>
                <span className="text-neutral-500">Vibes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Filter Tabs */}
        <div className="flex border-t border-neutral-900 bg-[#0E0E12] px-3">
          {(['posts', 'media', 'likes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveProfileTab(tab)}
              className={`flex-1 py-3 text-xs font-semibold capitalize border-b-2 transition-all cursor-pointer ${
                activeProfileTab === tab
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab === 'posts' ? 'Vibes' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Posts Stream */}
      <div className="space-y-4">
        {displayPosts.length > 0 ? (
          displayPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="p-8 rounded-2xl bg-[#111115] border border-neutral-900 text-center space-y-2">
            <Sparkles className="w-6 h-6 text-neutral-600 mx-auto" />
            <p className="text-sm font-medium text-neutral-300">No entries to show in this view</p>
            <p className="text-xs text-neutral-500">
              {activeProfileTab === 'likes'
                ? 'Liked posts will appear here.'
                : 'Posts from this user will show up here.'}
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isMe && (
        <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};
