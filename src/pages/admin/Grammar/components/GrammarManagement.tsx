import { ROUTERS } from "@/constant";
import { GrammarQueryParams } from "@/dataHelper/adminGrammar.dataHelper";
import { useAdminGrammar } from "@/hooks/useAdminGrammar";
import { getTablePageSize, setTablePageSize } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import GrammarFilters from "./GrammarFilters";
import GrammarPagination from "./GrammarPagination";
import GrammarTable from "./GrammarTable";

const SORTABLE_COLUMNS = ["romaji", "structure", "meaning", "level"];

const GrammarManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getSavedPageSize = (): number => {
    const savedSize = getTablePageSize();
    return savedSize ? parseInt(savedSize, 10) : 10;
  };

  const [filters, setFilters] = useState<GrammarQueryParams>({
    page: 0,
    size: getSavedPageSize(),
    sortBy: "createDate",
    sortDir: "desc",
  });
  
  const [showFilters, setShowFilters] = useState(false);
    
  const { data, isLoading, refetch } = useAdminGrammar(filters);
  
  const grammarData = data?.data;
  const grammars = grammarData?.data || [];
  const totalPages = grammarData?.totalPages || 0;
  const totalRecords = grammarData?.totalRecords || 0;
  
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
  
  const handleViewGrammar = (grammarId: number) => {
    navigate(ROUTERS.ADMIN_GRAMMAR_DETAIL.replace(":id", grammarId.toString()));
  };

  const handleEditGrammar = (grammarId: number) => {
    navigate(ROUTERS.ADMIN_GRAMMAR_EDIT.replace(":id", grammarId.toString()));
  };
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div className="">
      <div className="flex flex-col mb-4 py-4">
        <h1 className="text-2xl font-bold text-primary">{t("adminGrammar.grammarManagement")}</h1>
        <p className="text-muted-foreground font-light">{t("adminGrammar.manageAllGrammars")}</p>
      </div>
      
      <GrammarFilters
        filters={filters}
        setFilters={setFilters}
        totalRecords={totalRecords}
        grammarCount={grammars.length}
        clearFilters={clearFilters}
        handleSearch={handleSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <GrammarTable
        grammars={grammars}
        isLoading={isLoading}
        filters={filters}
        handleSort={handleSort}
        handleViewGrammar={handleViewGrammar}
        sortableColumns={SORTABLE_COLUMNS}
        handleEditGrammar={handleEditGrammar}
      />
      
      <GrammarPagination
        currentPage={filters.page || 0}
        totalPages={totalPages}
        pageSize={filters.size || 10}
        changePage={handlePageChange}
        changePageSize={handlePageSizeChange}
      />
    </div>
  );
};

export default GrammarManagement; 