import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface MediaImageProps {
  src?: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'auto';
  onExpand?: () => void;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'video',
  onExpand,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass =
    aspectRatio === 'video' ? 'aspect-[16/9]' : aspectRatio === 'square' ? 'aspect-square' : '';

  if (!src || hasError) {
    return (
      <div
        className={`flex w-full ${aspectClass} flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500 ${className}`}
      >
        <ImageIcon className="mb-2 h-8 w-8 stroke-[1.5] text-slate-300" />
        <p className="text-xs font-medium text-slate-600">{alt || 'Visual Attachment'}</p>
        <span className="mt-0.5 text-[11px] text-slate-400">Asset render</span>
      </div>
    );
  }

  return (
    <div
      onClick={onExpand}
      className={`group relative w-full ${aspectClass} overflow-hidden rounded-xl border border-slate-200 bg-slate-100 ${onExpand ? 'cursor-zoom-in' : ''} ${className}`}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-slate-100">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};
