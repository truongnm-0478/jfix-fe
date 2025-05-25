import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageType } from "@/dataHelper/study.dataHelper";
import { motion } from "framer-motion";
import { Loader2, Sparkle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FilterSectionProps {
  currentPage: PageType;
  selectedLevel: string;
  selectedChapter: string;
  selectedSection: string;
  chapters: string[];
  sections: string[];
  isLoading: boolean;
  hasError: boolean;
  onLevelChange: (level: string) => void;
  onChapterChange: (chapter: string) => void;
  onSectionChange: (section: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  currentPage,
  selectedLevel,
  selectedChapter,
  selectedSection,
  chapters,
  sections,
  isLoading,
  hasError,
  onLevelChange,
  onChapterChange,
  onSectionChange,
}) => {
  const { t } = useTranslation();
  const levels = ["N5", "N4", "N3", "N2", "N1"];

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 transition-all relative">
      <CardContent className="space-y-4">
        {hasError && (
          <Alert variant="destructive">
            <AlertDescription>{t("common.error")}</AlertDescription>
          </Alert>
        )}

        <motion.div
          variants={sparkleVariants}
          animate="animate"
          className="absolute top-6 right-10"
        >
          <Sparkle className="w-7 h-7 text-yellow-400/60" />
        </motion.div>

        {/* Level Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium">{t("common.level")}</label>
          <div className="relative">
            <Select
              value={selectedLevel}
              onValueChange={onLevelChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isLoading && (
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Chapter and Section filters for vocabulary page */}
        {currentPage === "vocabulary" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("common.chapter")}
              </label>
              <Select
                value={selectedChapter}
                onValueChange={onChapterChange}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("common.allLevels")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.allLevels")}</SelectItem>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter} value={chapter}>
                      {t("common.chapter")} {chapter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t("common.section")}
              </label>
              <Select
                value={selectedSection}
                onValueChange={onSectionChange}
                disabled={!selectedChapter || isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("common.allLevels")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("common.allLevels")}</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {t("common.section")} {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
