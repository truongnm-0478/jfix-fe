import { BarChart3, BookOpen, Brain, Volume2 } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  inView: boolean;
};

const Feature = ({ icon, title, description, index, inView }: FeatureProps) => {
  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-t-4 border-[#4F45E4] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="w-14 h-14 bg-[#4F45E4]/10 rounded-full flex items-center justify-center text-[#4F45E4] mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  const features = [
    {
      title: t("landing.features.feature1"),
      description: t("landing.features.description1"),
      icon: <Brain />,
    },
    {
      title: t("landing.features.feature2"),
      description: t("landing.features.description2"),
      icon: <BookOpen />,
    },
    {
      title: t("landing.features.feature3"),
      description: t("landing.features.description3"),
      icon: <Volume2 />,
    },
    {
      title: t("landing.features.feature4"),
      description: t("landing.features.description4"),
      icon: <BarChart3 />,
    },
  ];

  return (
    <section id="features" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          {t("landing.features.title")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              index={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 