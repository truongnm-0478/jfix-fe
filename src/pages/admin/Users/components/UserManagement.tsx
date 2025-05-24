import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/constant";
import { AdminUser, UserQueryParams } from "@/dataHelper/adminUser.dataHelper";
import { useAdminUsers } from "@/hooks/useAdminUser";
import { getTablePageSize, setTablePageSize } from "@/utils/storage";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserFilters from "./UserFilters";
import UserPagination from "./UserPagination";
import UserTable from "./UserTable";

const SORTABLE_COLUMNS = ["username", "name", "email", "createDate"];

const UserManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getSavedPageSize = (): number => {
    const savedSize = getTablePageSize();
    return savedSize ? parseInt(savedSize, 10) : 10;
  };

  const [filters, setFilters] = useState<UserQueryParams>({
    page: 0,
    size: getSavedPageSize(),
    sortBy: "createDate",
    sortDir: "desc",
  });
  
  const [showFilters, setShowFilters] = useState(false);
    
  const { data, isLoading, refetch } = useAdminUsers(filters);
  
  const userData = data?.data;
  const users = userData?.data || [];
  const totalPages = userData?.totalPages || 0;
  const totalRecords = userData?.totalRecords || 0;
  
  const handleSearch = () => {
    refetch();
  };
  
  const clearFilters = () => {
    setFilters({
      page: 0,
      size: filters.size,
      sortBy: "id",
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
  
  const handleViewUser = (user: AdminUser) => {
    navigate(ROUTERS.ADMIN_USER_DETAIL.replace(":id", user.id.toString()));
  };

  const handleCreateUser = () => {
    navigate(ROUTERS.ADMIN_USER_CREATE);
  };
  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  return (
    <div className="">
      <div className="flex mb-4 py-4 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("adminUsers.userManagement")}</h1>
          <p className="text-muted-foreground font-light">{t("adminUsers.manageAllUsers")}</p>
        </div>
        <Button 
          className="flex items-center gap-1" 
          onClick={handleCreateUser}
        >
          <CirclePlus className="h-4 w-4" />
          <span>{t("common.create")}</span>
        </Button>
      </div>
      
      <UserFilters
        filters={filters}
        setFilters={setFilters}
        totalRecords={totalRecords}
        userCount={users.length}
        clearFilters={clearFilters}
        handleSearch={handleSearch}
        showFilters={showFilters}
        toggleFilters={() => setShowFilters(!showFilters)}
      />
      
      <UserTable
        users={users}
        isLoading={isLoading}
        filters={filters}
        handleSort={handleSort}
        handleViewUser={handleViewUser}
        sortableColumns={SORTABLE_COLUMNS}
      />
      
      <UserPagination
        currentPage={filters.page || 0}
        totalPages={totalPages}
        pageSize={filters.size || 10}
        changePage={handlePageChange}
        changePageSize={handlePageSizeChange}
      />
    </div>
  );
};

export default UserManagement;
