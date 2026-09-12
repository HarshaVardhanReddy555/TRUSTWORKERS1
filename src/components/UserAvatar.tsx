import React, { useState } from 'react';

interface UserAvatarProps {
  avatarUrl?: string | null;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  className?: string;
  showVerified?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  avatarUrl,
  name = '',
  size = 'md',
  shape = 'rounded',
  className = '',
  showVerified = false,
}) => {
  const [imageError, setImageError] = useState(false);

  const trimmedName = (name || '').trim();
  const initials = trimmedName
    ? trimmedName
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() || '')
        .join('')
    : '';

  const sizeClasses = {
    xs: { box: 'w-7 h-7 text-[10px]', icon: 'text-xs', verified: 'text-[10px] p-0.5' },
    sm: { box: 'w-9 h-9 text-xs', icon: 'text-sm', verified: 'text-xs p-0.5' },
    md: { box: 'w-12 h-12 text-sm', icon: 'text-base', verified: 'text-xs p-1' },
    lg: { box: 'w-16 h-16 text-base font-bold', icon: 'text-xl', verified: 'text-sm p-1' },
    xl: { box: 'w-24 h-24 text-xl font-black', icon: 'text-3xl', verified: 'text-base p-1.5' },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;
  const radiusClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  const hasValidImage = Boolean(avatarUrl && avatarUrl.trim() && !imageError);

  return (
    <div className={`relative inline-block shrink-0 select-none ${className}`}>
      <div
        className={`${currentSize.box} ${radiusClass} overflow-hidden border border-emerald-600/30 flex items-center justify-center shadow-2xs ${
          hasValidImage
            ? 'bg-slate-100'
            : 'bg-gradient-to-br from-[#00342b] to-[#004d40] text-emerald-100 font-bold tracking-wide'
        }`}
        title={trimmedName || 'Member'}
      >
        {hasValidImage ? (
          <img
            src={avatarUrl!}
            alt={trimmedName || 'Member'}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <span className={`material-symbols-outlined text-[#bfc9c4] ${currentSize.icon}`}>
            person
          </span>
        )}
      </div>

      {showVerified && (
        <span
          className={`material-symbols-outlined absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full shadow-xs ${currentSize.verified}`}
        >
          verified
        </span>
      )}
    </div>
  );
};
