import { Card } from "@/components/ui/card";
import { GrammarItem } from "@/dataHelper/study.dataHelper";
import { getColorByLevel } from "@/utils/lessonUtils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const GrammarCard: React.FC<{ item: GrammarItem }> = ({ item }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="bg-white p-6 hover:border-primary/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {item.structure}
            </h3>
            <span className="text-sm text-gray-600">({item.romaji})</span>
            <span className={`${getColorByLevel(item.level)} px-3 py-1 rounded text-xs font-semibold`}>
              {item.level}
            </span>
          </div>
          <p className="text-primary font-semibold mb-2">{item.meaning}</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4 border-t pt-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">
              {t("learn_grammar.usage")}:
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.usage}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">
              {t("learn_grammar.example")}:
            </h4>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-lg mb-2 font-medium">{item.example}</p>
              <p className="text-gray-600 text-sm">{item.exampleMeaning}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
