import { ROUTERS } from '@/constant';
import { capitalizeAll } from '@/utils/stringUtils';
import confetti from 'canvas-confetti';
import lottie, { AnimationItem } from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export type FlameAnimationProps = {
  oldStreak: number;
  newStreak: number;
  cardCount: number;
};

export const FlameAnimation = ({ oldStreak, newStreak, cardCount }: FlameAnimationProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [streak, setStreak] = useState<number>(oldStreak);
  const [showPlusOne, setShowPlusOne] = useState<boolean>(false);
  const [showText, setShowText] = useState<boolean>(false);
  const [showFlame, setShowFlame] = useState<boolean>(false);
  const [zoomOutCounter, setZoomOutCounter] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const lottieRef = useRef<HTMLDivElement>(null);
  const lottieInstance = useRef<AnimationItem | null>(null);
  const [lottieLoaded, setLottieLoaded] = useState<boolean>(true);

  // Animate streak increment, confetti, and background change
  useEffect(() => {
    if (newStreak > oldStreak) {
      let current = oldStreak;
      const interval = setInterval(() => {
        current += 1;
        setStreak(current);
        setShowPlusOne(true);
        setBackgroundColor('orange-500');
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.8, x: 0.5 },
          colors: ['#ff4500', '#ffd700', '#ff8c00'],
        });
        if (current >= newStreak) {
          setTimeout(() => {
            setZoomOutCounter(true);
            setShowFlame(true);
            setShowText(true);
            setShowPlusOne(false);
          }, 1500);
          clearInterval(interval);
        }
      }, 900);
      return () => clearInterval(interval);
    } else {
      setStreak(newStreak);
      setShowFlame(true);
      setShowText(true);
      setZoomOutCounter(true);
    }
  }, [oldStreak, newStreak]);

  // Lottie animation
  useEffect(() => {
    if (lottieRef.current && showFlame) {
      try {
        lottieInstance.current = lottie.loadAnimation({
          container: lottieRef.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/images/fire.json',
        });
        setLottieLoaded(true);
      } catch (e) {
        setLottieLoaded(false);
      }
    }
    return () => {
      lottieInstance.current?.destroy();
    };
  }, [showFlame]);

  // Accessibility: handle keyboard
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  // Navigate to next page
  const handleNextPage = () => {
    navigate(ROUTERS.LEARN);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-${backgroundColor}`}>
      <style>
        {`
          @keyframes zoomOut {
            0% {
              transform: scale(2);
            }
            100% {
              transform: scale(1);
            }
          }
          @keyframes flyIn {
            0% {
              transform: translateY(50px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes zoomIn {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .large-counter {
            transform: scale(2);
          }
          .zoom-out {
            animation: zoomOut 0.5s ease-out forwards;
          }
          .fly-in {
            animation: flyIn 0.5s ease-out forwards;
          }
          .zoom-in {
            animation: zoomIn 0.5s ease-out forwards;
          }
        `}
      </style>
      <div className="bg-white flex flex-col items-center justify-center px-4 pb-4 rounded-lg">
      <div
        className="relative cursor-pointer outline-none"
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown}
      >
        {/* Lottie Flame Container */}
        {showFlame && (
          <div className="relative w-64 h-64 flex items-center justify-center fly-in">
            <div ref={lottieRef} className="w-full h-full" aria-hidden={!lottieLoaded} />
            {!lottieLoaded && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-orange-500 text-6xl" role="img" aria-label="fire">
                  🔥
                </span>
              </div>
            )}
          </div>
        )}
        {/* Streak counter */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div
            className={`bg-gradient-to-r from-orange-500 to-yellow-500 px-5 py-4 rounded-full shadow-lg flex items-center justify-center ${
              zoomOutCounter ? 'zoom-out' : 'large-counter'
            }`}
          >
            <div className="relative flex items-center">
              <span className="text-3xl font-bold text-white drop-shadow-md">{streak}</span>
              <span className="ml-2 text-white font-semibold">{t('common.day')}</span>
              {showPlusOne && (
                <div className="absolute -top-3 -right-2 w-6 h-6 pointer-events-none">
                  <div className="absolute w-6 h-6 bg-yellow-300 rounded-full opacity-0 animate-ping-scale" />
                  <div className="absolute w-6 h-6 text-lg font-bold text-yellow-300 animate-fly-up flex items-center justify-center">
                    +1
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        {showText && (
          <div className="flex flex-col items-center justify-center">
            <p className="font-bold text-2xl text-orange-500 fly-in">{t('common.keep_streak')}</p>
            <p className="font-bold text-xl zoom-in mt-4 text-slate-600">
              {t('common.cards_completed')}:{' '}
              <span>{cardCount}</span>{' '}
              <span>{t('common.cards')}</span>
            </p>
            <button
              className="mt-8 py-4 px-20 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-[#FECA00] hover:text-white transition-colors zoom-in"
              onClick={handleNextPage}
            >
              <span className="text-xl">{capitalizeAll(t('common.continue'))}</span>
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default FlameAnimation;