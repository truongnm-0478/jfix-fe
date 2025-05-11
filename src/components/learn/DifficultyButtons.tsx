import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export interface DifficultyButtonsProps {
  onSelect: (difficulty: number) => void;
  className?: string;
  buttonLabels?: {
    again: number;
    hard: number;
    good: number;
    easy: number;
  };
}

export const DifficultyButtons: React.FC<DifficultyButtonsProps> = ({
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row gap-2 justify-center h-8">
      <Button
        onClick={() => onSelect(1)}
        className="md:px-6 px-4 py-2 bg-red-500 text-white text-sm sm:text-base font-medium rounded-lg shadow hover:bg-red-600 transition-colors"
      >
        {t("common.again")}
      </Button>
      <Button
        onClick={() => onSelect(2)}
        className="md:px-6 px-4 py-2 bg-orange-500 text-white text-sm sm:text-base font-medium rounded-lg shadow hover:bg-orange-600 transition-colors"
      >
        {t("common.hard")}
      </Button>
      <Button
        onClick={() => onSelect(3)}
        className="md:px-6 px-4 py-2 bg-green-500 text-white text-sm sm:text-base font-medium rounded-lg shadow hover:bg-green-600 transition-colors"
      >
        {t("common.good")}
      </Button>
      <Button
        onClick={() => onSelect(4)}
        className="md:px-6 px-4 py-2 bg-blue-500 text-white text-sm sm:text-base font-medium rounded-lg shadow hover:bg-blue-600 transition-colors"
      >
        {t("common.easy")}
      </Button>
    </div>
  );
};
