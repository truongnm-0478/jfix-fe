import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface HeatmapData {
  date: string;
  count: number;
}

interface HeatmapProps {
  heatmapData: HeatmapData[];
}

const getColorIntensity = (count: number) => {
  if (count === 0) return "bg-zinc-100 dark:bg-zinc-800";
  if (count <= 10) return "bg-emerald-100 dark:bg-emerald-900/30";
  if (count <= 25) return "bg-emerald-200 dark:bg-emerald-800/40";
  if (count <= 50) return "bg-emerald-300 dark:bg-emerald-700/50";
  if (count <= 100) return "bg-emerald-400 dark:bg-emerald-600/60";
  return "bg-emerald-500 dark:bg-emerald-500/70";
};

const generateDatesForYear = () => {
  const dates: string[] = [];
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1); // January 1st of current year
  const endDate = new Date(currentDate.getFullYear(), 11, 31); // December 31st

  while (startDate <= endDate) {
    dates.push(startDate.toISOString().split('T')[0]);
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};

const generateDatesForLastNMonths = (n: number) => {
  const dates: string[] = [];
  const currentDate = new Date();
  const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // End of current month
  const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - n + 1, 1); // Start of n months ago

  while (startDate <= endDate) {
    dates.push(startDate.toISOString().split("T")[0]);
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};

const getDayOfWeek = (date: string) => {
  return new Date(date).getDay();
};

const getWeekNumber = (date: string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const Heatmap: React.FC<HeatmapProps> = ({ heatmapData }) => {
  const { t } = useTranslation();
  const allDatesWithData = useMemo(() => {
    const allDates = generateDatesForYear();
    const dataMap = new Map(heatmapData.map(d => [d.date, d.count]));
    
    return allDates.map(date => ({
      date,
      count: dataMap.get(date) || 0
    }));
  }, [heatmapData]);

  const currentMonthData = useMemo(() => {
    const monthDates = generateDatesForLastNMonths(4);
    const dataMap = new Map(heatmapData.map(d => [d.date, d.count]));
    
    return monthDates.map(date => ({
      date,
      count: dataMap.get(date) || 0
    }));
  }, [heatmapData]);

  const createWeeks = (dateData: HeatmapData[]) => {
    const result: { [key: string]: HeatmapData[] } = {};
    
    dateData.forEach(day => {
      const weekNum = getWeekNumber(day.date);
      if (!result[weekNum]) {
        result[weekNum] = Array(7).fill(null).map((_, i) => {
          const d = new Date(day.date);
          d.setDate(d.getDate() - d.getDay() + i);
          return {
            date: d.toISOString().split('T')[0],
            count: 0
          };
        });
      }
      const dayOfWeek = getDayOfWeek(day.date);
      result[weekNum][dayOfWeek] = day;
    });

    return result;
  };

  const fullYearWeeks = useMemo(() => createWeeks(allDatesWithData), [allDatesWithData]);
  const currentMonthWeeks = useMemo(() => createWeeks(currentMonthData), [currentMonthData]);

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const renderHeatmap = (weeks: { [key: string]: HeatmapData[] }) => (
    <div className="flex">
      {/* Week day labels */}
      <div className="flex flex-col gap-[3px] text-xs text-muted-foreground pr-3">
        {weekDays.map((day) => (
          <div key={day} className="h-4 flex items-center justify-end">
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-[3px] overflow-x-auto scrollbar-hide">
        {Object.entries(weeks).map(([weekNum, days]) => (
          <div key={weekNum} className="flex flex-col gap-[3px]">
            {days.map((day, dayIndex) => (
              <TooltipProvider key={dayIndex}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-4 h-4 rounded-sm ${getColorIntensity(day.count)}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-100 text-black border-none shadow-lg">
                    <p className="font-medium">{day.count} {t("userProgress.cards")}</p>
                    <p className="text-xs">
                      {t("userProgress.date")}: {day.date}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-cyan-600">{t("userProgress.heatmapTitle")}</CardTitle>
        <CardDescription>{t("userProgress.heatmapDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto scrollbar-hide">
        {/* Full year view for large screens */}
        <div className="hidden md:block">
          {renderHeatmap(fullYearWeeks)}
        </div>

        {/* Current month view for small screens */}
        <div className="block md:hidden">
          {renderHeatmap(currentMonthWeeks)}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-8 justify-end text-xs">
          <span className="text-muted-foreground">{t("userProgress.lessThan")}</span>
          {[0, 10, 25, 50, 100].map((threshold) => (
            <div
              key={threshold}
              className={`w-4 h-4 rounded-sm ${getColorIntensity(threshold)}`}
            />
          ))}
          <span className="text-muted-foreground">{t("userProgress.moreThan")}</span>
        </div>
      </CardContent>
    </Card>
  );
};