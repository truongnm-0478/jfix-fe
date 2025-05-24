import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const types = ["VOCABULARY", "GRAMMAR", "QUESTION", "SENTENCE", "PARAGRAPH", "FREE_TOPIC"];

export const ReportFilterButtons = ({ selectedType, onSelectType }: {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={!selectedType ? "default" : "secondary"}
        onClick={() => onSelectType(null)}
        className="text-sm border border-slate-200"
      >
        {t("notification.all")}
      </Button>
      {types.map((type) => (
        <Button
          key={type}
          variant={selectedType === type ? "default" : "secondary"}
          onClick={() => onSelectType(type)}
          className="text-sm min-w-28 border border-slate-200"
        >
          {t(`notification.${type.toLowerCase()}`)}
        </Button>
      ))}
    </div>
  );
};