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



  // const { data: vocabularyData, isLoading: vocabularyLoading } = useQuery({
  //   queryKey: ["vocabulary"],
  //   queryFn: () =>
  //     studyApi.getStudyVocabulary(formatToDateYMD(new Date().toISOString())),
  // });

