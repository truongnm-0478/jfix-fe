import { Content } from "@/dataHelper/study.dataHelper";
import { Check, X } from "lucide-react";

interface FeedBackProps {
  feedback: {
    correct: boolean;
    message: string;
  };
  data: Content;
}

export const FeedBack = ({ feedback, data }: FeedBackProps) => {
  return (
    <div
      className={`p-4 rounded ${
        feedback.correct
          ? "bg-green-50 border-green-500"
          : "bg-red-50 border-red-500"
      } border-2`}
    >
      <div className="flex items-center gap-2">
        {feedback.correct ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <X className="w-5 h-5 text-red-600" />
        )}
        <p
          className={`font-semibold ${
            feedback.correct ? "text-green-700" : "text-red-700"
          }`}
        >
          {feedback.message}
        </p>
      </div>
      {!feedback.correct && (
        <div className="mt-2">
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={{
              __html: data?.sampleAnswerJapaneseFurigana || "",
            }}
          />
        </div>
      )}
    </div>
  );
};
