import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/useApp';
import { PostComposer } from './PostComposer';

export const PostModal: React.FC = () => {
  const { isCreatePostModalOpen, setIsCreatePostModalOpen } = useApp();

  if (!isCreatePostModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={() => setIsCreatePostModalOpen(false)} />
      <div className="relative w-full max-w-lg z-10 bg-[#111115] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-900">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 font-mono">
            Create New Vibe
          </h2>
          <button
            onClick={() => setIsCreatePostModalOpen(false)}
            className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <PostComposer onSuccess={() => setIsCreatePostModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};
