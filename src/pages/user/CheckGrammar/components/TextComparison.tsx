import { Correction } from "@/dataHelper/ai.dataHelper";
import React from "react";
import { useTranslation } from "react-i18next";

export const TextComparison = ({
  original,
  corrections,
  corrected,
}: {
  original: string;
  corrections: Correction[];
  corrected: string;
}) => {
  const { t } = useTranslation();
  
  const highlightErrors = () => {
    if (!corrections || corrections.length === 0) {
      return <span>{original}</span>;
    }

    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    const sortedCorrections = [...corrections].sort(
      (a, b) => (a.start ?? 0) - (b.start ?? 0)
    );

    sortedCorrections.forEach((correction, idx) => {
      const start = correction.start ?? 0;
      const end = correction.end ?? 0;
      
      if (start > lastIndex) {
        elements.push(
          <span key={`before-${idx}`}>
            {original.substring(lastIndex, start)}
          </span>
        );
      }

      if (start < end) {
        elements.push(
          <span
            key={`error-${idx}`}
            className="bg-red-200 text-red-800 rounded px-1"
            title={correction.description || t("checkGrammar.error")}
          >
            {original.substring(start, end)}
          </span>
        );
      }

      lastIndex = end;
    });

    if (lastIndex < original.length) {
      elements.push(
        <span key="remaining">{original.substring(lastIndex)}</span>
      );
    }

    return <>{elements}</>;
  };

  const highlightCorrections = () => {
    if (!corrections || corrections.length === 0) {
      return <span>{corrected}</span>;
    }

    if (corrected === original) {
      return <span>{corrected}</span>;
    }

    if (!corrected) {
      return <span className="text-gray-400 italic">{t("checkGrammar.noIssuesFound")}</span>;
    }

    type CorrectionPosition = {
      start: number;
      end: number;
      replacement: string;
    };

    const correctionMap: CorrectionPosition[] = [];

    let offset = 0;
    const sortedCorrections = [...corrections].sort(
      (a, b) => (a.start ?? 0) - (b.start ?? 0)
    );

    sortedCorrections.forEach((correction) => {
      const start = correction.start ?? 0;
      const end = correction.end ?? 0;
      const replacement = correction.replacement ?? "";
      
      if (start < end) {
        const origLength = end - start;
        const newLength = replacement.length;

        correctionMap.push({
          start: start + offset,
          end: start + offset + newLength,
          replacement: replacement
        });

        offset += (newLength - origLength);
      }
    });

    if (correctionMap.length === 0) {
      return <span>{corrected}</span>;
    }

    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    correctionMap.forEach((pos, idx) => {
      if (pos.start > lastIndex) {
        const textSegment = corrected.substring(lastIndex, pos.start);
        elements.push(
          <span key={`before-corr-${idx}`}>
            {textSegment}
          </span>
        );
      }

      if (pos.replacement) {
        elements.push(
          <span
            key={`correction-${idx}`}
            className="bg-green-200 text-green-800 rounded px-1"
          >
            {pos.replacement}
          </span>
        );
      }

      lastIndex = pos.end;
    });

    if (lastIndex < corrected.length) {
      const remainingText = corrected.substring(lastIndex);
      elements.push(
        <span key="remaining-corr">{remainingText}</span>
      );
    }

    return <>{elements}</>;
  };

  if (!original && !corrected) {
    return (
      <div className="p-4 text-center text-gray-500">
        {t("checkGrammar.noIssuesFound")}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("checkGrammar.originalText")}</h3>
        <div className="p-3 border rounded bg-white">{highlightErrors()}</div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("checkGrammar.correctedText")}</h3>
        <div className="p-3 border rounded bg-white">
          {highlightCorrections()}
        </div>
      </div>
    </div>
  );
};
