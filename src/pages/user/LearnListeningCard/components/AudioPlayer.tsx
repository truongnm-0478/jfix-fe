import { Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface AudioPlayerProps {
  audioUrl: string;
  title?: string;
}

export const AudioPlayer = ({ audioUrl, title = "Audio Player" }: AudioPlayerProps) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5];

  // Reset state when audioUrl changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaybackRate(1);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.playbackRate = 1;
    }
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      if (audio) {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      }
    };

    const setAudioTime = () => {
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    if (audio) {
      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);
    
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changePlaybackRate = (rate: number) => {
    const audio = audioRef.current;
    
    if (audio) {
      audio.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full md:p-6 p-4 bg-blue-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Volume2 className="text-blue-600" size={24} />
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Play/Pause and Restart buttons */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={togglePlayPause}
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button
          onClick={handleRestart}
          className="p-3 bg-gray-600 text-blue-600 rounded-full hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={24} />
        </button>

        {/* Time display */}
        <div className="flex-1 text-sm text-gray-600">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 md:block hidden">{t("audioPlayer.speed")}:</span>
        {playbackRates.map((rate) => (
          <button
            key={rate}
            onClick={() => changePlaybackRate(rate)}
            className={`px-3 py-1 text-sm rounded ${
              playbackRate === rate
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            {rate}x
          </button>
        ))}
      </div>
    </div>
  );
};