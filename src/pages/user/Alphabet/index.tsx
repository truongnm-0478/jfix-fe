import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CharacterCard } from './components/CharacterCard';
import { CharacterModal } from './components/CharacterModal';
import { hiraganaData, katakanaData } from './constants';
import { getDakuonTable, getGojuuonTable, getHandakuonTable, getYoonTable } from './helper';
import './styles.css';
import { AlphabetTab, Character, SubTab } from './types';

const JapaneseAlphabetApp = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<AlphabetTab>('hiragana');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('basic');
  const [showRomaji, setShowRomaji] = useState(true);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);

  const filterCharacters = (data: Character[]) => {
    return data;
  };

  const currentData = filterCharacters(activeTab === 'hiragana' ? hiraganaData : katakanaData);

  const playSound = (sound: string): void => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sound);
      utterance.lang = 'ja-JP';
      utterance.rate = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen p-2 sm:p-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
            {t('alphabet.title')}
          </h1>
          <p className="text-base text-gray-600 font-light">
            {t('alphabet.subtitle')}
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex items-center justify-between">
          <Select value={activeSubTab} onValueChange={(value: SubTab) => setActiveSubTab(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue>
                {(() => {
                  switch (activeSubTab) {
                    case 'basic':
                      return t('alphabet.basic');
                    case 'dakuon':
                      return t('alphabet.dakuon');
                    case 'handakuon':
                      return t('alphabet.handakuon');
                    case 'yoon':
                      return t('alphabet.yoon');
                    default:
                      return t('alphabet.basic');
                  }
                })()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">{t('alphabet.basic')}</SelectItem>
              <SelectItem value="dakuon">{t('alphabet.dakuon')}</SelectItem>
              <SelectItem value="handakuon">{t('alphabet.handakuon')}</SelectItem>
              <SelectItem value="yoon">{t('alphabet.yoon')}</SelectItem>
            </SelectContent>
          </Select>

          {/* Toggle Romaji */}
          <button
            onClick={() => setShowRomaji(!showRomaji)}
            className="flex items-center gap-1 text-primary hover:text-primary/80"
          >
            {showRomaji ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span className="text-sm font-medium">
              {showRomaji ? t('alphabet.hideRomaji') : t('alphabet.showRomaji')}
            </span>
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Alphabet Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('hiragana')}
              className={`flex-1 py-3 text-base sm:text-lg font-medium transition-colors duration-200 ${activeTab === 'hiragana'
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
            >
              <span>Hiragana</span> (ひらがな)
            </button>
            <button
              onClick={() => setActiveTab('katakana')}
              className={`flex-1 py-3 text-base sm:text-lg font-medium transition-colors duration-200 ${activeTab === 'katakana'
                  ? 'bg-white text-primary border-b-2 border-primary'
                  : 'bg-gray-50 text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
            >
              <span>Katakana</span> (カタカナ)
            </button>
          </div>

          {/* Character Grid */}
          <div className="p-4">
            {(() => {
              switch (activeSubTab) {
                case 'basic':
                  return (
                    <div className="overflow-x-auto">
                      <div className="grid grid-rows-10 gap-1 sm:gap-2 md:gap-4">
                        {getGojuuonTable(currentData).map((row, rowIndex) => (
                          <div key={rowIndex} className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-4">
                            {row.map((char, colIndex) => (
                              <div key={colIndex} className={char ? '' : 'invisible'}>
                                {char && (
                                  <CharacterCard
                                    item={char}
                                    showRomaji={showRomaji}
                                    onCharacterClick={setSelectedChar}
                                    onPlaySound={playSound}
                                  />
                                )}
                                {!char && <div className="h-[60px] sm:h-[80px] md:h-[100px]" />}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  );

                case 'dakuon':
                  return (
                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-4">
                        {getDakuonTable(currentData).map((row) => (
                          row.map((char) => (
                            char && (
                              <CharacterCard
                                key={char.char}
                                item={char}
                                showRomaji={showRomaji}
                                onCharacterClick={setSelectedChar}
                                onPlaySound={playSound}
                              />
                            )
                          ))
                        ))}
                      </div>
                    </div>
                  );

                case 'handakuon':
                  return (
                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-4">
                        {getHandakuonTable(currentData).map((row) => (
                          row.map((char) => (
                            char && (
                              <CharacterCard
                                key={char.char}
                                item={char}
                                showRomaji={showRomaji}
                                onCharacterClick={setSelectedChar}
                                onPlaySound={playSound}
                              />
                            )
                          ))
                        ))}
                      </div>
                    </div>
                  );

                case 'yoon':
                  return (
                    <div className="overflow-x-auto">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 md:gap-4">
                        {getYoonTable(currentData).map((row) => (
                          row.map((char) => (
                            char && (
                              <CharacterCard
                                key={char.char}
                                item={char}
                                showRomaji={showRomaji}
                                onCharacterClick={setSelectedChar}
                                onPlaySound={playSound}
                              />
                            )
                          ))
                        ))}
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })()}
          </div>
        </div>


        {/* Modal */}
        <CharacterModal
          char={selectedChar}
          onClose={() => setSelectedChar(null)}
          activeTab={activeTab}
          onPlaySound={playSound}
        />
      </div>
    </div>
  );
};

export default JapaneseAlphabetApp;