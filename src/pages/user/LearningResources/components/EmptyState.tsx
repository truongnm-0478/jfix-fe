import { useTranslation } from "react-i18next";

interface EmptyStateProps {
  selectedLevel: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ selectedLevel }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12 text-muted-foreground">
      {selectedLevel && t("common.noDataFound")}
    </div>
  );
};