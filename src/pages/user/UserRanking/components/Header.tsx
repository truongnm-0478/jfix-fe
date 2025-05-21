import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mb-12">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {t("userRanking.header.title")}
      </h1>
      <p className="text-slate-500 mt-2 text-sm">
        {t("userRanking.header.description")}
      </p>
    </div>
  );
};
