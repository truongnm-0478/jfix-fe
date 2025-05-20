import { ROUTERS } from "@/constant";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

export const HeroSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section 
      id="hero" 
      ref={ref}
      className="pt-32 bg-gradient-to-br from-indigo-50 to-white"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className={`transition-all duration-700 ${inView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {t("landing.hero.title")}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t("landing.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="bg-[#4F45E4] text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-[#3c35b1] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={() => {
                    window.location.href = ROUTERS.REGISTER;
                  }}
                >
                  {t("landing.hero.cta")}
                </button>
                <button className="bg-white text-[#4F45E4] border border-[#4F45E4] px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-50 transition-all duration-300">
                  {t("landing.hero.secondaryCta")}
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className={`transition-all duration-700 delay-300 ${inView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <img src="public/images/landing.png" alt="Hero Image" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 