import { BookOpen, Eye, EyeOff, Play, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlphabetTab, Character } from '../types';

interface CharacterModalProps {
  char: Character | null;
  onClose: () => void;
  activeTab: AlphabetTab;
  onPlaySound: (sound: string) => void;
}

interface UseCharacterModalReturn {
  t: (key: string) => string;
  writerRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  isAnimating: boolean;
  showCharacter: boolean;
  resetStrokeStyles: (svg: SVGElement) => void;
  animateStrokes: (svg: SVGElement) => Promise<void>;
  handleAnimate: () => Promise<void>;
  toggleShowCharacter: () => void;
}

const useCharacterModal = (
  char: Character | null,
): UseCharacterModalReturn => {
  const { t } = useTranslation();
  const writerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCharacter, setShowCharacter] = useState(true);

  const resetStrokeStyles = (svg: SVGElement) => {
    const strokes = svg.querySelectorAll('g[data-acjk="strokes"] path');
    strokes.forEach(stroke => {
      (stroke as SVGPathElement).style.strokeDasharray = '';
      (stroke as SVGPathElement).style.strokeDashoffset = '';
      (stroke as SVGPathElement).style.transition = 'none';
      (stroke as SVGPathElement).style.display = showCharacter ? '' : 'none';
    });
  };

  const animateStrokes = async (svg: SVGElement): Promise<void> => {
    const strokes = svg.querySelectorAll('g[data-acjk="strokes"] path');
    let delay = 0;
    const promises: Promise<void>[] = [];

    strokes.forEach((stroke) => {
      const promise = new Promise<void>((resolve) => {
        const pathLength = (stroke as SVGPathElement).getTotalLength();
        (stroke as SVGPathElement).style.strokeDasharray = `${pathLength}`;
        (stroke as SVGPathElement).style.strokeDashoffset = `${pathLength}`;
        (stroke as SVGPathElement).style.display = '';

        setTimeout(() => {
          (stroke as SVGPathElement).style.transition = `stroke-dashoffset 0.8s ease-out`;
          (stroke as SVGPathElement).style.strokeDashoffset = '0';
          setTimeout(resolve, 800);
        }, delay);

        delay += 800;
      });
      promises.push(promise);
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    if (!char) return;

    const loadCharacter = async (component: string, index: number) => {
      if (!writerRefs.current[index]) return;

      const charCode = component.charCodeAt(0).toString();
      try {
        const response = await fetch(`/kana/${charCode}.svg`);
        const svgContent = await response.text();

        if (writerRefs.current[index]) {
          writerRefs.current[index]!.innerHTML = svgContent;
          const svg = writerRefs.current[index]!.querySelector('svg');
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.position = 'absolute';
            svg.style.inset = '0';
            resetStrokeStyles(svg);
          }
        }
      } catch (error) {
        console.error('Error loading character:', error);
      }
    };

    const loadCharacters = async () => {
      if (char.components) {
        await Promise.all(char.components.map((component, index) => loadCharacter(component, index)));
      } else if (char.char) {
        await loadCharacter(char.char, 0);
      }
    };

    loadCharacters();
  }, [char, showCharacter]);

  const handleAnimate = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    try {
      const animations = writerRefs.current.map(async (ref, index) => {
        if (!ref) return;
        const svg = ref.querySelector('svg');
        if (!svg) return;

        resetStrokeStyles(svg);
        ref.offsetHeight;
        await animateStrokes(svg as SVGElement);

        if (index < writerRefs.current.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      });

      await Promise.all(animations);
    } finally {
      setIsAnimating(false);
    }
  };

  const toggleShowCharacter = () => {
    setShowCharacter(prev => {
      const newValue = !prev;
      writerRefs.current.forEach(ref => {
        if (!ref) return;
        const svg = ref.querySelector('svg');
        if (!svg) return;
        const strokes = svg.querySelectorAll('g[data-acjk="strokes"] path');
        strokes.forEach(stroke => {
          (stroke as SVGPathElement).style.display = newValue ? '' : 'none';
        });
      });
      return newValue;
    });
  };

  return {
    t,
    writerRefs,
    isAnimating,
    showCharacter,
    resetStrokeStyles,
    animateStrokes,
    handleAnimate,
    toggleShowCharacter
  };
};

export const CharacterModal = ({
  char,
  onClose,
  onPlaySound
}: CharacterModalProps) => {
  const {
    t,
    writerRefs,
    isAnimating,
    showCharacter,
    handleAnimate,
    toggleShowCharacter
  } = useCharacterModal(char);

  if (!char) return null;

  const svgContainerStyle = {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem'
  };

  const gridLinesStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    pointerEvents: 'none' as const,
    overflow: 'visible'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{t('alphabet.characterDetail')}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-8xl font-bold text-gray-800 mb-4 font-serif">
            {char.char}
          </div>
          {char.components && (
            <div className="text-2xl text-gray-600 mb-2">
              = {char.components.join(' + ')}
            </div>
          )}
          <div className="text-xl text-gray-600 mb-2">
            {t('alphabet.romaji')}: <span className="font-semibold">{char.romaji}</span>
          </div>
          <button
            onClick={() => onPlaySound(char.sound)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto mb-4"
          >
            <Volume2 size={18} />
            {t('alphabet.playSound')}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <BookOpen size={18} />
              {t('alphabet.writingPractice')}:
            </h4>
            <div className="flex gap-2">
              <button
                onClick={handleAnimate}
                disabled={isAnimating}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white rounded-lg text-sm transition-colors"
              >
                <Play size={16} />
                {isAnimating ? t('alphabet.writing') : t('alphabet.write')}
              </button>
              <button
                onClick={toggleShowCharacter}
                className="flex items-center gap-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors"
              >
                {showCharacter ? <EyeOff size={16} /> : <Eye size={16} />}
                {showCharacter ? t('alphabet.hide') : t('alphabet.show')}
              </button>
            </div>
          </div>

          {char.components ? (
            <div className="flex justify-center items-center gap-4">
              {char.components.map((_, index) => (
                <div key={index} className="relative w-40 h-40">
                  <div style={svgContainerStyle}>
                    <svg style={gridLinesStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#ddd" strokeWidth="0.5" strokeDasharray="4" vectorEffect="non-scaling-stroke" />
                      <line x1="50" y1="0" x2="50" y2="100" stroke="#ddd" strokeWidth="0.5" strokeDasharray="4" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div
                      ref={el => writerRefs.current[index] = el}
                      style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative w-52 h-52 mx-auto">
              <div style={svgContainerStyle}>
                <svg style={gridLinesStyle} viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#ddd" strokeWidth="0.5" strokeDasharray="4" vectorEffect="non-scaling-stroke" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#ddd" strokeWidth="0.5" strokeDasharray="4" vectorEffect="non-scaling-stroke" />
                </svg>
                <div
                  ref={el => writerRefs.current[0] = el}
                  style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">💡 {t('alphabet.tip')}:</span> {t('alphabet.tipContent')}
          </p>
        </div>
      </div>
    </div>
  );
}; 