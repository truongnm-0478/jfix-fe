export const handlePlayAudioUrl = (url: string | null, audioRef: React.RefObject<HTMLAudioElement>) => {
  if (url && audioRef.current) {
    audioRef.current.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  }
};

export const audioBlobToBase64 = (audioBlob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(audioBlob);
  });
}; 