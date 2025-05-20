import { Star } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

type TestimonialProps = {
  name: string;
  role: string;
  content: string;
  stars: number;
  index: number;
  inView: boolean;
};

const Testimonial = ({ name, role, content, stars, index, inView }: TestimonialProps) => {
  return (
    <div 
      className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-[#4F45E4] font-bold">
          {name.charAt(0)}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-4">"{content}"</p>
      
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < stars ? 'text-yellow-400' : 'text-gray-300'} 
            fill={i < stars ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  const testimonials = [
    {
      name: t("landing.testimonials.person1.name"),
      role: t("landing.testimonials.person1.role"),
      content: t("landing.testimonials.person1.content"),
      stars: 5,
    },
    {
      name: t("landing.testimonials.person2.name"),
      role: t("landing.testimonials.person2.role"),
      content: t("landing.testimonials.person2.content"),
      stars: 5,
    },
    {
      name: t("landing.testimonials.person3.name"),
      role: t("landing.testimonials.person3.role"),
      content: t("landing.testimonials.person3.content"),
      stars: 4,
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-indigo-50">
      <div className="container mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
          {t("landing.testimonials.title")}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index}
              index={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              stars={testimonial.stars}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 