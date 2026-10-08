import React, { useState } from 'react';
import { Code, Hash, Image, Sparkles, X } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { Avatar } from '../common/Avatar';
import { POST_MEDIA_PRESETS } from '../../data/mockData';

interface PostComposerProps {
  onSuccess?: () => void;
  compact?: boolean;
}

export const PostComposer: React.FC<PostComposerProps> = ({ onSuccess, compact = false }) => {
  const { currentUser, createPost } = useApp();
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const charsRemaining = 320 - content.length;
  const isValid = content.trim().length > 0 && charsRemaining >= 0;

  const addTag = () => {
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !tags.includes(clean)) setTags((current) => [...current, clean]);
    setTagInput('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid) return;
    createPost({
      content,
      mediaUrl: mediaUrl || undefined,
      mediaType: mediaUrl ? 'image' : undefined,
      tags: tags.length ? tags : undefined,
    });
    setContent('');
    setMediaUrl('');
    setShowMediaPicker(false);
    setTags([]);
    setShowTagInput(false);
    onSuccess?.();
  };

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start gap-3">
        <Avatar user={currentUser} size="md" showVerified={currentUser.verified} />
        <div className="min-w-0 flex-1">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What's your current project vibe or insight?"
            rows={compact ? 2 : 3}
            maxLength={320}
            className="w-full resize-none bg-transparent text-sm leading-6 text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          {mediaUrl && (
            <div className="relative mt-2 max-h-56 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img src={mediaUrl} alt="Upload preview" className="h-48 w-full object-cover" />
              <button
                type="button"
                onClick={() => setMediaUrl('')}
                className="absolute right-2 top-2 rounded-full bg-slate-950/75 p-1.5 text-white hover:bg-slate-950"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {tags.length && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => setTags((current) => current.filter((item) => item !== tag))}
                    aria-label={`Remove ${tag}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {showMediaPicker && (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Choose or enter media</span>
            <button
              type="button"
              onClick={() => setShowMediaPicker(false)}
              aria-label="Close media picker"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(POST_MEDIA_PRESETS).map(([name, source]) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setMediaUrl(source);
                  setShowMediaPicker(false);
                }}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white p-1 text-left hover:border-blue-300"
              >
                <img src={source} alt="" className="aspect-video w-full rounded object-cover" />
                <span className="block px-1 pb-1 pt-1.5 text-[10px] font-medium capitalize text-slate-600">
                  {name}
                </span>
              </button>
            ))}
          </div>
          <input
            type="url"
            value={mediaUrl}
            onChange={(event) => setMediaUrl(event.target.value)}
            placeholder="Or paste any image or SVG URL..."
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
          />
        </div>
      )}

      {showTagInput && (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-400">#</span>
          <input
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ',') {
                event.preventDefault();
                addTag();
              }
            }}
            placeholder="Type tag and press Enter..."
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:border-blue-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={addTag}
            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
          >
            Add
          </button>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowMediaPicker((open) => !open)}
            className={`rounded-lg p-2 hover:bg-slate-100 ${mediaUrl ? 'text-blue-600' : 'text-slate-400'}`}
            aria-label="Attach media"
          >
            <Image className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowTagInput((open) => !open)}
            className={`rounded-lg p-2 hover:bg-slate-100 ${tags.length ? 'text-blue-600' : 'text-slate-400'}`}
            aria-label="Add tags"
          >
            <Hash className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() =>
              setContent((current) =>
                current
                  ? `${current}\n\n\`\`\`ts\n// write code snippet here\n\`\`\``
                  : '```ts\n// write code snippet here\n```',
              )
            }
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
            aria-label="Insert code block"
          >
            <Code className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-xs tabular-nums ${charsRemaining < 20 ? 'font-bold text-red-500' : 'text-slate-400'}`}
          >
            {charsRemaining}
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span>Publish</span>
            <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
