import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminVocabulary, VocabularyQueryParams } from "@/dataHelper/adminVocubalary.dataHelper";
import { useDeleteVocabulary } from "@/hooks/useAdminVocabulary";
import { getColorByLevel } from "@/utils/lessonUtils";
import { ArrowUpDown, Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface VocabularyTableProps {
  vocabularies: AdminVocabulary[];
  isLoading: boolean;
  filters: VocabularyQueryParams;
  handleSort: (column: string) => void;
  handleViewVocabulary: (vocabularyId: number) => void;
  sortableColumns: string[];
  handleEditVocabulary: (vocabularyId: number) => void;
}

const VocabularyTable = ({
  vocabularies,
  isLoading,
  filters,
  handleSort,
  handleViewVocabulary,
  sortableColumns,
  handleEditVocabulary
}: VocabularyTableProps) => {
  const { t } = useTranslation();
  
  const [dialogState, setDialogState] = useState<{isOpen: boolean; vocabularyId: number | null}>({ isOpen: false, vocabularyId: null });
  const { mutate: deleteVocabularyMutate, isPending: isDeleting } = useDeleteVocabulary();

  const renderSortIcon = (column: string) => (
    <ArrowUpDown
      className={`h-4 w-4 ml-1 ${
        filters.sortBy === column
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

  const openDeleteDialog = (vocabularyId: number) => {
    setDialogState({ isOpen: true, vocabularyId });
  };

  const closeDeleteDialog = () => {
    setDialogState({ isOpen: false, vocabularyId: null });
  };

  const handleDelete = () => {
    if (!dialogState.vocabularyId) return;
    
    deleteVocabularyMutate(String(dialogState.vocabularyId));
    closeDeleteDialog();
  };

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full table-fixed min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              {renderTableHeader("word", t("adminVocabulary.word"), "w-[180px]")}
              {renderTableHeader("reading", t("adminVocabulary.reading"), "w-[180px]")}
              {renderTableHeader("meaning", t("adminVocabulary.meaning"), "w-[240px]")}
              {renderTableHeader("level", t("adminVocabulary.level"), "w-[100px]", true)}
              {renderTableHeader("chapter", t("adminVocabulary.chapter"), "w-[100px]", true)}
              {renderTableHeader("section", t("adminVocabulary.section"), "w-[100px]", true)}
              <TableHead className="text-center w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isDeleting ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loading message={isDeleting 
                      ? t("adminVocabulary.deleting")
                      : t("adminVocabulary.loading")
                    } />
                  </div>
                </TableCell>
              </TableRow>
            ) : vocabularies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {t("adminVocabulary.noVocabulariesFound")}
                </TableCell>
              </TableRow>
            ) : (
              vocabularies.map((vocabulary, index) => (
                <TableRow key={vocabulary.id}>
                  <TableCell className="text-center">{(filters.page || 0) * (filters.size || 10) + index + 1}</TableCell>
                  <TableCell className="font-medium">{vocabulary.word}</TableCell>
                  <TableCell>{vocabulary.reading}</TableCell>
                  <TableCell>{vocabulary.meaning}</TableCell>
                  <TableCell className="text-center">
                    <div className={`rounded-md px-2 py-1 text-xs text-center min-w-[100px] ${
                      getColorByLevel(vocabulary.level)
                    }`}>
                      {vocabulary.level}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{vocabulary.chapter}</TableCell>
                  <TableCell className="text-center">{vocabulary.section}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 focus:outline-none focus:ring-0 active:outline-none active:ring-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleViewVocabulary(vocabulary.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("adminVocabulary.viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleEditVocabulary(vocabulary.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("adminVocabulary.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => openDeleteDialog(vocabulary.id)}
                          className="text-red-500 focus:text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          {t("adminVocabulary.delete")}
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
        title={t("adminVocabulary.deleteVocabulary")}
        description={t("adminVocabulary.confirmDelete")}
        confirmText={t("adminVocabulary.delete")}
        confirmVariant="destructive"
      />
    </>
  );
};

export default VocabularyTable; 