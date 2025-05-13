import { Card } from "@/components/ui/card";
import { getJapaneseListeningExerciseState, removeJapaneseListeningExerciseState, setJapaneseListeningExerciseState } from "@/utils/storage";
import {
  ArrowRight,
  Award,
  Check,
  Eye,
  EyeOff,
  Languages,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  createFillInTheBlank,
  ExerciseItem,
  extractTextFromFurigana,
  SavedExerciseState,
} from "../helper";
interface FillInTheBlanksProps {
  japaneseText: string;
  vietnameseText: string;
  onNext: (result: {
    correctCount: number;
    correctText: string;
    userText: string;
  }) => void;
}

export const FillInTheBlanks = ({
  japaneseText,
  vietnameseText,
  onNext,
}: FillInTheBlanksProps) => {
  const { t } = useTranslation();
  const [exercise, setExercise] = useState<ExerciseItem[]>([]);
  const [blankPositions, setBlankPositions] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showVietnamese, setShowVietnamese] = useState(false);
  const [allBlanksFilled, setAllBlanksFilled] = useState(false);

  const generateFullText = (useUserAnswers: boolean = false) => {
    return exercise.map(item => {
      if (item.type === 'text') {
        return item.text + item.punctuation;
      } else {
        return (useUserAnswers ? item.userAnswer : item.answer) + item.punctuation;
      }
    }).join('');
  };

  useEffect(() => {
    const savedState = getJapaneseListeningExerciseState();
    const plainText = extractTextFromFurigana(japaneseText);
    
    if (savedState) {
      try {
        const parsedState: SavedExerciseState = JSON.parse(savedState);
        const { exercise: newExercise, blankPositions: newBlankPositions } =
          createFillInTheBlank(plainText, parsedState);
        setExercise(newExercise);
        setBlankPositions(newBlankPositions);
      } catch (error) {
        console.error("Error loading saved state:", error);
        const { exercise: newExercise, blankPositions: newBlankPositions } =
          createFillInTheBlank(plainText);
        setExercise(newExercise);
        setBlankPositions(newBlankPositions);
      }
    } else {
      const { exercise: newExercise, blankPositions: newBlankPositions } =
        createFillInTheBlank(plainText);
      setExercise(newExercise);
      setBlankPositions(newBlankPositions);
    }
  }, [japaneseText]);

  useEffect(() => {
    // Check if all blanks are filled whenever exercise changes
    const isFilled = exercise
      .filter((item): item is (typeof exercise)[number] & { type: "blank" } => item.type === "blank")
      .every((item) => item.userAnswer.trim() !== "");
    setAllBlanksFilled(isFilled);
  }, [exercise]);

  // Save state to localStorage whenever exercise changes
  useEffect(() => {
    if (exercise.length > 0) {
      const blankSegments = exercise.filter(
        (item): item is (typeof exercise)[number] & { type: "blank" } =>
          item.type === "blank"
      );
      const savedState: SavedExerciseState = {
        blankPositions,
        userAnswers: blankSegments.map((item) => item.userAnswer),
      };
      setJapaneseListeningExerciseState(JSON.stringify(savedState));
    }
  }, [exercise, blankPositions]);

  const handleInputChange = (index: number, value: string) => {
    const newExercise = [...exercise];
    if (newExercise[index].type === "blank") {
      newExercise[index] = {
        ...newExercise[index],
        userAnswer: value,
      } as (typeof newExercise)[number];
    }
    setExercise(newExercise);
  };

  const checkAnswers = () => {
    const newExercise = exercise.map((item) => {
      if (item.type === "blank") {
        return {
          ...item,
          isCorrect: item.userAnswer.trim() === item.answer.trim(),
        };
      }
      return item;
    });

    const correctAnswers = newExercise.filter(
      (item): item is (typeof newExercise)[number] & { type: "blank" } =>
        item.type === "blank" && item.isCorrect
    ).length;

    setExercise(newExercise);
    setShowResults(true);
    setShowAnswers(false);
    setCorrectCount(correctAnswers);

    const allAnswersCorrect = correctAnswers === blankPositions.length;
    setAllCorrect(allAnswersCorrect);
  };

  const resetExercise = () => {
    const newExercise = exercise.map((item) => {
      if (item.type === "blank") {
        return {
          ...item,
          userAnswer: "",
          isCorrect: null,
        };
      }
      return item;
    });

    setExercise(newExercise);
    setShowResults(false);
    setShowAnswers(false);
    setAllCorrect(false);
    setCorrectCount(0);

    // Update localStorage with reset answers
    const savedState: SavedExerciseState = {
      blankPositions,
      userAnswers: new Array(blankPositions.length).fill(""),
    };
    setJapaneseListeningExerciseState(JSON.stringify(savedState));
  };

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const handleNext = () => {
    const correctText = generateFullText(false);
    const userText = generateFullText(true);

    onNext({
      correctCount,
      correctText,
      userText,
    });
    removeJapaneseListeningExerciseState();
  };

  return (
    <Card className="w-full p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {t("learnListeningCard.fillInTheBlank")}
      </h3>

      <div className="mb-6 leading-loose min-h-[120px]">
        {exercise.map((item, index) => {
          if (item.type === "text") {
            return (
              <span key={index}>
                {item.text}
                {item.punctuation}
              </span>
            );
          } else {
            return (
              <span key={index} className="relative inline-block min-h-[70px]">
                {showResults && !item.isCorrect && showAnswers && (
                  <div className="absolute -top-6 left-0 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    {item.answer}
                  </div>
                )}
                <input
                  type="text"
                  value={item.userAnswer}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className={`inline-block w-32 px-3 py-1 mx-1 border-b-2 focus:outline-none transition-colors ${
                    showResults
                      ? item.isCorrect
                        ? "bg-green-100 border-green-500 text-green-700 rounded-md"
                        : "bg-red-100 border-red-500 text-red-700 rounded-md"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  placeholder="..."
                />
                {item.punctuation}
              </span>
            );
          }
        })}
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 ">
        <button
          onClick={checkAnswers}
          disabled={showResults || !allBlanksFilled}
          className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={!allBlanksFilled ? t("learnListeningCard.pleaseCompleteAllBlanks") : ""}
        >
          <Check size={20} className="inline mr-2" />
          {t("learnListeningCard.checkAnswers")}
        </button>

        <button
          onClick={resetExercise}
          className="px-6 py-2 text-sm bg-slate-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={20} className="inline mr-2" />
          {t("learnListeningCard.resetExercise")}
        </button>

        {showResults && !allCorrect && (
          <button
            onClick={toggleShowAnswers}
            className="px-6 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {showAnswers ? (
              <>
                <EyeOff size={20} className="inline mr-2" />
                {t("learnListeningCard.hideAnswers")}
              </>
            ) : (
              <>
                <Eye size={20} className="inline mr-2" />
                {t("learnListeningCard.showAnswers")}
              </>
            )}
          </button>
        )}

        {showResults && (
          <button
            onClick={() => setShowVietnamese(!showVietnamese)}
            className="px-6 py-2 text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            <Languages size={20} className="inline mr-2" />
            {showVietnamese ? "Ẩn tiếng việt" : "Hiện tiếng việt"}
          </button>
        )}
      </div>

      {showVietnamese && (
        <div className="border border-1 border-dashed border-gray-300 rounded-md py-6 px-4 my-6">
          <p className="text-md text-gray-500 font-light">
            {vietnameseText}
          </p>
        </div>
      )}

      {showResults && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            allCorrect
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {allCorrect ? (
            <div className="flex items-center">
              <Award size={24} className="mr-2" />
              <span className="font-semibold">
                {t("learnListeningCard.excellent")}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <X size={24} className="mr-2" />
              <span>
                {`${t("learnListeningCard.youHaveAnsweredCorrectly")} ${correctCount}/${blankPositions.length} ${t("learnListeningCard.questions")} `}
                {!showAnswers && t("learnListeningCard.clickShowAnswersToSeeCorrectAnswers")}
              </span>
            </div>
          )}
        </div>
      )}
      {showResults && (
        <div className="mt-6 flex justify-end">
          <button
          onClick={handleNext}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors ml-auto"
        >
          <ArrowRight size={20} className="inline mr-2" />
          {t("learnListeningCard.next")}
        </button>
        </div>
      )}
    </Card>
  );
};
