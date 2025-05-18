import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminGrammar, GrammarQueryParams } from "@/dataHelper/adminGrammar.dataHelper";
import { useDeleteGrammar } from "@/hooks/useAdminGrammar";
import { getColorByLevel } from "@/utils/lessonUtils";
import { ArrowUpDown, Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface GrammarTableProps {
  grammars: AdminGrammar[];
  isLoading: boolean;
  filters: GrammarQueryParams;
  handleSort: (column: string) => void;
  handleViewGrammar: (grammarId: number) => void;
  sortableColumns: string[];
  handleEditGrammar: (grammarId: number) => void;
}

const GrammarTable = ({
  grammars,
  isLoading,
  filters,
  handleSort,
  handleViewGrammar,
  sortableColumns,
  handleEditGrammar
}: GrammarTableProps) => {
  const { t } = useTranslation();
  
  const [dialogState, setDialogState] = useState<{isOpen: boolean; grammarId: number | null}>({ isOpen: false, grammarId: null });
  const { mutate: deleteGrammarMutate, isPending: isDeleting } = useDeleteGrammar();

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

  const openDeleteDialog = (grammarId: number) => {
    setDialogState({ isOpen: true, grammarId });
  };

  const closeDeleteDialog = () => {
    setDialogState({ isOpen: false, grammarId: null });
  };

  const handleDelete = () => {
    if (!dialogState.grammarId) return;
    
    deleteGrammarMutate(String(dialogState.grammarId));
    closeDeleteDialog();
  };

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full table-fixed min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              {renderTableHeader("romaji", t("adminGrammar.romaji"), "w-[180px]")}
              {renderTableHeader("structure", t("adminGrammar.structure"), "w-[180px]")}
              {renderTableHeader("meaning", t("adminGrammar.meaning"), "w-[240px]")}
              {renderTableHeader("level", t("adminGrammar.level"), "w-[120px]", true)}
              <TableHead className="text-center w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isDeleting ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loading message={isDeleting 
                      ? t("adminGrammar.deleting")
                      : t("adminGrammar.loading")
                    } />
                  </div>
                </TableCell>
              </TableRow>
            ) : grammars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  {t("adminGrammar.noGrammarsFound")}
                </TableCell>
              </TableRow>
            ) : (
              grammars.map((grammar, index) => (
                <TableRow key={grammar.id}>
                  <TableCell className="text-center">{(filters.page || 0) * (filters.size || 10) + index + 1}</TableCell>
                  <TableCell className="font-medium">{grammar.romaji}</TableCell>
                  <TableCell>{grammar.structure}</TableCell>
                  <TableCell>{grammar.meaning}</TableCell>
                  <TableCell className="text-center">
                    <div className={`rounded-md px-2 py-1 text-xs text-center min-w-[60px] w-fit mx-auto ${
                      getColorByLevel(grammar.level || "")
                    }`}>
                      {grammar.level}
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
                        <DropdownMenuItem onSelect={() => handleViewGrammar(grammar.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("common.viewDetails")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleEditGrammar(grammar.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          {t("common.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onSelect={() => openDeleteDialog(grammar.id)}
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
        title={t("adminGrammar.deleteGrammar")}
        description={t("adminGrammar.confirmDelete")}
        confirmText={t("adminGrammar.delete")}
        confirmVariant="destructive"
      />
    </>
  );
};

export default GrammarTable; 