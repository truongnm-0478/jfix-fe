"use client";

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
import { Content } from "@/dataHelper/study.dataHelper";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

interface StudyStatsProps {
  cards: Content[];
}

const StudyStatsCard: React.FC<StudyStatsProps> = ({ cards }) => {
  const { t } = useTranslation();

  const statsData = useMemo(() => {
    const totalCards = cards.length;
    const reviewedCards = cards.filter(
      (card) => card.intervals !== 0 || card.easinessFactor !== 2.5
    );
    const newCards = cards.filter(
      (card) => card.intervals === 0 && card.easinessFactor === 2.5
    );

    const chartData = [
      {
        name: "stats",
        reviewed: reviewedCards.length,
        new: newCards.length,
      },
    ];

    return {
      totalCards,
      reviewedCards: reviewedCards.length,
      newCards: newCards.length,
      chartData,
    };
  }, [cards]);

  const chartConfig = {
    reviewed: {
      label: t("study_stats.reviewed_cards"),
      color: "hsl(var(--primary))",
    },
    new: {
      label: t("study_stats.new_cards"),
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const totalCards = statsData.reviewedCards + statsData.newCards;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t("study_stats.title")}</CardTitle>
          <CardDescription>{t("study_stats.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <ChartContainer
            config={chartConfig}
            className="h-[230px] justify-center items-center"
          >
            <RadialBarChart
              data={statsData.chartData}
              startAngle={180}
              endAngle={0}
              innerRadius={100}
              outerRadius={164}
            >
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-4xl font-bold"
                          >
                            {totalCards.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {t("study_stats.total_cards")}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="reviewed"
                stackId="a"
                cornerRadius={10}
                fill={chartConfig.reviewed.color}
              />
              <RadialBar
                dataKey="new"
                stackId="a"
                cornerRadius={10}
                fill={chartConfig.new.color}
              />
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
            </RadialBarChart>
          </ChartContainer>
          <div className="rounded-lg bg-muted flex-1 gap-4 w-full text-center mt-[-60px]">
            <div
              role="region"
              className="px-4 py-2 flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground mb-1">
                {t("study_stats.total_cards")}
              </span>
              <span className="text-2xl font-bold text-primary">
                {statsData.totalCards}
              </span>
            </div>
            <div
              role="region"
              className="px-4 py-2 flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground mb-1">
                {t("study_stats.reviewed_cards")}
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold text-yellow-500"
                  aria-label={`${t("study_stats.reviewed_cards")}: ${
                    statsData.reviewedCards
                  }`}
                >
                  {statsData.reviewedCards}
                </span>
                <span className="text-sm text-muted-foreground">
                  (
                  {Math.round(
                    (statsData.reviewedCards / statsData.totalCards) * 100
                  )}
                  %)
                </span>
              </span>
            </div>
            <div
              role="region"
              className="px-4 py-2 flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground mb-1">
                {t("study_stats.new_cards")}
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold text-[hsl(var(--chart-2))]"
                  aria-label={`${t("study_stats.new_cards")}: ${
                    statsData.newCards
                  }`}
                >
                  {statsData.newCards}
                </span>
                <span className="text-sm text-muted-foreground">
                  (
                  {Math.round(
                    (statsData.newCards / statsData.totalCards) * 100
                  )}
                  %)
                </span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyStatsCard;
