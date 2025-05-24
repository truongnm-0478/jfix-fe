import { Badge } from "@/components/ui/badge";
import { ROUTERS } from "@/constant";
import { Report } from "@/dataHelper/report.dataHelper";
import { formatDistanceToNow, Locale } from "date-fns";
import { enUS, ja, vi } from "date-fns/locale";
import { useTranslation } from "react-i18next";

const getItemTypeBadge = (type: string) => {
  const colors: { [key: string]: string } = {
    VOCABULARY: "bg-blue-500",
    GRAMMAR: "bg-green-500",
    QUESTION: "bg-yellow-500",
    SENTENCE: "bg-purple-500",
    PARAGRAPH: "bg-pink-500",
    FREE_TOPIC: "bg-orange-500",
  };
  return colors[type] || "bg-gray-500";
};

const getNavLink = (itemType: string, itemId: number) => {
  switch (itemType) {
    case "VOCABULARY":
      return ROUTERS.ADMIN_VOCABULARY_DETAIL.replace(":id", itemId.toString());
    case "GRAMMAR":
      return ROUTERS.ADMIN_GRAMMAR_DETAIL.replace(":id", itemId.toString());
    case "QUESTION":
      return ROUTERS.ADMIN_QUESTIONS_DETAIL.replace(":id", itemId.toString());
    case "SENTENCE":
      return ROUTERS.ADMIN_SENTENCES_DETAIL.replace(":id", itemId.toString());
    case "PARAGRAPH":
      return ROUTERS.ADMIN_PARAGRAPHS_DETAIL.replace(":id", itemId.toString());
    case "FREE_TOPIC":
      return ROUTERS.ADMIN_FREE_TOPICS_DETAIL.replace(":id", itemId.toString());
    default:
      return "#";
  }
};

export const ReportCard = ({ report, onMarkAsRead }: {
  report: Report;
  onMarkAsRead: (id: number) => void;
}) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const localeMap: Record<string, Locale> = {
    en: enUS,
    vi: vi,
    ja: ja,
  };

  return (
    <div
      className={`p-4 transition-all relative border-b border-slate-200
        ${!report.isRead ? "border-l-4 border-l-primary bg-primary/5" : "bg-white"}`
      }
    >
      {!report.isRead && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" title="Chưa đọc"></span>
      )}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-sm text-primary">{report.username}</h3>
            <Badge variant="outline">{report.userEmail}</Badge>
            <Badge className={getItemTypeBadge(report.itemType)}>
              {report.itemType}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(report.createDate), { addSuffix: true, locale: localeMap[locale] })}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {report.message}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={() => window.open(getNavLink(report.itemType, report.itemId), "_blank")}
          className="text-sm text-blue-500 hover:underline"
        >
          {t("notification.viewItem")}
        </button>
        { !report.isRead && (
          <button
            onClick={() => onMarkAsRead(report.id)}
            className="text-sm text-gray-500 hover:underline"
          >
            {t("notification.markAsRead")}
          </button>
        )}
      </div>
    </div>
  );
};