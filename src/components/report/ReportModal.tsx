import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (content: string) => void;
  title: string;
}

export const ReportModal = ({ isOpen, onClose, onConfirm, title }: ReportModalProps) => {
  const { t } = useTranslation();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
        textareaRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setContent("");
      setError("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setError(t("common.required"));
      return;
    }
    
    setError("");
    onConfirm(trimmedContent);
    onClose();
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error && e.target.value.trim()) {
      setError("");
    }
  };

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
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 p-1 text-slate-500"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 pr-6">
          <h2 id="dialog-title" className="text-lg font-semibold mb-2 text-slate-600">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {t("report.reportErrorDescription")}
          </p>
          
          <div className="space-y-2">
            <label htmlFor="report-content" className="text-sm font-medium text-slate-600">
              {t("report.content")} <span className="text-red-500">*</span>
            </label>
            <textarea
              ref={textareaRef}
              id="report-content"
              value={content}
              onChange={handleContentChange}
              placeholder={t("report.enterReportContent")}
              className={`w-full min-h-[100px] text-slate-600 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="min-w-20 bg-gray-200 text-slate-600"
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="min-w-20"
          >
            {t("common.confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
};
