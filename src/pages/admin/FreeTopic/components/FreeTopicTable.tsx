import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminFreeTopic, FreeTopicQueryParams } from "@/dataHelper/adminFreeTopic.dataHelper";
import { useDeleteFreeTopic } from "@/hooks/useAdminFreeTopic";
import { getColorByLevel } from "@/utils/lessonUtils";
import { ArrowUpDown, Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FreeTopicTableProps {
  freeTopics: AdminFreeTopic[];
  isLoading: boolean;
  filters: FreeTopicQueryParams;
  handleSort: (column: string) => void;
  handleViewFreeTopic: (freeTopicId: number) => void;
  sortableColumns: string[];
  handleEditFreeTopic: (freeTopicId: number) => void;
}

const FreeTopicTable = ({
  freeTopics,
  isLoading,
  filters,
  handleSort,
  handleViewFreeTopic,
  sortableColumns,
  handleEditFreeTopic
}: FreeTopicTableProps) => {
  const { t } = useTranslation();
  
  const [dialogState, setDialogState] = useState<{isOpen: boolean; freeTopicId: number | null}>({ isOpen: false, freeTopicId: null });
  const { mutate: deleteFreeTopicMutate, isPending: isDeleting } = useDeleteFreeTopic();

  const renderSortIcon = (column: string) => (
    <ArrowUpDown
      className={`h-4 w-4 ml-1 ${
        sortableColumns.includes(column)
          ? filters.sortDir === "desc"
            ? "transform rotate-180 text-primary"
            : "text-primary"
          : "text-muted-foreground"
      }`}
    />
  );
  
  const renderTableHeader = (column: string, label: string, width: string, centerText = false) => {
    const isSortable = sortableColumns.includes(column);
  
    return (
      <TableHead
        className={`${isSortable ? 'cursor-pointer' : ''} ${width} ${centerText ? 'text-center' : ''} font-semibold h-14`}
        onClick={() => isSortable && handleSort(column)}
      >
        <div className={`flex items-center ${centerText ? 'justify-center' : ''}`}>
          {label}
          {isSortable && renderSortIcon(column)}
        </div>
      </TableHead>
    );
  };  

  const openDeleteDialog = (freeTopicId: number) => {
    setDialogState({ isOpen: true, freeTopicId });
  };

  const closeDeleteDialog = () => {
    setDialogState({ isOpen: false, freeTopicId: null });
  };

  const handleDelete = () => {
    if (!dialogState.freeTopicId) return;
    
    deleteFreeTopicMutate(String(dialogState.freeTopicId));
    closeDeleteDialog();
  };

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full table-fixed min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              {renderTableHeader("japaneseText", t("adminFreeTopic.japaneseText"), "w-[180px]")}
              {renderTableHeader("vietnameseText", t("adminFreeTopic.vietnameseText"), "w-[180px]")}
              {renderTableHeader("level", t("adminFreeTopic.level"), "w-[100px]", true)}
              <TableHead className="text-center w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isDeleting ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loading message={isDeleting 
                      ? t("adminFreeTopic.deleting")
                      : t("adminFreeTopic.loading")
                    } />
                  </div>
                </TableCell>
              </TableRow>
            ) : freeTopics.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {t("adminFreeTopic.noFreeTopicsFound")}
                </TableCell>
              </TableRow>
            ) : (
              freeTopics.map((freeTopic, index) => (
                <TableRow key={freeTopic.id}>
                  <TableCell className="text-center">{(filters.page || 0) * (filters.size || 10) + index + 1}</TableCell>
                  <TableCell className="font-medium">{freeTopic.japaneseText}</TableCell>
                  <TableCell>{freeTopic.vietnameseText}</TableCell>
                  <TableCell className="text-center">
                    <div className={`rounded-md px-2 py-1 text-xs text-center min-w-[100px] ${
                      getColorByLevel(freeTopic.level || "N5")
                    }`}>
                      {freeTopic.level}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 focus:outline-none focus:ring-0 active:outline-none active:ring-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleViewFreeTopic(freeTopic.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("common.viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleEditFreeTopic(freeTopic.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("common.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => openDeleteDialog(freeTopic.id)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          {t("common.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        isOpen={dialogState.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title={t("adminFreeTopic.deleteFreeTopic")}
        description={t("adminFreeTopic.confirmDelete")}
        confirmText={t("adminFreeTopic.delete")}
        confirmVariant="destructive"
      />
    </>
  );
};

export default FreeTopicTable; 