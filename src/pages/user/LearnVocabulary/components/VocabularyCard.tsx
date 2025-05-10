import { Content } from "@/dataHelper/study.dataHelper";
import { handlePlayAudioUrl } from "@/utils/audioUtils";
import { Volume2 } from "lucide-react";
import React, { useRef } from "react";

type VocabularyCardProps = {
  content: Content;
  onToggleFavorite?: () => void;
  onPlayAudio?: () => void;
};

const VocabularyCard: React.FC<VocabularyCardProps> = ({
  content,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatDialogueExample = (text: string) => {
    if (!text) return null;
    
    if (text.includes(" / ")) {
      const parts = text.split(" / ");
      
      return parts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className="mt-2"></div>}
          <div>{part}</div>
        </React.Fragment>  
      ));
    }
    
    return text;
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch bg-white rounded-xl border border-gray-200 border-b-4 mb-5 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300">
      {/* Left section: Word, Reading, Example */}
      <div className="flex-1 flex flex-col justify-center p-5 bg-slate-50 border-b md:border-b-0 md:border-r border-gray-100">
        {content.reading && (
          <div className="text-sm text-indigo-600 font-medium mb-1">{content.reading}</div>
        )}
        <div className="text-xl md:text-2xl font-semibold text-gray-900">{content.word}</div>
        {content.example && (
          <div className="mt-3 text-sm text-gray-700 border-l-2 border-indigo-200 pl-3">
            {content.example}
          </div>
        )}
      </div>
      
      {/* Right section: Meaning, Example Meaning, Audio button */}
      <div className="flex-1 flex flex-col p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="font-medium text-gray-800 md:text-2xl">{content.meaning}</div>
            {content.exampleMeaning && (
              <div className="mt-3 text-sm text-gray-600 border-l-2 border-gray-200 pl-3 italic">
                {formatDialogueExample(content.exampleMeaning)}
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={() => handlePlayAudioUrl(content.audioUrl, audioRef)}
            tabIndex={0}
            className="flex-shrink-0 p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-200"
          >
            <Volume2 className="w-5 h-5 text-indigo-600" />
          </button>
        </div>
        
        {content.audioUrl && (
          <audio ref={audioRef} src={content.audioUrl} preload="none" />
        )}
      </div>
    </div>
  );
};

export default VocabularyCard;