import { studyApi } from "@/services/api/studyApi";
import { formatToDateYMD } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";

export const useListening = () => {
  const { data: paragraphData, isLoading: paragraphLoading } = useQuery({
    queryKey: ["paragraph"],
    queryFn: () => studyApi.getParagraph(formatToDateYMD(new Date().toISOString())),
  });

  return {
    paragraphData,
    paragraphLoading,
  }
};
