import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { AvatarPlaceholder } from './AvatarPlaceholder';

interface UserAvatarProps {
  avatar: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  avatar, 
  name, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border border-gray-200 ${className}`}>
      {avatar ? (
        <Avatar
          className="w-full h-full object-cover"
        >
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      ) : (
        <AvatarPlaceholder name={name} size={size} />
      )}
    </div>
  );
};