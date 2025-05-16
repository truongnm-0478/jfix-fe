import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserQueryParams } from "@/dataHelper/adminUser.dataHelper";
import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface UserFiltersProps {
  filters: UserQueryParams;
  setFilters: React.Dispatch<React.SetStateAction<UserQueryParams>>;
  totalRecords: number;
  userCount: number;
  clearFilters: () => void;
  handleSearch: () => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const UserFilters = ({ 
  filters, 
  setFilters, 
  totalRecords, 
  userCount,
  clearFilters,
  handleSearch,
  showFilters,
  toggleFilters
}: UserFiltersProps) => {
  const { t } = useTranslation();
  const [filterInputs, setFilterInputs] = useState({
    username: filters.username || "",
    name: filters.name || "",
    email: filters.email || "",
    phone: filters.phone || "",
    role: filters.role || "all",
    isDeleted: filters.isDeleted === undefined ? "all" : String(filters.isDeleted)
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilterInputs(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilters(prev => ({ 
      ...prev, 
      username: filterInputs.username,
      name: filterInputs.name,
      email: filterInputs.email,
      phone: filterInputs.phone,
      role: filterInputs.role === "all" ? "" : filterInputs.role,
      isDeleted: filterInputs.isDeleted === "true" 
        ? true 
        : filterInputs.isDeleted === "false" 
          ? false 
          : undefined,
      page: 0,
    }));
    
    handleSearch();
  };

  const resetFilters = () => {
    setFilterInputs({
      username: "",
      name: "",
      email: "",
      phone: "",
      role: "all",
      isDeleted: "all"
    });
    clearFilters();
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {t("common.showing")} {userCount} {t("common.of")} {totalRecords}
            </div>

            <Button 
              variant="outline" 
              onClick={toggleFilters}
              className="flex items-center gap-2 min-w-40 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            >
              <Search className="h-4 w-4" />
              {showFilters ? t("common.hideFilters") : t("common.showFilters")}
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>
          
          {showFilters && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">{t("adminUsers.username")}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="username"
                      name="username"
                      value={filterInputs.username}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">{t("adminUsers.name")}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="name"
                      name="name"
                      value={filterInputs.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">{t("adminUsers.email")}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      name="email"
                      value={filterInputs.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">{t("adminUsers.phone")}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="phone"
                      name="phone"
                      value={filterInputs.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">{t("adminUsers.role")}</Label>
                  <Select
                    value={filterInputs.role}
                    onValueChange={(value) => handleSelectChange("role", value)}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder={t("adminUsers.role")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("adminUsers.all")}</SelectItem>
                      <SelectItem value="ADMIN">{t("adminUsers.admin")}</SelectItem>
                      <SelectItem value="USER">{t("adminUsers.user")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">{t("adminUsers.status")}</Label>
                  <Select
                    value={filterInputs.isDeleted}
                    onValueChange={(value) => handleSelectChange("isDeleted", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder={t("adminUsers.status")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">{t("adminUsers.active")}</SelectItem>
                      <SelectItem value="true">{t("adminUsers.deleted")}</SelectItem>
                      <SelectItem value="all">{t("adminUsers.all")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-end">
                <Button 
                  onClick={applyFilters}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  {t("adminUsers.search")}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                >
                  <X className="h-4 w-4" />
                  {t("adminUsers.clearFilters")}
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserFilters; 