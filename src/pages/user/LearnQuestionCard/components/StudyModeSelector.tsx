import { ArrowDownWideNarrow, Keyboard, Mic } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StudyMode, StudyModes } from "../constant";

interface StudyModeSelectorProps {
  currentMode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
}

export const StudyModeSelector = ({
  currentMode,
  onModeChange,
}: StudyModeSelectorProps) => {
  const { t } = useTranslation();

  const modes = [
    {
      id: StudyModes.ARRANGE,
      label: t("learn_question.arrange_mode"),
      icon: ArrowDownWideNarrow,
    },
    {
      id: StudyModes.INPUT,
      label: t("learn_question.input_mode"),
      icon: Keyboard,
    },
    {
      id: StudyModes.RECORD,
      label: t("learn_question.record_mode"),
      icon: Mic,
    },
  ];

  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
      {modes.map((mode, index) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`
          flex items-center gap-2 px-4 py-2 text-sm font-medium
          transition-colors duration-200
          ${
            isActive
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }
          ${index === 0 ? "rounded-l-lg" : ""}
          ${index === modes.length - 1 ? "rounded-r-lg" : ""}
          border-r border-gray-200 last:border-r-0
        `}
            aria-pressed={isActive}
          >
            <Icon className="w-4 h-4" />
            <span className="md:block hidden">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
};
