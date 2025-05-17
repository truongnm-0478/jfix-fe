import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface SimpleConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  confirmVariant = "default"
}: SimpleConfirmDialogProps) => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 50);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 animate-in fade-in-0 zoom-in-95 relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 p-1"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="mb-5 pr-6">
          <h2 id="dialog-title" className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="min-w-20 bg-gray-200"
          >
            {t("common.cancel")}
          </Button>
          <Button
            ref={confirmButtonRef}
            type="button"
            variant={confirmVariant}
            onClick={() => {
              onClose();
              setTimeout(() => onConfirm(), 10);
            }}
            className="min-w-20"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 