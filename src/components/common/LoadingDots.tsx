import React from "react";

const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-1 items-center justify-center h-10">
      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
    </div>
  );
};

export default LoadingDots;
