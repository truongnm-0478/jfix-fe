import { ChartConfig } from "@/components/ui/chart";

export const chartConfig: ChartConfig = {
  cards: {
    label: "Thẻ",
    theme: {
      light: "hsl(var(--chart-1))",
      dark: "hsl(var(--chart-1))",
    },
  },
  errors: {
    label: "Lỗi",
    theme: {
      light: "hsl(var(--destructive))",
      dark: "hsl(var(--destructive))",
    },
  },
  difficulty: {
    label: "Độ khó",
    theme: {
      light: "hsl(var(--chart-2))",
      dark: "hsl(var(--chart-2))",
    },
  },
  progress: {
    label: "Tiến độ",
    theme: {
      light: "hsl(var(--chart-3))",
      dark: "hsl(var(--chart-3))",
    },
  },
  heatmap: {
    label: "Hoạt động",
    theme: {
      light: "hsl(var(--chart-4))",
      dark: "hsl(var(--chart-4))",
    },
  },
};
