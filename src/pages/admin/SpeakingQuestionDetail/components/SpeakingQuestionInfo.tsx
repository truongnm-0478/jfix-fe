import { AdminSpeakingQuestionDetail } from "@/dataHelper/adminSpeakingQuestions.dataHelper";
import { formatDate } from "@/utils/dateUtils";
import React from "react";
import { useTranslation } from "react-i18next";

interface SpeakingQuestionInfoProps {
  speakingQuestion?: AdminSpeakingQuestionDetail;
}

const SpeakingQuestionInfo: React.FC<SpeakingQuestionInfoProps> = ({ speakingQuestion }) => {
  const { t } = useTranslation();

  const labelClass = "text-base text-gray-500 font-semibold sm:text-end";
  const valueClass = "text-base font-medium break-words";

  if (!speakingQuestion) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.japaneseText")}</p>
        <p className={valueClass + " sm:col-span-9"}>{speakingQuestion.japaneseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.vietnameseText")}</p>
        <p className={valueClass + " sm:col-span-9"}>{speakingQuestion.vietnameseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.sampleAnswerJapanese")}</p>
        <p className={valueClass + " sm:col-span-9"}>{speakingQuestion.sampleAnswerJapanese}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.sampleAnswerVietnamese")}</p>
        <p className={valueClass + " sm:col-span-9"}>{speakingQuestion.sampleAnswerVietnamese}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.audio")}</p>
        <div className={valueClass + " sm:col-span-9"}>
          {speakingQuestion.audioUrl ? (
            <audio controls className="w-full max-w-md">
              <source src={speakingQuestion.audioUrl} type="audio/mpeg" />
              {t("adminSpeakingQuestion.audioNotSupported")}
            </audio>
          ) : (
            t("adminSpeakingQuestion.noAudio")
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.level")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-blue-50 text-blue-500">
            {speakingQuestion.level}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.createDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {formatDate(speakingQuestion.createDate || "")} {t("adminSpeakingQuestion.by")}{" "}
          <span className="text-blue-500">{speakingQuestion.createBy}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSpeakingQuestion.updateDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {speakingQuestion.updateDate && (
            <>
              {formatDate(speakingQuestion.updateDate || "")} {t("adminSpeakingQuestion.by")}{" "}
              <span className="text-blue-500">{speakingQuestion.updateBy}</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default SpeakingQuestionInfo; 