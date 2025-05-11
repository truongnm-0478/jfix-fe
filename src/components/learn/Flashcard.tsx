import { FlashcardProps } from "@/dataHelper/study.dataHelper";
import React, { ReactNode, useEffect, useState } from "react";
import { Card } from "../ui/card";

export const Flashcard: React.FC<FlashcardProps> = ({
  frontContent,
  backContent,
  children,
  onFlip,
  isFlipped: externalIsFlipped,
  className = "",
}) => {
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const isControlled = externalIsFlipped !== undefined;
  const isFlipped = isControlled ? externalIsFlipped : internalIsFlipped;

  useEffect(() => {
    if (isControlled) {
      setInternalIsFlipped(externalIsFlipped);
    }
  }, [externalIsFlipped, isControlled]);

  const handleFlip = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    const newFlippedState = !isFlipped;
    
    if (!isControlled) {
      setInternalIsFlipped(newFlippedState);
    }
    
    if (onFlip) {
      onFlip(newFlippedState);
    }
    
    setTimeout(() => setIsFlipping(false), 300);
  };

  return (
    <>
      <div
        className={`relative w-full h-full min-h-48 cursor-pointer perspective-1000 ${
          isFlipping ? "pointer-events-none" : ""
        } ${className}`}
        onClick={handleFlip}
      >
        <div
          className={`relative w-full h-full transition-transform duration-300 transform-style-preserve-3d ${
            isFlipped ? "rotate-x-180" : ""
          }`}
        >
          {children ? (
            children
          ) : (
            <>
              <Front>{frontContent}</Front>
              <Back>{backContent}</Back>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const Front: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ""
}) => (
  <Card className={`absolute w-full h-full backface-hidden bg-white text-black p-4 flex items-center justify-center ${className}`}>
    {children}
  </Card>
);

export const Back: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ""
}) => (
  <Card className={`absolute w-full h-full backface-hidden bg-gray-800 text-white p-4 transform rotate-x-180 flex items-center justify-center ${className}`}>
    {children}
  </Card>
);