import LearnNowCard from "@/components/card/LearnNewCard";
import StudyStatsCard from "@/components/card/StudyStatsCard";
import Loading from "@/components/common/Loading";
import { studyApi } from "@/services/api/studyApi";
import { formatToDateYMD } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import VocabularyCard from "./components/VocabularyCard";

const LearnVocabulary = () => {
  const { t } = useTranslation();

  const { data: vocabularyData, isLoading: vocabularyLoading } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: () =>
      studyApi.getStudyVocabulary(formatToDateYMD(new Date().toISOString())),
  });

  const allCards = vocabularyData?.flatMap((item) => item.cards) ?? [];

  if (vocabularyLoading) return <Loading />;

  return (
    <div className="min-h-screen xl:py-8 py-4 xl:px-2 px-0">
      <div className="xl:px-5 px-0 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 order-1 xl:order-2 pb-10 flex flex-col gap-4">
          <StudyStatsCard cards={allCards} />

          <LearnNowCard onLearn={() => {}} />
        </div>
        <div className="xl:col-span-8 order-2 xl:order-1 pb-8 md:pb-0">
          <h2 className="font-extrabold text-2xl mb-6 text-center lg:text-left">
            {t("learn_vocabulary.title")}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {allCards.map((content) => (
              <VocabularyCard key={content.id} content={content} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnVocabulary;
