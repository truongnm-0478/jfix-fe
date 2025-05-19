import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/constant";
import { SpeakingQuestionQueryParams } from "@/dataHelper/adminSpeakingQuestions.dataHelper";
import { useAdminSpeakingQuestion } from "@/hooks/useAdminSpeakingQuestion";
import { getTablePageSize, setTablePageSize } from "@/utils/storage";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SpeakingQuestionFilters from "./SpeakingQuestionFilters";
import SpeakingQuestionPagination from "./SpeakingQuestionPagination";
import SpeakingQuestionTable from "./SpeakingQuestionTable";

const SORTABLE_COLUMNS = ["japaneseText", "vietnameseText", "level"];

const SpeakingQuestionManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const getSavedPageSize = (): number => {
    const savedSize = getTablePageSize();
    return savedSize ? parseInt(savedSize, 10) : 10;
  };

  const [filters, setFilters] = useState<SpeakingQuestionQueryParams>({
    page: 0,
    size: getSavedPageSize(),
    sortBy: "createDate",
    sortDir: "desc",
  });
  
  const [showFilters, setShowFilters] = useState(false);
    
  const { data, isLoading, refetch } = useAdminSpeakingQuestion(filters);
  
  const speakingQuestionData = data?.data;
  const speakingQuestions = speakingQuestionData?.data || [];
  const totalPages = speakingQuestionData?.totalPages || 0;
  const totalRecords = speakingQuestionData?.totalRecords || 0;
  
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
  
  const handleViewSpeakingQuestion = (speakingQuestionId: number) => {
    navigate(ROUTERS.ADMIN_QUESTIONS_DETAIL.replace(":id", speakingQuestionId.toString()));
  };

  const handleEditSpeakingQuestion = (speakingQuestionId: number) => {
    navigate(ROUTERS.ADMIN_QUESTIONS_EDIT.replace(":id", speakingQuestionId.toString()));
  };
  
  const handleCreateSpeakingQuestion = () => {
    navigate(ROUTERS.ADMIN_QUESTIONS_CREATE);
  };
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 py-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("adminSpeakingQuestion.speakingQuestionManagement")}</h1>
          <p className="text-muted-foreground font-light">{t("adminSpeakingQuestion.manageAllSpeakingQuestions")}</p>
        </div>
        <Button 
          className="flex items-center gap-1" 
          onClick={handleCreateSpeakingQuestion}
        >
          <CirclePlus className="h-4 w-4" />
          <span>{t("common.create")}</span>
        </Button>
      </div>
      
      <SpeakingQuestionFilters
        filters={filters}
        setFilters={setFilters}
        totalRecords={totalRecords}
        speakingQuestionCount={speakingQuestions.length}
        clearFilters={clearFilters}
        handleSearch={handleSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <SpeakingQuestionTable
        speakingQuestions={speakingQuestions}
        isLoading={isLoading}
        filters={filters}
        handleSort={handleSort}
        handleViewSpeakingQuestion={handleViewSpeakingQuestion}
        sortableColumns={SORTABLE_COLUMNS}
        handleEditSpeakingQuestion={handleEditSpeakingQuestion}
      />
      
      <SpeakingQuestionPagination
        currentPage={filters.page || 0}
        totalPages={totalPages}
        pageSize={filters.size || 10}
        changePage={handlePageChange}
        changePageSize={handlePageSizeChange}
      />
    </div>
  );
};

export default SpeakingQuestionManagement; 