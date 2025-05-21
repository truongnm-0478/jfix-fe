import Loading from '@/components/common/Loading';
import { UserCardCount, UserStreak } from '@/dataHelper/user.dataHelper';
import { motion } from 'framer-motion';
import { BookOpen, Flame, Medal, Trophy } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { getMedalColor } from '../helper';
import { UserAvatar } from './UserAvatar';

interface RankingListProps {
  data: (UserStreak | UserCardCount)[];
  type: 'streak' | 'cards';
  isLoading: boolean;
}

export const RankingList: React.FC<RankingListProps> = ({ data, type, isLoading }) => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const getIcon = () => type === 'streak' ? Flame : BookOpen;
  const getIconColor = () => type === 'streak' ? 'text-red-500' : 'text-blue-500';
  const getBgColor = () => type === 'streak' ? 'bg-red-50' : 'bg-blue-50';
  const getValue = (user: UserStreak | UserCardCount) => {
    return 'streak' in user ? user.streak : user.cardCount;
  };
  const getUnit = () => type === 'streak' ? t('userRanking.day') : t('userRanking.card');
  const getMedalIcon = () => type === 'streak' ? Medal : Trophy;

  const Icon = getIcon();
  const MedalIcon = getMedalIcon();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full py-8 sm:py-12">
        <Loading message={t('userRanking.loading')} />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="divide-y divide-gray-100"
    >
      {data.map((user, index) => (
        <motion.div
          key={user.id}
          variants={itemVariants}
          className="flex items-center py-3 px-3 sm:py-4 sm:px-6 hover:bg-gray-50 transition-colors"
        >
          {/* Mobile Layout */}
          <div className="flex sm:hidden w-full items-center gap-3">
            {/* Rank & Medal */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-6 text-center font-bold text-gray-700 text-sm">
                {index + 1}
              </div>
              {index < 3 && (
                <MedalIcon className={`h-5 w-5 ${getMedalColor(index)}`} />
              )}
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0">
              <UserAvatar avatar={user.avatar} name={user.name} size="sm" />
            </div>

            {/* User Info & Stats */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-gray-800 text-sm truncate">
                  {user.name}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 truncate">
                    @{user.username}
                  </p>
                  <div className={`flex items-center gap-1 ${getBgColor()} px-2 py-1 rounded-full flex-shrink-0`}>
                    <Icon className={`h-3 w-3 ${getIconColor()}`} />
                    <span className={`font-bold text-xs ${getIconColor()}`}>
                      {getValue(user)}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {getUnit()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex w-full items-center">
            {/* Rank */}
            <div className="w-10 text-center font-bold text-gray-700">
              {index + 1}
            </div>

            {/* Medal */}
            <div className="flex-shrink-0 ml-2 w-8">
              {index < 3 && (
                <MedalIcon className={`h-6 w-6 ${getMedalColor(index)}`} />
              )}
            </div>

            {/* Avatar */}
            <div className="ml-4 flex-shrink-0">
              <UserAvatar avatar={user.avatar} name={user.name} />
            </div>

            {/* User Info */}
            <div className="ml-4 flex-grow min-w-0">
              <p className="font-semibold text-gray-800 truncate">
                {user.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                @{user.username}
              </p>
            </div>

            {/* Stats */}
            <div className={`flex items-center gap-1 ${getBgColor()} px-3 py-1 rounded-full flex-shrink-0`}>
              <Icon className={`h-4 w-4 ${getIconColor()}`} />
              <span className={`font-bold ${getIconColor()}`}>
                {getValue(user)}
              </span>
              <span className="text-gray-500 text-sm">
                {getUnit()}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};