import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';

export type StatCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  iconBgColor: string;
  trend: number;
  trendText: string;
};

export const StatCard = ({
  title,
  value,
  icon,
  iconBgColor,
  trend,
  trendText,
}: StatCardProps) => {
  const isPositive = trend >= 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`${iconBgColor} p-3 rounded-full`}>
            {icon}
          </div>
        </div>
        <div className={`flex items-center mt-4 text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          <ArrowUpRight size={16} className={!isPositive ? 'transform rotate-90' : ''} />
          <span className="ml-1">{Math.abs(trend)}% {trendText}</span>
        </div>
      </CardContent>
    </Card>
  );
}; 