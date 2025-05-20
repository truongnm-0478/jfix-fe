import Loading from '@/components/common/Loading';
import { ROUTERS } from '@/constant';
import { QuestionTypeDistribution, StatsDailyActiveUsers, StatsRecentUsers } from '@/dataHelper/adminDashboard.dataHelper';
import { useDailyActiveUsers, useDashboard, useQuestionTypeDistribution, useRecentUsers } from '@/hooks/useAdminDashboard';
import { useUserStore } from '@/store/useUserStore';
import { formatNumberWithCommas } from '@/utils/numberUtils';
import { useQueryClient } from '@tanstack/react-query';
import { BarChart3, BookOpen, Calendar, Users } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from './components/DashboardHeader';
import { LessonCompletionChart } from './components/LessonCompletionChart';
import { RecentStudentsTable } from './components/RecentStudentsTable';
import { StatCard } from './components/StatCard';
import { UserActivityChart } from './components/UserActivityChart';

const Dashboard = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboard();
  const { data: questionTypeDistribution, isLoading: isQuestionTypeLoading } = useQuestionTypeDistribution();
  const { data: recentUsers, isLoading: isRecentUsersLoading } = useRecentUsers();
  const { data: dailyActiveUsers, isLoading: isDailyActiveUsersLoading } = useDailyActiveUsers();


  const handleExportData = () => {
    console.log('Export data clicked');
    //TODO: Implement export data functionality
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    queryClient.invalidateQueries({ queryKey: ['question-type-distribution'] });
    queryClient.invalidateQueries({ queryKey: ['recent-users'] });
    queryClient.invalidateQueries({ queryKey: ['daily-active-users'] });
  };

  const handleViewAllStudents = () => {
    navigate(ROUTERS.ADMIN_USERS);
  };

  const userActivityChartData = useMemo(() => {
    if (isDailyActiveUsersLoading) return [];
    
    const activeUsersData = dailyActiveUsers?.data
    
    const dataArray = Array.isArray(activeUsersData) 
      ? activeUsersData 
      : [activeUsersData];
    
    return dataArray.map((item: StatsDailyActiveUsers | undefined) => ({
      name: new Date(item?.date || '').toLocaleDateString('vi-VN', { weekday: 'short' }),
      users: item?.activeUsers || 0
    }));
  }, [dailyActiveUsers, isDailyActiveUsersLoading]);

  const lessonCompletionChartData = useMemo(() => {
    if (isQuestionTypeLoading) return [];
    
    const distributionData = questionTypeDistribution?.data
    
    const typeLabels: Record<keyof QuestionTypeDistribution, string> = {
      SPEAKING_QUESTION: t('adminDashboard.speakingQuestion'),
      GRAMMAR: t('adminDashboard.grammar'),
      VOCABULARY: t('adminDashboard.vocabulary'),
      PARAGRAPH: t('adminDashboard.paragraph'),
      SENTENCE: t('adminDashboard.sentence'),
      FREE_TALK_TOPIC: t('adminDashboard.freeTalkTopic')
    };
    
    return Object.entries(distributionData || {}).map(([key, value]) => ({
      name: typeLabels[key as keyof QuestionTypeDistribution] || key,
      complete: value
    }));
  }, [questionTypeDistribution, isQuestionTypeLoading]);

  const recentStudentsData = useMemo(() => {
    if (isRecentUsersLoading) return [];
    
    const usersData = recentUsers?.data
    
    const dataArray = Array.isArray(usersData) 
      ? usersData 
      : [usersData];
    
    return dataArray.map((user: StatsRecentUsers | undefined) => ({
      id: parseInt(user?.id || ''),
      name: user?.name || user?.username || '',
      email: user?.email || '',
      createDate: user?.createDate || '',
      avatar: user?.avatar || ''
    }));
  }, [recentUsers, isRecentUsersLoading]);

  const getCardTrend = (current: number, previous: number): number => {
    if (!previous) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const averageCardsTrend = useMemo(() => {
    const current = dashboardData?.data?.averageCardsPerUserThisMonth || 0;
    const previous = dashboardData?.data?.prevMonthAverageCardsPerUser || 0;
    return getCardTrend(current, previous);
  }, [dashboardData]);

  if (isDashboardLoading || isQuestionTypeLoading || isRecentUsersLoading || isDailyActiveUsersLoading) {
    return <Loading />
  }

  return (
    <div className="flex bg-gray-100 mb-4">
      <div className="w-full">
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <DashboardHeader 
            userName={user?.username || 'Admin'}
            onExportData={handleExportData}
            onRefresh={handleRefresh}
          />

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title={t('adminDashboard.totalUsers')}
              value={formatNumberWithCommas(dashboardData?.data?.totalUsers || 0)}
              icon={<Users size={24} className="text-blue-500" />}
              iconBgColor="bg-blue-100"
              trend={dashboardData?.data?.userPercentChange || 0}
              trendText={t('adminDashboard.comparedToPreviousMonth')}
            />
            <StatCard
              title={t('adminDashboard.newUsers')}
              value={formatNumberWithCommas(dashboardData?.data?.newUsersThisMonth || 0)}
              icon={<BookOpen size={24} className="text-green-500" />}
              iconBgColor="bg-green-100"
              trend={getCardTrend(
                dashboardData?.data?.newUsersThisMonth || 0,
                dashboardData?.data?.prevMonthNewUsers || 0
              )}
              trendText={t('adminDashboard.comparedToPreviousMonth')}
            />
            <StatCard
              title={t('adminDashboard.totalLessons')}
              value={formatNumberWithCommas(dashboardData?.data?.totalLessons || 0)}
              icon={<BarChart3 size={24} className="text-purple-500" />}
              iconBgColor="bg-purple-100"
              trend={dashboardData?.data?.cardPercentChange || 0}
              trendText={t('adminDashboard.comparedToPreviousMonth')}
            />
            <StatCard
              title={t('adminDashboard.averageCards')}
              value={formatNumberWithCommas(dashboardData?.data?.averageCardsPerUserThisMonth || 0)}
              icon={<Calendar size={24} className="text-orange-500" />}
              iconBgColor="bg-orange-100"
              trend={averageCardsTrend}
              trendText={t('adminDashboard.comparedToPreviousMonth')}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <UserActivityChart data={userActivityChartData} />
            <LessonCompletionChart data={lessonCompletionChartData} />
          </div>

          {/* Recent Students Table */}
          <RecentStudentsTable students={recentStudentsData} onViewAll={handleViewAllStudents} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;