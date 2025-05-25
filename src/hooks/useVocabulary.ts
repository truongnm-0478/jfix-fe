import { studyApi } from "@/services/api/studyApi";
import { formatToDateYMD } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";

export const useVocabulary = () => {
  const date = formatToDateYMD(new Date().toISOString());

  return useQuery({
    queryKey: ["vocabulary", date],
    queryFn: () => studyApi.getStudyVocabulary(date),
    staleTime: 1000 * 60 * 5,
  });
};

export const useVocabularyByLevel = (level: string) => {
  return useQuery({
    queryKey: ["vocabulary-by-level", level],
    queryFn: () => studyApi.getVocabularyByLevel(level),
    staleTime: 1000 * 60 * 5,
  });
};