import { PageType } from "@/dataHelper/study.dataHelper";
import { FilterSection } from "./FilterSection";
import { PageSelector } from "./PageSelector";
import { ResultsCounter } from "./ResultsCounter";
import { SettingLearnGoal } from "./SettingLearnGoal";

interface LearningResourcesSidebarProps {
  currentPage: PageType;
  selectedLevel: string;
  selectedChapter: string;
  selectedSection: string;
  chapters: string[];
  sections: string[];
  isLoading: boolean;
  hasError: boolean;
  grammarCount: number;
  vocabularyCount: number;
  onPageChange: (page: PageType) => void;
  onLevelChange: (level: string) => void;
  onChapterChange: (chapter: string) => void;
  onSectionChange: (section: string) => void;
}

export const LearningResourcesSidebar: React.FC<
  LearningResourcesSidebarProps
> = ({
  currentPage,
  selectedLevel,
  selectedChapter,
  selectedSection,
  chapters,
  sections,
  isLoading,
  hasError,
  grammarCount,
  vocabularyCount,
  onPageChange,
  onLevelChange,
  onChapterChange,
  onSectionChange,
}) => {
  return (
    <div className="space-y-4">
      <PageSelector currentPage={currentPage} onPageChange={onPageChange} />

      <FilterSection
        currentPage={currentPage}
        selectedLevel={selectedLevel}
        selectedChapter={selectedChapter}
        selectedSection={selectedSection}
        chapters={chapters}
        sections={sections}
        isLoading={isLoading}
        hasError={hasError}
        onLevelChange={onLevelChange}
        onChapterChange={onChapterChange}
        onSectionChange={onSectionChange}
      />

      <ResultsCounter
        currentPage={currentPage}
        grammarCount={grammarCount}
        vocabularyCount={vocabularyCount}
      />
      <SettingLearnGoal />
    </div>
  );
};
