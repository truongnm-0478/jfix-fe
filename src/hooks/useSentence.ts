import { studyApi } from "@/services/api/studyApi";
import { formatToDateYMD } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";

export const useSentence = () => {
  return useQuery({
    queryKey: ["sentence"],
    queryFn: () => studyApi.getSentence(formatToDateYMD(new Date().toISOString())),
    staleTime: 1000 * 60 * 5,
  });
};