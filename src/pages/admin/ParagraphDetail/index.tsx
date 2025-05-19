import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTERS } from "@/constant";
import { useAdminParagraphById, useDeleteParagraph } from "@/hooks/useAdminParagraph";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import ParagraphInfo from "./components/ParagraphInfo";

const AdminParagraphDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data: paragraphDetail, isLoading } = useAdminParagraphById(id || "");
  const paragraph = paragraphDetail?.data;

  const { mutate: deleteParagraphMutation, isPending: isDeleting } = useDeleteParagraph();

  const handleDeleteParagraph = () => {
    if (id) {
      deleteParagraphMutation(id, {
        onSuccess: () => {
          navigate(ROUTERS.ADMIN_PARAGRAPHS);
        }
      });
    }
    setIsDeleteDialogOpen(false);
  };

  if (isLoading) {
    return <Loading message={t("common.loading")} />
  }

  if (isDeleting) {
    return <Loading message={t("adminParagraph.deleting")} />
  }

  return (
    <div className="px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <Button
          variant="outline"
          className="text-primary bg-white border-primary font-semibold hover:bg-primary/10 hover:text-primary w-full sm:w-auto"
          onClick={() => navigate(ROUTERS.ADMIN_PARAGRAPHS)}
        >
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <Button
            className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
            onClick={() => navigate(ROUTERS.ADMIN_PARAGRAPHS_EDIT.replace(":id", id || ""))}
          >
            <Pencil className="w-4 h-4 mr-2" />
            {t("common.edit")}
          </Button>
          <Button
            className="bg-rose-500 text-white hover:bg-rose-600 w-full sm:w-auto"
            variant="destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash className="w-4 h-4 mr-2" />
            {t("common.delete")}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6 space-y-0">
          <ParagraphInfo paragraph={paragraph} />
        </CardContent>
      </Card>

      <DeleteConfirmDialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen} 
        onDelete={handleDeleteParagraph} 
      />
    </div>
  );
};

export default AdminParagraphDetail; 