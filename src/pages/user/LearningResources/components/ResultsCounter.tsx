import { Card, CardContent } from "@/components/ui/card";
import { PageType } from "@/dataHelper/study.dataHelper";
import { useTranslation } from "react-i18next";

interface ResultsCounterProps {
  currentPage: PageType;
  grammarCount: number;
  vocabularyCount: number;
}

export const ResultsCounter: React.FC<ResultsCounterProps> = ({
  currentPage,
  grammarCount,
  vocabularyCount,
}) => {
  const { t } = useTranslation();
  const count = currentPage === "grammar" ? grammarCount : vocabularyCount;

  return (
    <Card className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 transition-all">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          {t("common.found")}{" "}
          <span className="font-semibold text-primary">{count}</span>{" "}
          {t("common.result")}
        </p>
      </CardContent>
    </Card>
  );
};
