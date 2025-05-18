import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/constant";
import { SentenceQueryParams } from "@/dataHelper/adminSentence.dataHelper";
import { useAdminSentence } from "@/hooks/useAdminSentence";
import { getTablePageSize, setTablePageSize } from "@/utils/storage";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SentenceFilters from "./SentenceFilters";
import SentencePagination from "./SentencePagination";
import SentenceTable from "./SentenceTable";

const SORTABLE_COLUMNS = ["japaneseText", "vietnameseText", "level"];

const SentenceManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getSavedPageSize = (): number => {
    const savedSize = getTablePageSize();
    return savedSize ? parseInt(savedSize, 10) : 10;
  };

  const [filters, setFilters] = useState<SentenceQueryParams>({
    page: 0,
    size: getSavedPageSize(),
    sortBy: "createDate",
    sortDir: "desc",
  });
  
  const [showFilters, setShowFilters] = useState(false);
    
  const { data, isLoading, refetch } = useAdminSentence(filters);
  
  const sentenceData = data?.data;
  const sentences = sentenceData?.data || [];
  const totalPages = sentenceData?.totalPages || 0;
  const totalRecords = sentenceData?.totalRecords || 0;
  
  const handleSearch = () => {
    refetch();
  };
  
  const clearFilters = () => {
    setFilters({
      page: 0,
      size: filters.size,
      sortBy: "createDate",
      sortDir: "desc",
    });
  };
  
  const handleSort = (column: string) => {
    if (!SORTABLE_COLUMNS.includes(column)) {
      return;
    }
    
    setFilters(prev => ({
      ...prev,
      sortBy: column,
      sortDir: prev.sortBy === column && prev.sortDir === "asc" ? "desc" : "asc"
    }));
  };
  
  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };
  
  const handlePageSizeChange = (size: number) => {
    setTablePageSize(size);
    
    setFilters(prev => ({
      ...prev,
      size,
      page: 0
    }));
  };
  
  const handleViewSentence = (sentenceId: number) => {
    navigate(ROUTERS.ADMIN_SENTENCES_DETAIL.replace(":id", sentenceId.toString()));
  };

  const handleEditSentence = (sentenceId: number) => {
    navigate(ROUTERS.ADMIN_SENTENCES_EDIT.replace(":id", sentenceId.toString()));
  };
  
  const handleCreateSentence = () => {
    navigate(ROUTERS.ADMIN_SENTENCES_EDIT.replace(":id", "new"));
  };
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("adminSentence.sentenceManagement")}</h1>
          <p className="text-muted-foreground font-light">{t("adminSentence.manageAllSentences")}</p>
        </div>
        <Button 
          className="flex items-center gap-1" 
          onClick={handleCreateSentence}
        >
          <CirclePlus className="h-4 w-4" />
          <span>{t("common.create")}</span>
        </Button>
      </div>
      
      <SentenceFilters
        filters={filters}
        setFilters={setFilters}
        totalRecords={totalRecords}
        sentenceCount={sentences.length}
        clearFilters={clearFilters}
        handleSearch={handleSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <SentenceTable
        sentences={sentences}
        isLoading={isLoading}
        filters={filters}
        handleSort={handleSort}
        handleViewSentence={handleViewSentence}
        sortableColumns={SORTABLE_COLUMNS}
        handleEditSentence={handleEditSentence}
      />
      
      <SentencePagination
        currentPage={filters.page || 0}
        totalPages={totalPages}
        pageSize={filters.size || 10}
        changePage={handlePageChange}
        changePageSize={handlePageSizeChange}
      />
    </div>
  );
};

export default SentenceManagement; 