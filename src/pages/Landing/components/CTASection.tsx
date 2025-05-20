import { ROUTERS } from "@/constant";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

export const CTASection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section 
      id="cta" 
      ref={ref}
      className="py-20 bg-[#4F45E4] text-white"
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          {t("landing.cta.title")}
        </h2>
        <p className={`text-xl mb-10 opacity-90 max-w-2xl mx-auto transition-all duration-700 delay-200 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          {t("landing.cta.subtitle")}
        </p>
        <button
          className={`bg-white text-[#4F45E4] px-8 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 shadow-lg transform hover:-translate-y-1 transition-all duration-700 delay-400 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}
          onClick={() => {
            window.location.href = ROUTERS.REGISTER;
          }}
        >
          {t("landing.cta.button")}
        </button>
      </div>
    </section>
  );
}; 