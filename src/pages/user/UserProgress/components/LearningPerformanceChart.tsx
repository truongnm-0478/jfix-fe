import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatToDateDMY, formatToDateDMYY } from "@/utils/dateUtils";
import { useTranslation } from "react-i18next";
import { CartesianGrid, Legend, Line, LineChart, TooltipProps, XAxis, YAxis } from "recharts";
type FormatterType = TooltipProps<any, any>['formatter'];

interface LearningPerformanceChartProps {
  cardsOverTime: {
    date: string;
    count: number;
  }[];
  errorImprovement: {
    date: string;
    errorCount: number;
  }[];
  chartConfig: ChartConfig;
}

export const LearningPerformanceChart: React.FC<LearningPerformanceChartProps> = ({
  cardsOverTime,
  errorImprovement,
  chartConfig,
}) => {
  const { t } = useTranslation();
  const combinedData = cardsOverTime.map(cardData => {
    const errorData = errorImprovement.find(error => error.date === cardData.date);
    return {
      date: cardData.date,
      count: cardData.count,
      errorCount: errorData?.errorCount || 0
    };
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-bold text-green-500">
            {t("userProgress.learningPerformanceChartTitle")}
          </CardTitle>
        </div>
        <CardDescription className="text-sm">
          {t("userProgress.learningPerformanceChartDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full p-4">
          <ChartContainer config={chartConfig} className="lg:h-72 h-full w-full">
            <LineChart
              data={combinedData}
              margin={{ top: 0, right: 0, bottom:0, left: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-muted/30"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatToDateDMYY}
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              {/* Left Y-axis for cards learned */}
              <YAxis 
                yAxisId="cards"
                className="text-xs fill-muted-foreground"
                orientation="left"
                axisLine={false}
                tickLine={false}
                dx={-10}
                label={{ 
                  value: t("userProgress.totalCards"), 
                  angle: -90, 
                  position: 'insideLeft',
                  className: "fill-muted-foreground text-xs"
                }}
              />
              {/* Right Y-axis for errors */}
              <YAxis
                yAxisId="errors"
                orientation="right"
                className="text-xs fill-muted-foreground"
                axisLine={false}
                tickLine={false}
                dx={10}
                label={{ 
                  value: t("userProgress.errors"), 
                  angle: 90, 
                  position: 'insideRight',
                  className: "fill-muted-foreground text-xs"
                }}
              />
              <Line
                yAxisId="cards"
                type="monotone"
                dataKey="count"
                stroke="#10B981"
                strokeWidth={2}
                name="Thẻ đã học"
                dot={false}
                activeDot={{ 
                  r: 8,
                  className: "animate-pulse"
                }}
                animationDuration={2000}
                className="filter"
              />
              <Line
                yAxisId="errors"
                type="monotone"
                dataKey="errorCount"
                stroke="#EF4444"
                strokeWidth={2}
                name="Số lỗi"
                dot={false}
                activeDot={{ 
                  r: 8,
                  className: "animate-pulse"
                }}
                animationDuration={2000}
                className="filter"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={
                      ((value, name) => {
                        if (name === t("userProgress.totalCards")) return [`${value} ${t("userProgress.cards")}`, name];
                        return [`${value} `, name];
                      }) as FormatterType
                    }
                    labelFormatter={(label: string) =>
                      `${t("userProgress.date")}: ${formatToDateDMY(label)}`
                    }
                  />
                }
                cursor={{ 
                  stroke: "var(--border)",
                  strokeWidth: 1,
                  strokeDasharray: "5 5"
                }}
              />
              <Legend 
                verticalAlign="top"
                height={24}
                iconType="circle"
                iconSize={16}
                className="text-sm fill-muted-foreground"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
