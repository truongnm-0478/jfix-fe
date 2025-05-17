import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminUser, UserQueryParams } from "@/dataHelper/adminUser.dataHelper";
import { useLockUser, useUnlockUser } from "@/hooks/useAdminUser";
import { ArrowUpDown, Eye, Lock, MoreVertical, UnlockKeyhole } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface UserTableProps {
  users: AdminUser[];
  isLoading: boolean;
  filters: UserQueryParams;
  handleSort: (column: string) => void;
  handleViewUser: (user: AdminUser) => void;
  sortableColumns: string[];
}

const UserTable = ({
  users,
  isLoading,
  filters,
  handleSort,
  handleViewUser,
  sortableColumns
}: UserTableProps) => {
  const { t } = useTranslation();
  
  const [dialogState, setDialogState] = useState<{isOpen: boolean; user: AdminUser | null}>({ isOpen: false, user: null });
  const { mutate: lockUserMutate, isPending: isLocking } = useLockUser();
  const { mutate: unlockUserMutate, isPending: isUnlocking } = useUnlockUser();

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

  const openLockDialog = (user: AdminUser) => {
    setDialogState({ isOpen: true, user });
  };

  const closeLockDialog = () => {
    setDialogState({ isOpen: false, user: null });
  };

  const handleToggleUserLock = () => {
    if (!dialogState.user) return;
    
    const userId = String(dialogState.user.id);
    const isDeleted = dialogState.user.deleted;
    
    if (isDeleted) {
      unlockUserMutate(userId);
    } else {
      lockUserMutate(userId);
    }
  };

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table className="w-full table-fixed min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">#</TableHead>
              {renderTableHeader("username", t("adminUsers.username"), "w-[140px]")}
              {renderTableHeader("name", t("adminUsers.name"), "w-[200px]")}
              {renderTableHeader("email", t("adminUsers.email"), "w-[180px]")}
              {renderTableHeader("phone", t("adminUsers.phone"), "w-[120px]")}
              {renderTableHeader("role", t("adminUsers.role"), "w-[100px]", true)}
              {renderTableHeader("deleted", t("adminUsers.status"), "w-[100px]", true)}
              <TableHead className="text-center w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isLocking || isUnlocking ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <div className="flex justify-center items-center">
                    <Loading message={isLocking || isUnlocking 
                      ? `${isLocking ? t("adminUsers.locking") : t("adminUsers.unlocking")} user...` 
                      : t("adminUsers.loading")
                    } />
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  {t("adminUsers.noUsersFound")}
                </TableCell>
              </TableRow>
            ) : (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center">{(filters.page || 0) * (filters.size || 5) + index + 1}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email || "-"}</TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  <TableCell>
                    <div className={`rounded-md px-2 py-1 text-xs text-center min-w-[100px] ${user.role === "ADMIN" ? "bg-blue-50 text-blue-500" : "bg-cyan-50 text-cyan-500"}`}>
                      {t(`adminUsers.${user.role.toLowerCase()}`)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`rounded-md px-2 py-1 text-xs text-center min-w-[100px] ${user.deleted ? "bg-rose-50 text-rose-500" : "bg-green-50 text-green-500"}`}>
                      {user.deleted ? t("adminUsers.deleted") : t("adminUsers.active")}
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
                        <DropdownMenuItem onSelect={() => handleViewUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {t("adminUsers.viewDetails")}
                        </DropdownMenuItem>
                        {user.role !== "ADMIN" && (
                          <DropdownMenuItem 
                            onSelect={() => {
                              openLockDialog(user);
                            }}
                          >
                            {user.deleted ? (
                              <>
                                <UnlockKeyhole className="mr-2 h-4 w-4 text-green-500" />
                                {t("adminUsers.unlockUser")}
                              </>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4 text-red-500" />
                                {t("adminUsers.lockUser")}
                              </>
                            )}
                          </DropdownMenuItem>
                        )}
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
        onClose={closeLockDialog}
        onConfirm={handleToggleUserLock}
        title={dialogState.user?.deleted ? t("adminUsers.unlockUser") : t("adminUsers.lockUser")}
        description={
          dialogState.user
              ? `${t("adminUsers.confirm")} ${
                dialogState.user.deleted ? t("adminUsers.unlockUser").toLowerCase() : t("adminUsers.lockUser").toLowerCase()
              } ${t("adminUsers.user").toLowerCase()} ${dialogState.user.username}?`
            : ""
        }
        confirmText={dialogState.user?.deleted ? t("adminUsers.unlockUser") : t("adminUsers.lockUser")}
        confirmVariant={dialogState.user?.deleted ? "default" : "destructive"}
      />
    </>
  );
};

export default UserTable; 