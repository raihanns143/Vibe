import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { AVATAR_PRESETS } from '../../data/mockData';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUserProfile } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location || '');
  const [website, setWebsite] = useState(currentUser.website || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUserProfile({
      name: name.trim() || currentUser.name,
      username: username.trim().toLowerCase() || currentUser.username,
      bio: bio.trim(),
      location: location.trim(),
      website: website.trim(),
      avatar: selectedAvatar,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg z-10 bg-[#121217] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-850">
          <h2 className="text-sm font-semibold text-white">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {/* Avatar preset selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-300 block">
              Choose Avatar Style
            </label>
            <div className="flex items-center gap-2.5 flex-wrap">
              {Object.entries(AVATAR_PRESETS).map(([key, svgData]) => {
                const isSelected = selectedAvatar === svgData;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedAvatar(svgData)}
                    className={`relative w-11 h-11 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-red-500 scale-105 ring-2 ring-red-500/30'
                        : 'border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    <img src={svgData} alt={key} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute inset-0 bg-red-600/30 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Username</label>
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
              <span className="text-neutral-500 text-xs font-mono">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent pl-1 text-xs text-white focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500 leading-relaxed resize-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA"
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Website */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300">Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourportfolio.com"
              className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-850">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-850 hover:bg-neutral-800 text-neutral-300 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
