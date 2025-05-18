import { AdminGrammar } from "@/dataHelper/adminGrammar.dataHelper";
import { formatDate } from "@/utils/dateUtils";
import React from "react";
import { useTranslation } from "react-i18next";

interface GrammarInfoProps {
  grammar?: AdminGrammar;
}

const GrammarInfo: React.FC<GrammarInfoProps> = ({ grammar }) => {
  const { t } = useTranslation();

  const labelClass = "text-base text-gray-500 font-semibold sm:text-end";
  const valueClass = "text-base font-medium break-words";

  if (!grammar) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.romaji")}</p>
        <p className={valueClass + " sm:col-span-9"}>{grammar.romaji}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.structure")}</p>
        <p className={valueClass + " sm:col-span-9"}>{grammar.structure}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.usage")}</p>
        <p className={valueClass + " sm:col-span-9 whitespace-pre-line"}>{grammar.usage}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.meaning")}</p>
        <p className={valueClass + " sm:col-span-9 whitespace-pre-line"}>{grammar.meaning}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.example")}</p>
        <p className={valueClass + " sm:col-span-9 whitespace-pre-line"}>{grammar.example}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.exampleMeaning")}</p>
        <p className={valueClass + " sm:col-span-9 whitespace-pre-line"}>{grammar.exampleMeaning}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.level")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          <span className="inline-block rounded-md px-2 py-1 text-sm font-semibold text-center bg-blue-50 text-blue-500">
            {grammar.level}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 border-b border-blue-100 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.createDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {formatDate(grammar.createDate || "")} {t("adminGrammar.by")}{" "}
          <span className="text-blue-500">{grammar.createBy}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-4">
        <p className={labelClass + " sm:col-span-3 font-bold sm:font-semibold text-gray-700 sm:text-gray-500"}>{t("adminGrammar.updateDate")}</p>
        <p className={valueClass + " sm:col-span-9"}>
          {grammar.updateDate && (
            <>
              {formatDate(grammar.updateDate || "")} {t("adminGrammar.by")}{" "}
              <span className="text-blue-500">{grammar.updateBy}</span>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default GrammarInfo; 