import { ROUTERS } from "@/constant";
import { FreeTopicQueryParams } from "@/dataHelper/adminFreeTopic.dataHelper";
import { useAdminFreeTopic } from "@/hooks/useAdminFreeTopic";
import { getTablePageSize, setTablePageSize } from "@/utils/storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FreeTopicFilters from "./FreeTopicFilters";
import FreeTopicPagination from "./FreeTopicPagination";
import FreeTopicTable from "./FreeTopicTable";

const SORTABLE_COLUMNS = ["japaneseText", "vietnameseText", "level"];

const FreeTopicManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getSavedPageSize = (): number => {
    const savedSize = getTablePageSize();
    return savedSize ? parseInt(savedSize, 10) : 10;
  };

  const [filters, setFilters] = useState<FreeTopicQueryParams>({
    page: 0,
    size: getSavedPageSize(),
    sortDir: "desc",
  });
  
  const [showFilters, setShowFilters] = useState(false);
    
  const { data, isLoading, refetch } = useAdminFreeTopic(filters);
  
  const freeTopicData = data?.data;
  const freeTopics = freeTopicData?.data || [];
  const totalPages = freeTopicData?.totalPages || 0;
  const totalRecords = freeTopicData?.totalRecords || 0;
  
  const handleSearch = () => {
    refetch();
  };
  
  const clearFilters = () => {
    setFilters({
      page: 0,
      size: filters.size,
      sortDir: "desc",
    });
  };
  
  const handleSort = (column: string) => {
    if (!SORTABLE_COLUMNS.includes(column)) {
      return;
    }
    
    setFilters(prev => ({
      ...prev,
      sortDir: prev.sortDir === "asc" ? "desc" : "asc"
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
  
  const handleViewFreeTopic = (freeTopicId: number) => {
    navigate(ROUTERS.ADMIN_FREE_TOPICS_DETAIL.replace(":id", freeTopicId.toString()));
  };

  const handleEditFreeTopic = (freeTopicId: number) => {
    navigate(ROUTERS.ADMIN_FREE_TOPICS_EDIT.replace(":id", freeTopicId.toString()));
  };
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div className="">
      <div className="flex flex-col mb-4 py-4">
        <h1 className="text-2xl font-bold text-primary">{t("adminFreeTopic.freeTopicManagement")}</h1>
        <p className="text-muted-foreground font-light">{t("adminFreeTopic.manageAllFreeTopics")}</p>
      </div>
      
      <FreeTopicFilters
        filters={filters}
        setFilters={setFilters}
        totalRecords={totalRecords}
        freeTopicCount={freeTopics.length}
        clearFilters={clearFilters}
        handleSearch={handleSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <FreeTopicTable
        freeTopics={freeTopics}
        isLoading={isLoading}
        filters={filters}
        handleSort={handleSort}
        handleViewFreeTopic={handleViewFreeTopic}
        sortableColumns={SORTABLE_COLUMNS}
        handleEditFreeTopic={handleEditFreeTopic}
      />
      
      <FreeTopicPagination
        currentPage={filters.page || 0}
        totalPages={totalPages}
        pageSize={filters.size || 10}
        changePage={handlePageChange}
        changePageSize={handlePageSizeChange}
      />
    </div>
  );
};

export default FreeTopicManagement; 