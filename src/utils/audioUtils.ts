export const handlePlayAudioUrl = (url: string | null, audioRef: React.RefObject<HTMLAudioElement>) => {
  if (url && audioRef.current) {
    audioRef.current.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  }
};