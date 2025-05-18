import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminParagraph, ParagraphQueryParams } from "@/dataHelper/adminParagraph.dataHelper";
import { useDeleteParagraph } from "@/hooks/useAdminParagraph";
import { getColorByLevel } from "@/utils/lessonUtils";
import { ArrowUpDown, Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ParagraphTableProps {
  paragraphs: AdminParagraph[];
  isLoading: boolean;
  filters: ParagraphQueryParams;
  handleSort: (column: string) => void;
  handleViewParagraph: (paragraphId: number) => void;
  handleEditParagraph: (paragraphId: number) => void;
  sortableColumns: string[];
}

const ParagraphTable = ({
  paragraphs,
  isLoading,
  filters,
  handleSort,
  handleViewParagraph,
  handleEditParagraph,
  sortableColumns,
}: ParagraphTableProps) => {
  const { t } = useTranslation();
  
  const [dialogState, setDialogState] = useState<{isOpen: boolean; paragraphId: number | null}>({ isOpen: false, paragraphId: null });
  const { mutate: deleteParagraphMutate, isPending: isDeleting } = useDeleteParagraph();

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

  const openDeleteDialog = (paragraphId: number) => {
    setDialogState({ isOpen: true, paragraphId });
  };

  const closeDeleteDialog = () => {
    setDialogState({ isOpen: false, paragraphId: null });
  };

  const handleDelete = () => {
    if (!dialogState.paragraphId) return;
    
    deleteParagraphMutate(String(dialogState.paragraphId));
    closeDeleteDialog();
  };

  return (
    <>
      <div className="rounded-md border overflow-x-auto mb-6">
        <Table className="w-full table-fixed min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              {renderTableHeader("japaneseText", t("adminParagraph.japaneseText"), "w-[250px]")}
              {renderTableHeader("vietnameseText", t("adminParagraph.vietnameseText"), "w-[250px]")}
              {renderTableHeader("level", t("common.level"), "w-[80px]", true)}
              <TableHead className="text-center w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isDeleting ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loading message={isDeleting 
                      ? t("adminParagraph.deleting")
                      : t("adminParagraph.loading")
                    } />
                  </div>
                </TableCell>
              </TableRow>
            ) : paragraphs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {t("common.noDataFound")}
                </TableCell>
              </TableRow>
            ) : (
              paragraphs.map((paragraph, index) => (
                <TableRow key={paragraph.id}>
                  <TableCell className="text-center">{(filters.page || 0) * (filters.size || 10) + index + 1}</TableCell>
                  <TableCell className="font-medium truncate max-w-[250px]">
                    {paragraph.japaneseText}
                  </TableCell>
                  <TableCell className="truncate max-w-[250px]">
                    {paragraph.vietnameseText}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className={`rounded-md px-2 py-1 text-xs text-center min-w-[60px] w-fit mx-auto ${
                      getColorByLevel(paragraph.level || "")
                    }`}>
                      {paragraph.level}
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
                        <DropdownMenuItem onSelect={() => handleViewParagraph(paragraph.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("common.viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleEditParagraph(paragraph.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("common.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => openDeleteDialog(paragraph.id)}
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
        title={t("adminParagraph.deleteParagraph")}
        description={t("adminParagraph.confirmDelete")}
        confirmText={t("common.delete")}
        confirmVariant="destructive"
      />
    </>
  );
};

export default ParagraphTable; 