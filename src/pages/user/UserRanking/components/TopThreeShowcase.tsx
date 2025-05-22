import { UserCardCount, UserStreak } from '@/dataHelper/user.dataHelper';
import { motion } from 'framer-motion';
import { BookOpen, Crown, Flame } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserAvatar } from './UserAvatar';

interface TopThreeShowcaseProps {
  data: (UserStreak | UserCardCount)[];
  type: 'streak' | 'cards';
}

export const TopThreeShowcase: React.FC<TopThreeShowcaseProps> = ({ data, type }) => {
  const { t } = useTranslation();
  
  const getIcon = () => type === 'streak' ? Flame : BookOpen;
  const getIconColor = () => type === 'streak' ? 'text-red-500' : 'text-blue-500';
  
  const getGradient = (index: number) => {
    if (index === 0) {
      return type === 'streak' 
        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
        : 'bg-gradient-to-r from-blue-400 to-purple-600';
    }
    return index === 1 
      ? 'bg-gradient-to-r from-slate-300 to-slate-500'
      : 'bg-gradient-to-r from-amber-600 to-amber-800';
  };

  const getBadgeColor = (index: number) => {
    if (index === 0) {
      return type === 'streak' ? 'bg-yellow-500' : 'bg-blue-500';
    }
    return index === 1 ? 'bg-slate-400' : 'bg-amber-700';
  };

  const getValue = (user: UserStreak | UserCardCount) => {
    return 'streak' in user ? user.streak : user.cardCount;
  };

  const getUnit = () => type === 'streak' ? 'ngày' : 'thẻ';
  const Icon = getIcon();

  const getAvatarSize = (index: number, isMobile: boolean = false) => {
    if (isMobile) {
      return index === 0 ? 'w-20 h-20' : 'w-16 h-16';
    }
    return index === 0 ? 'w-24 h-24 lg:w-28 lg:h-28' : 'w-20 h-20 lg:w-24 lg:h-24';
  };

  const getTextSize = (index: number) => {
    return index === 0 
      ? 'text-lg sm:text-xl lg:text-2xl font-bold' 
      : 'text-base sm:text-lg font-medium';
  };

  const getCrownSize = () => 'w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12';

  return (
    <div className="w-full sm:px-6 lg:px-8">
      {/* Mobile Layout (< md) */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {data.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 120
              }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-100 border-b-4"
            >
              {/* Ranking Badge */}
              <div className="flex-shrink-0 relative">
                {index === 0 && (
                  <Crown className="absolute -top-4 left-7 w-6 h-6 text-yellow-500 z-10" />
                )}
                <div className={`rounded-full p-0.5 ${getGradient(index)} ${getAvatarSize(index, true)}`}>
                  <div className="bg-white rounded-full w-full h-full flex items-center justify-center overflow-hidden">
                    <UserAvatar 
                      avatar={user.avatar} 
                      name={user.name}
                      size={index === 0 ? 'md' : 'sm'}
                    />
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`py-1 px-2 rounded-full text-white text-xs ${getBadgeColor(index)}`}>
                    #{index + 1}
                  </div>
                  <h3 className={`font-bold text-slate-800 truncate ${getTextSize(index)}`}>
                    {user.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <Icon className={`w-4 h-4 ${getIconColor()}`} />
                  <span className={`font-bold ${getIconColor()}`}>{getValue(user)}</span>
                  <span className="text-slate-500 text-sm">{getUnit()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (>= md) */}
      <div className="hidden md:flex justify-center items-end gap-6 lg:gap-8 xl:gap-12">
        {data.slice(0, 3).map((user, index) => {
          const isFirst = index === 0;
          const isSecond = index === 1;
          
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className={`relative flex flex-col items-center max-w-xs ${
                isFirst ? "order-2" : isSecond ? "order-1" : "order-3"
              }`}
            >
              {/* Crown for first place */}
              <div className="absolute -top-10 lg:-top-12">
                {isFirst && <Crown className={`${getCrownSize()} text-yellow-500`} />}
              </div>

              {/* Avatar with gradient border */}
              <div className={`rounded-full p-1 ${getGradient(index)} ${getAvatarSize(index)}`}>
                <div className="bg-white rounded-full w-full h-full flex items-center justify-center overflow-hidden">
                  <UserAvatar 
                    avatar={user.avatar} 
                    name={user.name}
                    size={isFirst ? 'lg' : 'md'}
                  />
                </div>
              </div>

              {/* User details */}
              <div className={`text-center mt-3 lg:mt-4 w-full ${getTextSize(index)}`}>
                <p className="font-bold text-slate-800 truncate max-w-full px-2 mb-2">
                  {user.name}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Icon className={`w-4 h-4 lg:w-5 lg:h-5 ${getIconColor()}`} />
                  <span className={`font-bold text-lg lg:text-xl ${getIconColor()}`}>
                    {getValue(user)}
                  </span>
                  <span className="text-slate-500 text-sm lg:text-base ml-1">
                    {getUnit()}
                  </span>
                </div>

                {/* Ranking badge */}
                <div className={`inline-block py-2 px-4 lg:px-6 rounded-full text-white text-sm lg:text-base font-medium ${getBadgeColor(index)} shadow-lg`}>
                  {t('userRanking.rank')} {index + 1}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};