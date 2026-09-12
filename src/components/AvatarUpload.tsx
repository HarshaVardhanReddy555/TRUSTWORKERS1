import React, { useState, useRef } from 'react';
import { uploadAvatarToSupabase } from '../lib/supabaseService';
import { Camera, Loader2, User } from 'lucide-react';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  name?: string;
  userId?: string;
  userType?: 'worker' | 'customer';
  onUploadComplete: (url: string) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  subLabel?: string;
  className?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatarUrl,
  name = '',
  userId = 'temp_user',
  userType = 'customer',
  onUploadComplete,
  size = 'lg',
  label = 'Profile Photo',
  subLabel = 'Click to upload your real photo (JPG, PNG, WebP)',
  className = '',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const displayUrl = previewUrl || currentAvatarUrl;

  const sizeClasses = {
    sm: { container: 'w-16 h-16', icon: 'w-7 h-7 text-xs', badge: 'w-6 h-6 p-1 text-[10px]' },
    md: { container: 'w-20 h-20', icon: 'w-8 h-8 text-sm', badge: 'w-7 h-7 p-1.5 text-xs' },
    lg: { container: 'w-24 h-24', icon: 'w-10 h-10 text-base', badge: 'w-8 h-8 p-1.5 text-xs' },
    xl: { container: 'w-28 h-28', icon: 'w-12 h-12 text-lg', badge: 'w-9 h-9 p-2 text-sm' },
  };

  const currentSize = sizeClasses[size] || sizeClasses.lg;

  // Derive user initials if name exists
  const trimmedName = name.trim();
  const initials = trimmedName
    ? trimmedName
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('')
    : '';

  const handleContainerClick = () => {
    if (isUploading) return;
    setErrorMessage(null);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate that it's an image
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size must be under 5MB.');
      return;
    }

    // Immediate preview for instantaneous visual feedback
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);
    setErrorMessage(null);

    try {
      const uploadedUrl = await uploadAvatarToSupabase(file, userId, userType as 'worker' | 'customer');
      setPreviewUrl(uploadedUrl);
      onUploadComplete(uploadedUrl);
    } catch (err: any) {
      console.warn('Avatar upload error:', err);
      setErrorMessage(err?.message || 'Failed to upload photo. Please try again.');
    } finally {
      setIsUploading(false);
      // Clean up input value so the same file can be re-selected if desired
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={`flex flex-col items-center sm:items-start gap-2 ${className}`}>
      {label && (
        <span className="block text-xs font-bold text-[#1a1c19]">
          {label}
        </span>
      )}

      <div className="flex items-center gap-4">
        {/* Circular Avatar Trigger */}
        <div
          onClick={handleContainerClick}
          className={`relative group rounded-full cursor-pointer transition-all duration-200 border-2 ${
            isUploading
              ? 'border-emerald-500 opacity-90'
              : 'border-[#00342b]/20 hover:border-[#00342b] hover:shadow-md'
          } ${currentSize.container} shrink-0 overflow-visible`}
          title="Click to change profile picture"
        >
          {/* Inner Image or Neutral Placeholder */}
          <div className="w-full h-full rounded-full overflow-hidden bg-[#e8ecea] flex items-center justify-center">
            {displayUrl ? (
              <img
                src={displayUrl}
                alt={name || 'Profile Avatar'}
                className="w-full h-full object-cover"
                onError={() => setPreviewUrl(null)}
              />
            ) : initials ? (
              <div className="w-full h-full bg-gradient-to-br from-[#00342b] to-[#004d40] text-emerald-100 flex items-center justify-center font-bold tracking-wider text-base select-none">
                {initials}
              </div>
            ) : (
              <div className="w-full h-full bg-[#e8ecea] text-[#707975] flex items-center justify-center">
                <User className="w-8 h-8 opacity-60" />
              </div>
            )}
          </div>

          {/* Loading Overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-[#00342b]/70 backdrop-blur-xs rounded-full flex flex-col items-center justify-center text-white z-10">
              <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
              <span className="text-[9px] font-bold mt-1 tracking-tight">Uploading</span>
            </div>
          )}

          {/* Camera Hover Overlay (when not uploading) */}
          {!isUploading && (
            <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Camera className="w-5 h-5 drop-shadow" />
            </div>
          )}

          {/* Camera Badge Pill at bottom-right corner */}
          <div
            className={`absolute -bottom-1 -right-1 bg-[#00342b] text-white rounded-full border-2 border-white shadow-xs flex items-center justify-center transition-transform group-hover:scale-110 ${currentSize.badge}`}
          >
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-emerald-100" />
            )}
          </div>
        </div>

        {/* Upload Description & Controls */}
        <div className="text-left space-y-1">
          <button
            type="button"
            onClick={handleContainerClick}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-[#e3e3de] hover:border-[#00342b] hover:bg-emerald-50/50 text-[#00342b] transition-colors shadow-2xs disabled:opacity-60"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-700" />
            <span>{displayUrl ? 'Change Photo' : 'Upload Real Photo'}</span>
          </button>
          {subLabel && (
            <p className="text-[11px] text-[#707975] max-w-xs leading-tight">
              {subLabel}
            </p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">error</span>
          <span>{errorMessage}</span>
        </p>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
