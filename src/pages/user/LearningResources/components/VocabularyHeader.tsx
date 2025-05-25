import React from "react";
import { useTranslation } from "react-i18next";

const WelcomeBackCard: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-between text-white bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-[40px] p-8 md:p-12 min-h-[260px] overflow-hidden mb-8 "
      tabIndex={0}
    >
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full 
          animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-white/40 rounded-full 
          animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-white/25 rounded-full 
          animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-10 right-32 w-1 h-1 bg-white/35 rounded-full 
          animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Text content with staggered animations */}
      <div className="flex-1 z-10 transform transition-all duration-500 
        group-hover:translate-x-2">
        <h3 className="font-extrabold text-white text-3xl md:text-2xl mb-4
          transform transition-all duration-600 ease-out
          animate-slide-in-left
          group-hover:scale-105">
          {t("learn.welcomeBack")}
        </h3>
        <p className="text-white text-md md:text-md
          transform transition-all duration-700 ease-out
          animate-slide-in-left opacity-90 group-hover:opacity-100"
          style={{animationDelay: '0.2s'}}>
          {t("learn.motivation")}
        </p>
      </div>

      {/* Image with hover effects */}
      <div className="flex-1 flex justify-end items-end h-full z-10
        transform transition-all duration-500 ease-out
        group-hover:scale-110 group-hover:rotate-1">
        <img
          src="/app/images/bg/3.png"
          alt=""
          className="w-[220px] md:w-[320px] h-auto object-contain
            transform transition-all duration-700 ease-out
            animate-float
            filter group-hover:brightness-110 group-hover:drop-shadow-lg"
          draggable={false}
          aria-hidden="true"
        />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-transparent via-white/10 to-transparent
        transform -skew-x-12 -translate-x-full group-hover:translate-x-full
        transition-all duration-1000 ease-out"></div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeBackCard;