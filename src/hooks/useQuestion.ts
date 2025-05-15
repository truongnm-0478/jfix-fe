import { StudyMode } from "@/pages/user/LearnQuestionCard/constant";
import { studyApi } from "@/services/api/studyApi";
import { formatToDateYMD } from "@/utils/dateUtils";
import { getStudyMode, setStudyMode } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useQuestion = () => {
  const { data: questionData, isLoading: questionLoading } = useQuery({
    queryKey: ["question"],
    queryFn: () => studyApi.getStudyQuestion(formatToDateYMD(new Date().toISOString())),
  });

  return { questionData, questionLoading };
};

export const useStudyMode = () => {
  const [mode, setMode] = useState<StudyMode>(() => {
    const savedMode = getStudyMode();
    return (savedMode as StudyMode) || 'arrange';
  });

  useEffect(() => {
    setStudyMode(mode);
  }, [mode]);

  return {
    mode,
    setMode,
  };
}; 
