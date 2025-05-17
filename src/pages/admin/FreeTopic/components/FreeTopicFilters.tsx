import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FreeTopicQueryParams } from "@/dataHelper/adminFreeTopic.dataHelper";
import { ChevronDown, Search, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FreeTopicFiltersProps {
  filters: FreeTopicQueryParams;
  setFilters: React.Dispatch<React.SetStateAction<FreeTopicQueryParams>>;
  totalRecords: number;
  freeTopicCount: number;
  clearFilters: () => void;
  handleSearch: () => void;
  showFilters: boolean;
  toggleFilters: () => void;
}

const FreeTopicFilters = ({ 
  filters, 
  setFilters, 
  totalRecords, 
  freeTopicCount,
  clearFilters,
  handleSearch,
  showFilters,
  toggleFilters
}: FreeTopicFiltersProps) => {
  const { t } = useTranslation();
  const [filterInputs, setFilterInputs] = useState({
    keyword: filters.keyword || "",
    level: filters.level || "all",
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
      keyword: filterInputs.keyword,
      level: filterInputs.level === "all" ? undefined : filterInputs.level,
      page: 0,
    }));
    
    handleSearch();
  };

  const resetFilters = () => {
    setFilterInputs({
      keyword: "",
      level: "all",
    });
    clearFilters();
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {t("common.showing")} {freeTopicCount} {t("common.of")} {totalRecords}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="keyword">{t("adminFreeTopic.keyword")}</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="keyword"
                      name="keyword"
                      value={filterInputs.keyword}
                      onChange={handleInputChange}
                      placeholder={t("adminFreeTopic.searchKeywordPlaceholder")}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="level">{t("adminFreeTopic.level")}</Label>
                  <Select
                    value={filterInputs.level}
                    onValueChange={(value) => handleSelectChange("level", value)}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder={t("adminFreeTopic.selectLevel")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("common.allLevels")}</SelectItem>
                      <SelectItem value="N1">{t("common.levelN1")}</SelectItem>
                      <SelectItem value="N2">{t("common.levelN2")}</SelectItem>
                      <SelectItem value="N3">{t("common.levelN3")}</SelectItem>
                      <SelectItem value="N4">{t("common.levelN4")}</SelectItem>
                      <SelectItem value="N5">{t("common.levelN5")}</SelectItem>
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
                  {t("common.search")}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 hover:text-white"
                >
                  <X className="h-4 w-4" />
                  {t("common.resetFilters")}
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FreeTopicFilters; 