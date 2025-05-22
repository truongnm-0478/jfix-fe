import { Achievement } from '@/dataHelper/achievement.dataHelper';
import { formatToDateDMY } from '@/utils/dateUtils';
import { motion } from 'framer-motion';
import { Award, BookOpen, Calendar, Flame, Star, Trophy } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '../common/Avatar';

interface UserAchievementCardProps {
  username: string;
  name: string;
  avatar: string;
  achievements: Achievement[];
}

export const UserAchievementCard: React.FC<UserAchievementCardProps> = ({
  username,
  name,
  avatar,
  achievements
}) => {
  const { t } = useTranslation();
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'LESSON_COMPLETED':
        return BookOpen;
      case 'STREAK_DAYS':
        return Flame;
      default:
        return Award;
    }
  };

  const getAchievementColor = (type: string) => {
    switch (type) {
      case 'LESSON_COMPLETED':
        return {
          gradient: 'from-blue-500 to-purple-600',
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          icon: 'text-blue-500'
        };
      case 'STREAK_DAYS':
        return {
          gradient: 'from-orange-500 to-red-600',
          bg: 'bg-orange-50',
          text: 'text-orange-600',
          icon: 'text-orange-500'
        };
      default:
        return {
          gradient: 'from-green-500 to-emerald-600',
          bg: 'bg-green-50',
          text: 'text-green-600',
          icon: 'text-green-500'
        };
    }
  };

  const getAchievementLabel = (type: string) => {
    switch (type) {
      case 'LESSON_COMPLETED':
        return t('userAchievementCard.lessonCompleted');
      case 'STREAK_DAYS':
        return t('userAchievementCard.streakDays');
      default:
        return t('userAchievementCard.achievement');
    }
  };

  const getAchievementUnit = (type: string) => {
    switch (type) {
      case 'LESSON_COMPLETED':
        return t('userAchievementCard.lessonCompletedUnit');
      case 'STREAK_DAYS':
        return t('userAchievementCard.streakDaysUnit');
      default:
        return '';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + index * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const avatarVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.2,
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 border-b-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10 p-6">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            variants={avatarVariants}
            className="relative"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
              <Avatar
                name={name}
                avatar={avatar}
                size={64}
                rounded={false}
              />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <Star className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl font-bold text-gray-800 truncate"
            >
              {name}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-500 text-sm"
            >
              @{username}
            </motion.p>
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Trophy className="w-8 h-8 text-yellow-500" />
          </motion.div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-4">
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2"
          >
            <Award className="w-5 h-5 text-purple-500" />
            {t('userAchievementCard.achievement')}
          </motion.h4>

          {achievements.map((achievement, index) => {
            const colors = getAchievementColor(achievement.achievementType);
            const Icon = getAchievementIcon(achievement.achievementType);

            return (
              <motion.div
                key={index}
                custom={index}
                variants={achievementVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className={`${colors.bg} rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colors.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {getAchievementLabel(achievement.achievementType)}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatToDateDMY(achievement.achievementDate)}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${colors.text}`}>
                      {achievement.achievementValue}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getAchievementUnit(achievement.achievementType)}
                    </div>
                  </div>
                </div>

                {/* Progress Bar Effect */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    delay: 0.8 + index * 0.2, 
                    duration: 1,
                    ease: "easeOut"
                  }}
                  className={`h-1 bg-gradient-to-r ${colors.gradient} rounded-full mt-3 opacity-30`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Footer Decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 pt-4 border-t border-gray-100"
        >
          <div className="flex justify-center">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>{t('userAchievementCard.newAchievement')}</span>
              <Star className="w-3 h-3 text-yellow-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};