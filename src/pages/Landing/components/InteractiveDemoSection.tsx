import { BarChart3, Check, MessageSquare, Play } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

type FeatureItemProps = {
  title: string;
  description: string;
};

const FeatureItem = ({ title, description }: FeatureItemProps) => {
  return (
    <div className="flex items-start">
      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 flex-shrink-0">
        <Check size={18} />
      </div>
      <div className="ml-4">
        <h4 className="font-medium text-lg">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export const InteractiveDemoSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const features = [
    {
      title: t("landing.demo.feature1.title"),
      description: t("landing.demo.feature1.description")
    },
    {
      title: t("landing.demo.feature2.title"),
      description: t("landing.demo.feature2.description")
    },
    {
      title: t("landing.demo.feature3.title"),
      description: t("landing.demo.feature3.description")
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className={`lg:w-1/2 mb-10 lg:mb-0 transition-all duration-700 ${inView ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("landing.demo.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t("landing.demo.description")}
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <FeatureItem 
                  key={index} 
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>
          </div>
          
          {/* Right side - Phone mockup */}
          <div className={`lg:w-1/2 relative transition-all duration-700 ${inView ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative w-[450px] mx-auto">
              {/* Phone frame */}
              <div className="w-full h-[600px] bg-gray-900 rounded-3xl p-3 shadow-2xl relative overflow-hidden">
                {/* Screen */}
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  {/* App header */}
                  <div className="bg-[#4F45E4] text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xl">J-Fixer</div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <BarChart3 size={16} />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <MessageSquare size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* App content */}
                  <div className="p-4">
                    <div className="mb-8">
                      <h3 className="font-medium text-lg mb-2">
                        {t("landing.demo.exerciseTitle")}
                      </h3>
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                        <p className="text-lg mb-2">私は昨日映画を<span className="bg-red-100 px-1 rounded">見った</span>。</p>
                        <div className="text-sm text-red-600 mb-4">
                          {t("landing.demo.errorText")}
                        </div>
                        <p className="text-lg mb-4">私は昨日映画を<span className="bg-green-100 px-1 rounded">見た</span>。</p>
                        <div className="flex justify-between">
                          <button className="bg-[#4F45E4]/10 text-[#4F45E4] px-4 py-2 rounded-lg font-medium">
                            {t("landing.demo.explanation")}
                          </button>
                          <button className="bg-[#4F45E4] text-white px-4 py-2 rounded-lg font-medium flex items-center">
                            <Play size={16} className="mr-1" />
                            {t("landing.demo.next")}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">
                        {t("landing.demo.progress")}
                      </h3>
                      <div className="bg-gray-100 h-4 rounded-full">
                        <div className="bg-[#4F45E4] h-full rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>{t("landing.demo.streak")}</span>
                        <span className="text-[#4F45E4] font-medium">70%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full opacity-70 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#4F45E4] rounded-full opacity-70 animate-ping" style={{ animationDuration: '4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 