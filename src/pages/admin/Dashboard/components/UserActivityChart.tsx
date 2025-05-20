import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type UserActivityData = {
  name: string;
  users: number;
};

type UserActivityChartProps = {
  data: UserActivityData[];
};

export const UserActivityChart = ({ data }: UserActivityChartProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('adminDashboard.userActivity')}</CardTitle>
        <CardDescription>{t('adminDashboard.userActivityDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#3b82f6" 
                fill="#93c5fd" 
                fillOpacity={0.8} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}; 