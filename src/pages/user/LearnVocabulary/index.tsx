import LearnButton from "@/components/common/LearnButton";
import Loading from "@/components/common/Loading";
import { studyApi } from "@/services/api/studyApi";
import { formatToDateYMD } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import StudyStats from "./components/StudyStats";
import VocabularyCard from "./components/VocabularyCard";

const LearnVocabulary = () => {
  const { t } = useTranslation();

  const { data: vocabularyData, isLoading: vocabularyLoading } = useQuery({
    queryKey: ["vocabulary"],
    queryFn: () => studyApi.getStudyVocabulary(formatToDateYMD(new Date().toISOString())),
  });

  const allCards = vocabularyData?.flatMap((item) => item.cards) ?? [];

  if (vocabularyLoading) return <Loading />;

  return (
    <div className="min-h-screen py-8 px-2">
      <div className="px-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 order-1 lg:order-2 pb-10 flex flex-col gap-4">
        <StudyStats cards={allCards} />

        <LearnButton onLearn={() => {}}/>
        </div>
        <div className="lg:col-span-8 order-2 lg:order-1">
          <h2 className="font-extrabold text-2xl mb-6 text-center lg:text-left">
            {t("learn_vocabulary.title")}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {allCards.map((vocabulary) => (
              <VocabularyCard key={vocabulary.id} vocabulary={vocabulary} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnVocabulary;
