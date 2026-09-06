import React from 'react';

interface CustomerAvatarProps {
  name?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CustomerAvatar: React.FC<CustomerAvatarProps> = ({
  name = 'Citizen Member',
  className = '',
  size = 'md',
}) => {
  const trimmed = (name || '').trim();
  const initials = trimmed
    ? trimmed
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('')
    : '';

  const sizeClasses = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-lg font-black',
  };

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-[#004d40] to-[#00201a] text-emerald-100 font-bold flex items-center justify-center border border-emerald-400/30 select-none shrink-0 shadow-2xs ${
        sizeClasses[size]
      } ${className}`}
      title={trimmed || 'Customer Member'}
    >
      {initials ? (
        <span>{initials}</span>
      ) : (
        <span className="material-symbols-outlined text-base">person</span>
      )}
    </div>
  );
};
