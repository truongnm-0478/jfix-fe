import { AdminSentenceDetail } from "@/dataHelper/adminSentence.dataHelper";
import { formatDate } from "@/utils/dateUtils";
import React from "react";
import { useTranslation } from "react-i18next";

interface SentenceInfoProps {
  sentence?: AdminSentenceDetail;
}

const SentenceInfo: React.FC<SentenceInfoProps> = ({ sentence }) => {
  const { t } = useTranslation();

  const labelClass = "text-base text-gray-500 font-semibold sm:text-end";
  const valueClass = "text-base font-medium break-words";

  if (!sentence) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSentence.japaneseText")}</p>
        <p className={valueClass + " sm:col-span-9"}>{sentence.japaneseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSentence.vietnameseText")}</p>
        <p className={valueClass + " sm:col-span-9"}>{sentence.vietnameseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSentence.audio")}</p>
        <div className={valueClass + " sm:col-span-9"}>
          {sentence.audioUrl ? (
            <audio controls className="w-full max-w-md">
              <source src={sentence.audioUrl} type="audio/mpeg" />
              {t("adminSentence.audioNotSupported")}
            </audio>
          ) : (
            t("adminSentence.noAudio")
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSentence.level")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-blue-50 text-blue-500">
            {sentence.level}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSentence.createDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {formatDate(sentence.createDate || "")} {t("adminSentence.by")}{" "}
          <span className="text-blue-500">{sentence.createBy}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminSentence.updateDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {sentence.updateDate && (
            <>
              {formatDate(sentence.updateDate || "")} {t("adminSentence.by")}{" "}
              <span className="text-blue-500">{sentence.updateBy}</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default SentenceInfo; 