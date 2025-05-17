import { ROUTERS } from "@/constant";
import { VocabularyQueryParams } from "@/dataHelper/adminVocubalary.dataHelper";
import { useAdminVocabulary } from "@/hooks/useAdminVocabulary";
import { getTablePageSize, setTablePageSize } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import VocabularyFilters from "./VocabularyFilters";
import VocabularyPagination from "./VocabularyPagination";
import VocabularyTable from "./VocabularyTable";

const SORTABLE_COLUMNS = ["word", "level"];

const VocabularyManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getSavedPageSize = (): number => {
    const savedSize = getTablePageSize();
    return savedSize ? parseInt(savedSize, 10) : 10;
  };

  const [filters, setFilters] = useState<VocabularyQueryParams>({
    page: 0,
    size: getSavedPageSize(),
    sortBy: "createDate",
    sortDir: "desc",
  });
  
  const [showFilters, setShowFilters] = useState(false);
    
  const { data, isLoading, refetch } = useAdminVocabulary(filters);
  
  const vocabularyData = data?.data;
  const vocabularies = vocabularyData?.data || [];
  const totalPages = vocabularyData?.totalPages || 0;
  const totalRecords = vocabularyData?.totalRecords || 0;
  
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
  
  const handleViewVocabulary = (vocabularyId: number) => {
    navigate(ROUTERS.ADMIN_VOCABULARY_DETAIL.replace(":id", vocabularyId.toString()));
  };

  const handleEditVocabulary = (vocabularyId: number) => {
    navigate(ROUTERS.ADMIN_VOCABULARY_EDIT.replace(":id", vocabularyId.toString()));
  };
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div className="">
      <div className="flex flex-col mb-4 py-4">
        <h1 className="text-2xl font-bold text-primary">{t("adminVocabulary.vocabularyManagement")}</h1>
        <p className="text-muted-foreground font-light">{t("adminVocabulary.manageAllVocabularies")}</p>
      </div>
      
      <VocabularyFilters
        filters={filters}
        setFilters={setFilters}
        totalRecords={totalRecords}
        vocabularyCount={vocabularies.length}
        clearFilters={clearFilters}
        handleSearch={handleSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <VocabularyTable
        vocabularies={vocabularies}
        isLoading={isLoading}
        filters={filters}
        handleSort={handleSort}
        handleViewVocabulary={handleViewVocabulary}
        sortableColumns={SORTABLE_COLUMNS}
        handleEditVocabulary={handleEditVocabulary}
      />
      
      <VocabularyPagination
        currentPage={filters.page || 0}
        totalPages={totalPages}
        pageSize={filters.size || 10}
        changePage={handlePageChange}
        changePageSize={handlePageSizeChange}
      />
    </div>
  );
};

export default VocabularyManagement; 