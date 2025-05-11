import { studyApi } from "@/services/api/studyApi";
import { formatToDateYMD } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";

export const useGrammar = () => {
    const date = formatToDateYMD(new Date().toISOString());
  
    return useQuery({
      queryKey: ["grammar", date],
      queryFn: () => studyApi.getStudyGrammar(date),
      staleTime: 1000 * 60 * 5,
    });
  };
