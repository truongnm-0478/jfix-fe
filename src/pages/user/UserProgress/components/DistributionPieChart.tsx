import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

interface DistributionPieChartProps {
  cardsByDifficulty: {
    difficulty: string;
    count: number;
  }[];
  chartConfig: ChartConfig;
  totalAllCards: number;
}

const colorMap: Record<string, string> = {
  "Chưa học": "#3B82F6" ,
  "Khó": "#EF4444" ,
  "Trung bình": "#F59E0B" ,
  "Dễ": "#10B981",
};

export const DistributionPieChart: React.FC<DistributionPieChartProps> = ({
  cardsByDifficulty,
  chartConfig,
  totalAllCards,
}) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-yellow-500">{t("userProgress.distributionPieChartTitle")}</CardTitle>
        <CardDescription>{t("userProgress.distributionPieChartDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          {/* Biểu đồ */}
          <div className="w-full">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={cardsByDifficulty}
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                barSize={60}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  className="stroke-muted/30"
                  vertical={false}
                />
                <XAxis
                  dataKey="difficulty"
                  className="text-xs fill-muted-foreground"
                  axisLine={false}
                  tickLine={false}
                />
                <Bar
                  dataKey="count"
                  radius={[10, 10, 0, 0]}
                >
                  {cardsByDifficulty.map((entry) => (
                    <Cell
                      key={`cell-${entry.difficulty}`}
                      fill={colorMap[entry.difficulty]}
                    />
                  ))}
                </Bar>
                <ChartTooltip
                  cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => {
                        const percentage = ((Number(value) / totalAllCards) * 100).toFixed(1);
                        return [`${value} thẻ (${percentage}%)`];
                      }}
                    />
                  }
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Chú thích (Legend) */}
          <div className="flex flex-col gap-4 w-full max-w-md">
            {cardsByDifficulty.map((entry) => {
              const percentage = ((entry.count / totalAllCards) * 100).toFixed(1);
              return (
                <div key={entry.difficulty} className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded"
                    style={{
                      backgroundColor: colorMap[entry.difficulty] || "#888888",
                      opacity: 1,
                    }}
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{entry.difficulty}</span>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                    <span className="text-xs text-gray">
                      {entry.count} {t("userProgress.cards")}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Tổng số */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t("userProgress.total")}</span>
                <span className="text-sm font-medium">{totalAllCards} {t("userProgress.cards")}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
