import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Award, Sparkles, TrendingUp } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const MotivationCard: React.FC = () => {
  const { t } = useTranslation();

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: -30 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      rotate: -10
    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
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
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="mb-8"
    >
      <Card className="relative flex items-center justify-between overflow-hidden p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-0 transition-all duration-500 group">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
          
          {/* Floating Circles */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity
            }}
            className="absolute top-4 right-20 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
          />
          
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              ease: "linear",
              repeat: Infinity,
              delay: 2
            }}
            className="absolute bottom-8 left-16 w-16 h-16 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-lg"
          />

          {/* Sparkle Icons */}
          <motion.div
            variants={sparkleVariants}
            animate="animate"
            className="absolute top-6 right-32"
          >
            <Sparkles className="w-4 h-4 text-yellow-400/60" />
          </motion.div>
          
          <motion.div
            variants={sparkleVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
            className="absolute bottom-12 left-8"
          >
            <Award className="w-5 h-5 text-purple-400/60" />
          </motion.div>

          <motion.div
            variants={sparkleVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
            className="absolute top-16 left-24"
          >
            <TrendingUp className="w-4 h-4 text-green-400/60" />
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div
          variants={contentVariants}
          className="flex-1 z-10 pr-4 sm:pr-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4"
          >
            <h3 className="font-extrabold text-gray-800 text-xl mb-2 leading-tight">
              {t("userRanking.header.title")}
            </h3>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-600 text-sm leading-relaxed max-w-md"
          >
            {t("userRanking.header.description")}
          </motion.p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          variants={imageVariants}
          className="flex-shrink-0 z-10 relative"
        >
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative"
          >
            <img
              src="/app/images/bg/cat-1.png"
              alt=""
              className="w-32 sm:w-40 md:w-48 h-auto object-contain drop-shadow-2xl"
              draggable={false}
              aria-hidden="true"
            />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl scale-150 opacity-60"></div>
          </motion.div>

          {/* Floating Elements around Image */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity
            }}
            className="absolute -top-4 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70 blur-sm"
          />
          
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 6,
              ease: "linear",
              repeat: Infinity,
              delay: 1
            }}
            className="absolute -bottom-2 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60 blur-sm"
          />
        </motion.div>

        {/* Bottom Gradient Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"
        />
      </Card>
    </motion.div>
  );
};

export default MotivationCard;