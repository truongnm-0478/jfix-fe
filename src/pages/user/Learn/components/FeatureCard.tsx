import { capitalizeAll } from "@/utils/stringUtils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SuperBadge = () => (
  <span className="ml-2 px-2 py-0.5 rounded-md text-xs font-bold text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-sm uppercase tracking-wider">
    {capitalizeAll("AI")}
  </span>
);

export const FeatureCard = ({
  title,
  description,
  icon,
  isSuper,
  path,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  isSuper?: boolean;
  path: string;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  console.log();
  return (
  <div
    className="relative flex items-center bg-white border border-gray-200 border-b-4 rounded-2xl px-5 py-5 mb-4 hover:cursor-pointer"
    onClick={() => {
      console.log(path);
      navigate(path);
    }}
  >
    <div className="flex-1">
      <div className="flex items-center mb-1">
        <span className="font-bold text-lg text-gray-900 text-[#3c3c3c]">
          {t(title)}
        </span>
        {isSuper && <SuperBadge />}
      </div>
      <div className="text-gray-500 text-sm text-primary-600">{t(description)}</div>
    </div>
    <div className="ml-4 flex-shrink-0 opacity-90">{icon}</div>
  </div>
  );
};
