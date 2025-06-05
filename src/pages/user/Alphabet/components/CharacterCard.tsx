import { Volume2 } from 'lucide-react';
import { Character } from '../types';

interface CharacterCardProps {
  item: Character;
  showRomaji: boolean;
  onCharacterClick: (char: Character) => void;
  onPlaySound: (sound: string) => void;
}

export const CharacterCard = ({
  item,
  showRomaji,
  onCharacterClick,
  onPlaySound
}: CharacterCardProps) => {
  return (
    <div
      className="bg-white rounded-lg transition-all duration-300 cursor-pointer transform border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50"
      onClick={() => onCharacterClick(item)}
    >
      <div className="p-2 sm:p-3 md:p-4 text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2 font-serif">
          {item.char}
        </div>
        {showRomaji && (
          <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 font-medium">
            {item.romaji}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlaySound(item.sound);
          }}
          className="bg-primary hover:bg-primary/80 text-white p-1 sm:p-2 rounded-full transition-colors duration-200"
          title="Phát âm"
        >
          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}; 