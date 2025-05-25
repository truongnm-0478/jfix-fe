import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ROUTERS } from "@/constant";
import { motion } from 'framer-motion';
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const SettingLearnGoal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${ROUTERS.USER_SETTING}/${ROUTERS.UPDATE_LEARNING_GOAL}`);
  };

  const sparkleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 border-b-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-200/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

      <motion.div
        variants={sparkleVariants}
        animate="animate"
        className="absolute top-6 right-32"
      >
        <Sparkles className="w-4 h-4 text-yellow-400/60" />
      </motion.div>
      
      <CardContent className="relative z-2 p-6">
        <h4 className="text-base font-semibold mb-2">
          {t("common.settingLearnGoal")}
        </h4>
        <p className="text-sm text-gray-600 mb-4 ">
          {t("common.learnGoalDescription")}
        </p>
        <Button onClick={handleNavigate}>{t("common.setNow")}</Button>
          <img src={"/app/images/bg/cat-half.png"} alt="setting-learn-goal" className="absolute bottom-0 right-0 w-1/4" />
      </CardContent>
    </motion.div>
  );
};
