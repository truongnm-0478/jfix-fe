import { formatDate } from "@/utils/dateUtils";
import React from "react";
import { useTranslation } from "react-i18next";

interface VocabularyData {
  word?: string;
  reading?: string;
  meaning?: string;
  exampleWithoutReading?: string;
  exampleWithReading?: string;
  exampleMeaning?: string;
  audio?: string;
  level?: string;
  chapter?: string;
  section?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string;
  updateBy?: string;
}

interface VocabularyInfoProps {
  vocabulary: VocabularyData | undefined;
}

const VocabularyInfo: React.FC<VocabularyInfoProps> = ({ vocabulary }) => {
  const { t } = useTranslation();

  const labelClass = "text-base text-gray-500 font-semibold sm:text-end";
  const valueClass = "text-base font-medium break-words";

  if (!vocabulary) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.word")}</p>
        <p className={valueClass + " sm:col-span-9"}>{vocabulary.word}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.reading")}</p>
        <p className={valueClass + " sm:col-span-9"}>{vocabulary.reading}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.meaning")}</p>
        <p className={valueClass + " sm:col-span-9"}>{vocabulary.meaning}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.exampleWithReading")}</p>
        <p className={valueClass + " sm:col-span-9"}>{vocabulary.exampleWithoutReading}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.exampleMeaning")}</p>
        <p className={valueClass + " sm:col-span-9"}>{vocabulary.exampleMeaning}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.audio")}</p>
        <div className={valueClass + " sm:col-span-9"}>
          {vocabulary.audio ? (
            <audio controls className="w-full max-w-md">
              <source src={vocabulary.audio} type="audio/mpeg" />
              {t("adminVocabulary.audioNotSupported")}
            </audio>
          ) : (
            t("adminVocabulary.noAudio")
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.level")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-blue-50 text-blue-500">
            {vocabulary.level}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.chapter")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-cyan-50 text-cyan-500">
            {vocabulary.chapter}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.section")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-purple-50 text-purple-500">
            {vocabulary.section}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.createDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {formatDate(vocabulary.createDate || "")} {t("adminVocabulary.by")}{" "}
          <span className="text-blue-500">{vocabulary.createBy}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminVocabulary.updateDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {vocabulary.updateDate && (
            <>
              {formatDate(vocabulary.updateDate || "")} {t("adminVocabulary.by")}{" "}
              <span className="text-blue-500">{vocabulary.updateBy}</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default VocabularyInfo; 