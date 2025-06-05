import { AdminParagraphDetail } from "@/dataHelper/adminParagraph.dataHelper";
import { formatDate } from "@/utils/dateUtils";
import React from "react";
import { useTranslation } from "react-i18next";

interface ParagraphInfoProps {
  paragraph?: AdminParagraphDetail;
}

const ParagraphInfo: React.FC<ParagraphInfoProps> = ({ paragraph }) => {
  const { t } = useTranslation();

  const labelClass = "text-base text-gray-500 font-semibold sm:text-end";
  const valueClass = "text-base font-medium break-words";

  if (!paragraph) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminParagraph.japaneseText")}</p>
        <p className={valueClass + " sm:col-span-9 text-justify"}>{paragraph.japaneseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminParagraph.vietnameseText")}</p>
        <p className={valueClass + " sm:col-span-9 text-justify"}>{paragraph.vietnameseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminParagraph.topic")}</p>
        <p className={valueClass + " sm:col-span-9"}>{paragraph.topic}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminParagraph.audio")}</p>
        <div className={valueClass + " sm:col-span-9"}>
          {paragraph.audioUrl ? (
            <audio controls className="w-full max-w-md">
              <source src={paragraph.audioUrl} type="audio/mpeg" />
              {t("adminParagraph.audioNotSupported")}
            </audio>
          ) : (
            t("adminParagraph.noAudio")
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminParagraph.level")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-blue-50 text-blue-500">
            {paragraph.level}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminParagraph.createDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {formatDate(paragraph.createDate || "")} {t("adminParagraph.by")}{" "}
          <span className="text-blue-500">{paragraph.createBy}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminParagraph.updateDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {paragraph.updateDate && (
            <>
              {formatDate(paragraph.updateDate || "")} {t("adminParagraph.by")}{" "}
              <span className="text-blue-500">{paragraph.updateBy}</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default ParagraphInfo;