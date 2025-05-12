import Loading from "@/components/common/Loading";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SpeechToTextResponse } from "@/dataHelper/study.dataHelper";
import { roundNumber } from "@/utils/numberUtils";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  speechToTextResult: SpeechToTextResponse | null;
  isSending: boolean;
  onNextCard: (value: number) => void;
};

const getAccuracyColor = (accuracy: number): string => {
  if (accuracy < 60) return "text-red-600";
  if (accuracy < 80) return "text-yellow-500";
  if (accuracy < 90) return "text-blue-500";
  return "text-green-600";
};

const getAccuracyValue = (accuracy: number): number => {
  if (accuracy < 80) return 0;
  if (accuracy >= 99) return 2;
  return 1;
};

export const SpeechToTextResult: React.FC<Props> = ({
  speechToTextResult,
  isSending,
  onNextCard,
}) => {
  const { t } = useTranslation();
  if (isSending) {
    return (
      <div className="p-4 text-center text-gray-500 animate-pulse">
        <Loading message={t("learn_pronunciation.sending")} />
      </div>
    );
  }

  if (!speechToTextResult) {
    return null;
  }

  return (
    <Card className="p-6 space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="md:text-xl text-lg font-bold text-primary">
          {t("learn_pronunciation.result")}
        </h2>
        {speechToTextResult.match ? (
          <div className="flex items-center text-green-600 font-light text-sm">
            <CheckCircle2 className="mr-2" />
            <span>{t("learn_pronunciation.correct")}</span>
          </div>
        ) : (
          <div className="flex items-center text-red-600 font-light text-sm">
            <XCircle className="mr-2" />
            <span>{t("learn_pronunciation.incorrect")}</span>
          </div>
        )}
      </div>

      <Table className="w-full">
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-gray-700 w-[150px]">
              {t("learn_pronunciation.accuracy")}
            </TableCell>
            <TableCell
              className={`text-lg font-bold ${getAccuracyColor(
                speechToTextResult.accuracy
              )}`}
            >
              {roundNumber(speechToTextResult.accuracy, 2)}%
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium text-gray-700 w-[150px]">
              {t("learn_pronunciation.your_sentence")}
            </TableCell>
            <TableCell className="text-md font-light">
              {speechToTextResult.text}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium text-gray-700 w-[150px]">
              {t("learn_pronunciation.furigana_pronunciation")}
            </TableCell>
            <TableCell className="text-md font-light">
              {speechToTextResult.hiraApi}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {!speechToTextResult.match && (
        <div className="border-t border-slate-200 pt-4">
          <h2 className="md:text-xl text-lg font-bold text-primary">
            {t("learn_pronunciation.error_list")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-2 mt-2">
            {speechToTextResult.wrongJapanese?.map((diff, index) => (
              <div
                key={index}
                className="p-2 border border-dashed border-slate-300 rounded-md"
              >
                <div className="flex justify-around items-center">
                  <span className="bg-green-100 text-green-600 px-1 py-0.5 rounded font-semibold cursor-default min-w-30 text-center">
                    {diff.user || "N/A"}
                  </span>
                  <ArrowRight className="w-4 h-4 mx-2" />
                  <span className="bg-red-100 text-red-600 px-1 py-0.5 rounded font-semibold cursor-default min-w-30 text-center">
                    {diff.api || "N/A"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 text-right">
        <button
          onClick={() => {
            if (speechToTextResult) {
              const value = getAccuracyValue(speechToTextResult.accuracy);
              onNextCard(value);
            }
          }}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          {t("learn_pronunciation.next_card")}
        </button>
      </div>
    </Card>
  );
};

export default SpeechToTextResult;
