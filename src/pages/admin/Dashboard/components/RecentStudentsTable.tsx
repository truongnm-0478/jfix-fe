import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow, Locale } from 'date-fns';
import { enUS, ja, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

type User = {
  id: number;
  name: string;
  avatar: string;
  createDate: string;
  email: string;
};

type RecentStudentsTableProps = {
  students: User[];
  onViewAll: () => void;
};

export const RecentStudentsTable = ({ students, onViewAll }: RecentStudentsTableProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const localeMap: Record<string, Locale> = {
    en: enUS,
    vi: vi,
    ja: ja,
  };
  
  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: localeMap[locale] });
    } catch (error) {
      return date;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('adminDashboard.recentUsers')}</CardTitle>
        <CardDescription>{t('adminDashboard.recentUsersDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="font-medium p-4 pl-0">{t('adminUsers.name')}</th>
                <th className="font-medium p-4">{t('adminDashboard.emailLabel')}</th>
                <th className="font-medium p-4 pr-0">{t('adminDashboard.registrationDate')}</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((user) => (
                  <tr key={user.id} className="border-b last:border-b-0">
                    <td className="p-4 pl-0">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <p className="font-medium">{user.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{user.email}</span>
                    </td>
                    <td className="p-4 pr-0">
                      <span className="text-sm text-gray-600">{formatDate(user.createDate)}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    {t('adminDashboard.noUsersFound')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={onViewAll}>
            {t('adminDashboard.viewAllUsers')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 