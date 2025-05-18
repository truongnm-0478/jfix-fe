import { FreeTalkResquest } from "@/dataHelper/ai.dataHelper";
import { aiApi } from "@/services/api/aiApi";
import { studyApi } from "@/services/api/studyApi";
import { audioBlobToBase64 } from "@/utils/audioUtils";
import { formatToDateYMD } from "@/utils/dateUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useCommunication = () => {
  const { data: freeTalkTopicData, isLoading: freeTalkTopicLoading } = useQuery({
    queryKey: ["freeTalkTopic"],
    queryFn: () => studyApi.getFreeTalkTopic(formatToDateYMD(new Date().toISOString())),
  });

  return {
    freeTalkTopicData,
    freeTalkTopicLoading,
  };
};

export const useSpeechToText = () => {
  const { t } = useTranslation();
  
  const convertSpeechToText = async (audio: Blob): Promise<string> => {
    try {
      const base64data = await audioBlobToBase64(audio);
      const response = await aiApi.speechToText({
        audio_data: base64data,
      });
      
      if (response?.data?.text) {
        return response.data.text;
      }
      return t("learn_communication.communication_error");
    } catch (error) {
      console.error('Speech to text conversion error:', error);
      return t("learn_communication.communication_error");
    }
  };

  return {
    convertSpeechToText,
  };
};

export const useFreeTalk = () => {
  const { mutate: freeTalk } = useMutation({
    mutationFn: (data: FreeTalkResquest) =>
      aiApi.freeTalk(data),
  });

  return {
    freeTalk,
  };
};
