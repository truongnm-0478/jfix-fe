import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePagination } from "@/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { EmptyState } from "./EmptyState";
import { GrammarCard } from "./GrammarCard";
import { VocabularyCard } from "./VocabularyCard";

interface LearningResourcesContentProps {
  currentPage: "grammar" | "vocabulary";
  selectedLevel: string;
  isLoading: boolean;
  filteredGrammar: any[];
  filteredVocabulary: any[];
}

const ITEMS_PER_PAGE = 10;
const MAX_PAGE_BUTTONS = 5;

export const LearningResourcesContent: React.FC<LearningResourcesContentProps> = ({
  currentPage,
  selectedLevel,
  isLoading,
  filteredGrammar,
  filteredVocabulary,
}) => {
  const { t } = useTranslation();
  const [pageInput, setPageInput] = useState("");
  
  const grammarPagination = usePagination({
    items: filteredGrammar,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const vocabularyPagination = usePagination({
    items: filteredVocabulary,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  const currentPagination = currentPage === "grammar" ? grammarPagination : vocabularyPagination;
  const items = currentPagination.paginatedItems;

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setPageInput(value);
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(pageInput);
      if (pageNumber && pageNumber >= 1 && pageNumber <= currentPagination.totalPages) {
        currentPagination.setCurrentPage(pageNumber);
        setPageInput("");
      }
    }
  };

  const getPageNumbers = () => {
    const current = currentPagination.currentPage;
    const total = currentPagination.totalPages;
    const pages: number[] = [];
    
    if (total <= MAX_PAGE_BUTTONS) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);
    
    let start = Math.max(2, current - Math.floor(MAX_PAGE_BUTTONS / 2));
    let end = Math.min(total - 1, start + MAX_PAGE_BUTTONS - 3);
    
    start = Math.max(2, end - (MAX_PAGE_BUTTONS - 3));
    
    if (start > 2) pages.push(-1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (end < total - 1) pages.push(-1);
    pages.push(total);
    
    return pages;
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <Loading />
    </div>;
  }

  if ((currentPage === "grammar" && filteredGrammar.length === 0) || 
      (currentPage === "vocabulary" && filteredVocabulary.length === 0)) {
    return <EmptyState selectedLevel={selectedLevel} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {currentPage === "grammar"
          ? items.map((item) => (
              <GrammarCard key={item.id} item={item} />
            ))
          : items.map((item) => (
              <VocabularyCard key={item.id} item={item} />
            ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          {t("common.page")} {currentPagination.currentPage} {t("common.of")} {currentPagination.totalPages}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Page Input */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={pageInput}
              onChange={handlePageInputChange}
              onKeyDown={handlePageInputKeyDown}
              className="w-16 text-center"
              placeholder={currentPagination.currentPage.toString()}
              aria-label={t("common.goToPage")}
            />
          </div>

          {/* Page Numbers */}
          <div className="hidden sm:flex gap-1">
            {getPageNumbers().map((pageNumber, index) => 
              pageNumber === -1 ? (
                <span key={`ellipsis-${index}`} className="px-2">...</span>
              ) : (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPagination.currentPage ? "default" : "outline"}
                  size="sm"
                  className="min-w-[32px] px-2"
                  onClick={() => currentPagination.setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={currentPagination.prevPage}
              disabled={!currentPagination.canPrevPage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={currentPagination.nextPage}
              disabled={!currentPagination.canNextPage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
