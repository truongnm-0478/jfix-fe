import { LanguageSwitcher } from "@/components/layout/AuthLayout/components";
import { ROUTERS } from "@/constant";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const LandingHeader = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={ROUTERS.HOME} className="text-2xl font-bold text-[#4F45E4]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              J-Fixer
            </Link>
            <span className="hidden md:inline-block ml-2 text-sm text-gray-500">学習</span>
          </div>
          
          <nav className="hidden md:flex space-x-10">
            <a href="#hero" className="text-gray-600 hover:text-[#4F45E4] transition-colors duration-300">
              {t("landing.nav.home")}
            </a>
            <a href="#features" className="text-gray-600 hover:text-[#4F45E4] transition-colors duration-300">
              {t("landing.nav.features")}
            </a>
            <a href="#how" className="text-gray-600 hover:text-[#4F45E4] transition-colors duration-300">
              {t("landing.nav.about")}
            </a>
            <a href="#cta" className="text-gray-600 hover:text-[#4F45E4] transition-colors duration-300">
              {t("landing.nav.contact")}
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <LanguageSwitcher />
            </div>
            
            <Link 
              to={ROUTERS.LOGIN} 
              className="hidden md:inline-block bg-[#4F45E4] text-white px-6 py-2 rounded-full hover:bg-[#3c35b1] transition-colors duration-300 shadow-lg"
            >
              {t("header.login")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}; 