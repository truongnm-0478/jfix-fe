import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../constant";
const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-white">
      <div className={`transition-all duration-700${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <img src="/images/404.gif" alt="404 animation" className="w-full h-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl" />
          </div>
          <h2 className="mb-4 text-3xl font-semibold text-gray-800">{t("common.pageNotFound")}</h2>
          <p className="mx-auto mb-8 max-w-lg text-lg text-gray-600">{t("common.pageNotFoundDescription")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-6 font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
              aria-label="Quay lại"
              tabIndex={0}
            >
              <ArrowLeft className="size-5" />
              <span>{t("common.back")}</span>
            </Button>
            <Link
              to={ROUTERS.HOME}
              className="inline-flex items-center gap-2 rounded-md bg-primary-35 px-6 py-3 font-medium text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md"
              aria-label="Quay về trang chủ"
              tabIndex={0}
            >
              <Home className="size-5" />
              <span>{t("common.backToHome")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
