import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageType } from "@/dataHelper/study.dataHelper";
import { BookOpen } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

interface PageSelectorProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export const PageSelector: React.FC<PageSelectorProps> = ({
  currentPage,
  onPageChange,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 transition-all">
      <CardContent className="pt-7">
        <div className="flex gap-2">
          <Button
            variant={currentPage === "grammar" ? "default" : "outline"}
            onClick={() => onPageChange("grammar")}
            className="flex-1"
          >
            <BookOpen size={16} className="mr-2" />
            {t("common.grammar")}
          </Button>
          <Button
            variant={currentPage === "vocabulary" ? "default" : "outline"}
            onClick={() => onPageChange("vocabulary")}
            className="flex-1"
          >
            <BookOpen size={16} className="mr-2" />
            {t("common.vocab")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
