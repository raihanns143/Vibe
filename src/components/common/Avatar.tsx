import React, { useState } from 'react';
import { User } from '../../types';

interface AvatarProps {
  user: Partial<User>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showVerified?: boolean;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  size = 'md',
  className = '',
  showVerified = false,
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-20 h-20 text-2xl',
  };

  const name = user.name || user.username || 'User';
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
      className={`relative shrink-0 rounded-full select-none ${isClickable ? 'cursor-pointer hover:opacity-90 active:scale-95 transition-all' : ''} ${className}`}
    >
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-neutral-900 border border-white/10 flex items-center justify-center font-medium text-neutral-300`}
      >
        {!imageError && user.avatar ? (
          <img
            src={user.avatar}
            alt={name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-semibold tracking-wider text-neutral-200">{initials}</span>
        )}
      </div>

      {showVerified && user.verified && (
        <span
          title="Verified Creator"
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 rounded-full flex items-center justify-center border border-[#0A0A0C]"
        >
          <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 20 20">
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </span>
      )}
    </div>
  );
};
