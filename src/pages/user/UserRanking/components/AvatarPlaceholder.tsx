import React from 'react';

interface AvatarPlaceholderProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AvatarPlaceholder: React.FC<AvatarPlaceholderProps> = ({ 
  name, 
  size = 'md' 
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12',
    lg: 'w-16 h-16 text-lg'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium`}>
      {initials}
    </div>
  );
};