import React, { useEffect, useState } from 'react';
import { Settings, User, Palette, Bell, Shield, RotateCcw, Moon, Monitor } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { EditProfileModal } from '../profile/EditProfileModal';

const SETTINGS_STORAGE_KEY = 'vibe_demo_settings_v1';

type Appearance = 'dark' | 'system';

interface DemoSettings {
  appearance: Appearance;
  pushNotifs: boolean;
  emailDigests: boolean;
  directMessagesFromAll: boolean;
  readReceipts: boolean;
  privateAccount: boolean;
  reducedMotion: boolean;
}

const DEFAULT_SETTINGS: DemoSettings = {
  appearance: 'dark',
  pushNotifs: true,
  emailDigests: false,
  directMessagesFromAll: true,
  readReceipts: true,
  privateAccount: false,
  reducedMotion: false,
};

export const SettingsView: React.FC = () => {
  const { currentUser, resetDemoData, addToast } = useApp();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [settings, setSettings] = useState<DemoSettings>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || '{}');
      return { ...DEFAULT_SETTINGS, ...saved };
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Browser storage can be unavailable in private contexts; the current session remains functional.
    }
  }, [settings]);

  const updateSetting = <K extends keyof DemoSettings>(key: K, value: DemoSettings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const handleToggle = (key: keyof DemoSettings, label: string) => {
    const value = !settings[key];
    updateSetting(key, value as never);
    addToast(`${label} ${value ? 'enabled' : 'disabled'}`, undefined, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 text-white px-1">
        <Settings className="w-4 h-4 text-red-500" />
        <h1 className="text-sm font-semibold uppercase tracking-wider font-mono">
          System Preferences
        </h1>
      </div>

      {/* Profile Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-neutral-900 space-y-4">
        <div className="flex items-center gap-2 text-neutral-300">
          <User className="w-4 h-4 text-red-500" />
          <h2 className="text-xs font-semibold uppercase tracking-wider font-mono">
            Account Profile
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar user={currentUser} size="lg" showVerified={currentUser.verified} />
            <div>
              <p className="text-sm font-semibold text-white">{currentUser.name}</p>
              <p className="text-xs font-mono text-neutral-500">@{currentUser.username}</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm">{currentUser.bio}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditProfileOpen(true)}
            className="px-4 py-2 bg-neutral-850 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold border border-neutral-750 transition-colors cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-neutral-900 space-y-4">
        <div className="flex items-center gap-2 text-neutral-300">
          <Palette className="w-4 h-4 text-red-500" />
          <h2 className="text-xs font-semibold uppercase tracking-wider font-mono">
            Theme & Aesthetic
          </h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              {
                value: 'dark' as const,
                label: 'Dark',
                description: 'Deep charcoal canvas',
                icon: Moon,
              },
              {
                value: 'system' as const,
                label: 'System',
                description: 'Follow OS preference',
                icon: Monitor,
              },
            ].map((option) => {
              const Icon = option.icon;
              const isSelected = settings.appearance === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateSetting('appearance', option.value)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-red-700 bg-red-950/30'
                      : 'border-neutral-850 bg-neutral-900/40 hover:border-neutral-700'
                  }`}
                >
                  <span
                    className={`p-2 rounded-lg ${isSelected ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold text-white">{option.label}</span>
                    <span className="block text-[11px] text-neutral-500">{option.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between py-2 border-b border-neutral-850">
            <div>
              <p className="font-semibold text-white">Typography Scale</p>
              <p className="text-neutral-500 mt-0.5">
                Plus Jakarta Sans + JetBrains Mono tabular figures
              </p>
            </div>
            <span className="text-[11px] font-mono text-neutral-400">Strict Scale</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-semibold text-white">Motion Latency</p>
              <p className="text-neutral-500 mt-0.5">
                Micro-interactions with cubic-bezier easing (&le;200ms)
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('reducedMotion', 'Reduced motion')}
              className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                settings.reducedMotion ? 'bg-red-600' : 'bg-neutral-800'
              }`}
              aria-label="Toggle reduced motion"
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${settings.reducedMotion ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-neutral-900 space-y-4">
        <div className="flex items-center gap-2 text-neutral-300">
          <Bell className="w-4 h-4 text-red-500" />
          <h2 className="text-xs font-semibold uppercase tracking-wider font-mono">
            Notification Preferences
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Push Notifications</p>
              <p className="text-[11px] text-neutral-500">
                Receive browser alerts for likes and replies
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('pushNotifs', 'Push notifications')}
              className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                settings.pushNotifs ? 'bg-red-600' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${settings.pushNotifs ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Direct Message Alerts</p>
              <p className="text-[11px] text-neutral-500">
                Instant badges when receiving a new chat
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('directMessagesFromAll', 'Direct message alerts')}
              className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                settings.directMessagesFromAll ? 'bg-red-600' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${settings.directMessagesFromAll ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Weekly Digest</p>
              <p className="text-[11px] text-neutral-500">
                Weekly curated summary of high-vibe topics
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('emailDigests', 'Weekly digest')}
              className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                settings.emailDigests ? 'bg-red-600' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${settings.emailDigests ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Account Settings */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111115] border border-neutral-900 space-y-4">
        <div className="flex items-center gap-2 text-neutral-300">
          <Shield className="w-4 h-4 text-red-500" />
          <h2 className="text-xs font-semibold uppercase tracking-wider font-mono">
            Privacy & Trust
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Private Profile</p>
              <p className="text-[11px] text-neutral-500">
                Only approved followers can inspect your vibes
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('privateAccount', 'Private profile')}
              className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                settings.privateAccount ? 'bg-red-600' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${settings.privateAccount ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-white">Chat Read Receipts</p>
              <p className="text-[11px] text-neutral-500">
                Allow participants to know when you have seen messages
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('readReceipts', 'Read receipts')}
              className={`w-10 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                settings.readReceipts ? 'bg-red-600' : 'bg-neutral-800'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${settings.readReceipts ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Sandbox Management */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#14141A] border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Demo Data Storage
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
              All interactions (likes, new posts, edited profile, follows, comments) are saved in
              browser localStorage.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={resetDemoData}
            className="flex items-center gap-2 px-3.5 py-2 bg-neutral-850 hover:bg-neutral-800 text-neutral-200 hover:text-white rounded-xl text-xs font-semibold border border-neutral-750 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-500" />
            <span>Reset Demo Data to Initial State</span>
          </button>
        </div>
      </div>

      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
    </div>
  );
};
