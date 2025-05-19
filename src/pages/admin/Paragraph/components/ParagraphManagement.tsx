import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/constant";
import { ParagraphQueryParams } from "@/dataHelper/adminParagraph.dataHelper";
import { useAdminParagraph } from "@/hooks/useAdminParagraph";
import { getTablePageSize, setTablePageSize } from "@/utils/storage";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ParagraphFilters from "./ParagraphFilters";
import ParagraphPagination from "./ParagraphPagination";
import ParagraphTable from "./ParagraphTable";

const SORTABLE_COLUMNS = ["japaneseText", "vietnameseText", "level"];

const ParagraphManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getSavedPageSize = (): number => {
    const savedSize = getTablePageSize();
    return savedSize ? parseInt(savedSize, 10) : 10;
  };

  const [filters, setFilters] = useState<ParagraphQueryParams>({
    page: 0,
    size: getSavedPageSize(),
    sortBy: "createDate",
    sortDir: "desc",
  });
  
  const [showFilters, setShowFilters] = useState(false);
    
  const { data, isLoading, refetch } = useAdminParagraph(filters);
  
  const paragraphData = data?.data;
  const paragraphs = paragraphData?.data || [];
  const totalPages = paragraphData?.totalPages || 0;
  const totalRecords = paragraphData?.totalRecords || 0;
  
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
  
  const handleViewParagraph = (paragraphId: number) => {
    navigate(ROUTERS.ADMIN_PARAGRAPHS_DETAIL.replace(":id", paragraphId.toString()));
  };

  const handleEditParagraph = (paragraphId: number) => {
    navigate(ROUTERS.ADMIN_PARAGRAPHS_EDIT.replace(":id", paragraphId.toString()));
  };
  
  const handleCreateParagraph = () => {
    navigate(ROUTERS.ADMIN_PARAGRAPHS_CREATE);
  };
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("adminParagraph.paragraphManagement")}</h1>
          <p className="text-muted-foreground font-light">{t("adminParagraph.manageAllParagraphs")}</p>
        </div>
        <Button 
          className="flex items-center gap-1" 
          onClick={handleCreateParagraph}
        >
          <CirclePlus className="h-4 w-4" />
          <span>{t("common.create")}</span>
        </Button>
      </div>
      
      <ParagraphFilters
        filters={filters}
        setFilters={setFilters}
        totalRecords={totalRecords}
        paragraphCount={paragraphs.length}
        clearFilters={clearFilters}
        handleSearch={handleSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <ParagraphTable
        paragraphs={paragraphs}
        isLoading={isLoading}
        filters={filters}
        handleSort={handleSort}
        handleViewParagraph={handleViewParagraph}
        sortableColumns={SORTABLE_COLUMNS}
        handleEditParagraph={handleEditParagraph}
      />
      
      <ParagraphPagination
        currentPage={filters.page || 0}
        totalPages={totalPages}
        pageSize={filters.size || 10}
        changePage={handlePageChange}
        changePageSize={handlePageSizeChange}
      />
    </div>
  );
};

export default ParagraphManagement; 