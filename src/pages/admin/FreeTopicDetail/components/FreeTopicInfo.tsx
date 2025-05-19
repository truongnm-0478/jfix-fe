import { FreeTopicDetail } from "@/dataHelper/adminFreeTopic.dataHelper";
import { formatDate } from "@/utils/dateUtils";
import React from "react";
import { useTranslation } from "react-i18next";

interface FreeTopicInfoProps {
  freeTopic?: FreeTopicDetail;
}

const FreeTopicInfo: React.FC<FreeTopicInfoProps> = ({ freeTopic }) => {
  const { t } = useTranslation();

  const labelClass = "text-base text-gray-500 font-semibold sm:text-end";
  const valueClass = "text-base font-medium break-words";

  if (!freeTopic) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminFreeTopic.japaneseText")}</p>
        <p className={valueClass + " sm:col-span-9 whitespace-pre-line"}>{freeTopic.japaneseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminFreeTopic.vietnameseText")}</p>
        <p className={valueClass + " sm:col-span-9 whitespace-pre-line"}>{freeTopic.vietnameseText}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminFreeTopic.conversationPrompt")}</p>
        <p className={valueClass + " sm:col-span-9 whitespace-pre-line"}>{freeTopic.conversationPrompt}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminFreeTopic.level")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-blue-50 text-blue-500">
            {freeTopic.level}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminFreeTopic.createDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {formatDate(freeTopic.createDate || "")} {t("adminFreeTopic.by")}{" "}
          <span className="text-blue-500">{freeTopic.createBy}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminFreeTopic.updateDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {freeTopic.updateDate && (
            <>
              {formatDate(freeTopic.updateDate || "")} {t("adminFreeTopic.by")}{" "}
              <span className="text-blue-500">{freeTopic.updateBy}</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default FreeTopicInfo; 