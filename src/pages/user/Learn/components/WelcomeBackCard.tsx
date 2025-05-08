import React from "react";
import { useTranslation } from "react-i18next";

const WelcomeBackCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-between text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-[40px] p-8 md:p-12 min-h-[260px] overflow-hidden mb-8"
      tabIndex={0}
    >
      <div className="flex-1 z-10">
        <h3 className="font-extrabold text-white text-3xl md:text-2xl mb-4">
          {t("learn.welcomeBack")}
        </h3>
        <p className="text-white text-md md:text-md">
          {t("learn.motivation")}
        </p>
      </div>
      <div className="flex-1 flex justify-end items-end h-full z-10">
        <img
          src="/app/images/bg/3.png"
          alt=""
          className="w-[220px] md:w-[320px] h-auto object-contain"
          draggable={false}
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
      </div>
    </div>
  );
};

export default WelcomeBackCard;
