import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

type StepProps = {
  title: string;
  description: string;
  index: number;
  inView: boolean;
};

const Step = ({ title, description, index, inView }: StepProps) => {
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 relative z-10 transition-all duration-700 ${
        inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`md:w-[45%] ${!isEven ? 'md:pr-8 md:text-right' : 'opacity-0'} hidden md:block`}>
        {!isEven && (
          <>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </>
        )}
      </div>
      
      <div className="md:w-[10%] flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#4F45E4] text-white text-2xl font-bold flex items-center justify-center shadow-lg z-10">
          {index + 1}
        </div>
      </div>
      
      <div className={`md:w-[45%] ${isEven ? 'md:pl-8' : 'opacity-0'} hidden md:block`}>
        {isEven && (
          <>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </>
        )}
      </div>
      
      <div className="md:hidden mt-4 text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export const HowItWorksSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const steps = [
    {
      title: t("landing.how.step1.title"),
      description: t("landing.how.step1.description"),
    },
    {
      title: t("landing.how.step2.title"),
      description: t("landing.how.step2.description"),
    },
    {
      title: t("landing.how.step3.title"),
      description: t("landing.how.step3.description"),
    },
    {
      title: t("landing.how.step4.title"),
      description: t("landing.how.step4.description"),
    },
  ];

  return (
    <section id="how" ref={ref} className="py-20 bg-indigo-50">
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          {t("landing.how.title")}
        </h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-1 bg-[#4F45E4]/30 transform -translate-x-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <Step 
              key={index}
              index={index} 
              title={step.title}
              description={step.description}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};