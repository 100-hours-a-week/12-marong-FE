import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown, Info, Pencil } from "lucide-react";
import { useMyGroup, usePublicGroup } from "@/hooks/useGroup";
import type { IGroupResponseDto } from "@/api/group/type";
import { useGroupStore } from "@/hooks/useGroupContext";
import { useLocation } from "react-router-dom";
import GroupJoinDialog from "@/components/pages/group/GroupJoinDialog";
import GroupCreateDialog from "../pages/group/GroupCreateDialog";
import GroupUpdateDialog from "../pages/group/GroupUpdateDialog";
import GroupInfoDialog from "../pages/group/GroupInfoDialog";

function TopAppBar() {
  const location = useLocation();
  const shouldShowBack = location.pathname.startsWith("/main/feed/create");

  const { data: myGroup, refetch: refetchMyGroup } = useMyGroup();
  const { data: publicGroup, hasNextPage, fetchNextPage } = usePublicGroup();

  const { selectedGroup, setSelectedGroup } = useGroupStore();
  const [selectedGroupToJoin, setSelectedGroupToJoin] =
    useState<IGroupResponseDto | null>(null);
  const [selectedGroupToUpdate, setSelectedGroupToUpdate] =
    useState<IGroupResponseDto | null>(null);
  const [selectedGroupToInfo, setSelectedGroupToInfo] =
    useState<IGroupResponseDto | null>(null);

  const [isGroupJoinDialogOpen, setIsGroupJoinDialogOpen] = useState(false);
  const [isGroupCreateDialogOpen, setIsGroupCreateDialogOpen] = useState(false);
  const [isGroupUpdateDialogOpen, setIsGroupUpdateDialogOpen] = useState(false);
  const [isGroupInfoDialogOpen, setIsGroupInfoDialogOpen] = useState(false);

  useEffect(() => {
    if (!selectedGroup && myGroup?.[myGroup.length - 1]) {
      setSelectedGroup(myGroup?.[myGroup.length - 1]);
    }
  }, [myGroup]);

  return (
    <div className="flex fixed top-0 z-50 gap-2 items-center px-4 py-2 w-full max-w-sm h-14 bg-white shadow">
      {shouldShowBack ? (
        <ArrowLeft
          className="w-5 h-5 cursor-pointer"
          onClick={() => window.history.back()}
        />
      ) : (
        <img src="/logo.png" alt="logo" className="h-full" />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 items-center text-xl font-bold">
          {selectedGroup?.groupName || "그룹 선택"}
          <ChevronDown className="w-5 h-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-48">
          <DropdownMenuLabel className="font-bold text-brown-dark">
            내 그룹
          </DropdownMenuLabel>
          {myGroup?.map((group) => (
            <DropdownMenuItem
              key={group.groupId}
              className={`py-2 flex items-center justify-between gap-12 text-black/80 ${
                selectedGroup?.groupId === group.groupId
                  ? "text-brown-dark"
                  : ""
              }`}
              // disabled={selectedGroup?.groupId === group.groupId}
              onSelect={() => {
                setSelectedGroup(group);
              }}
            >
              {group.groupName}

              <div className="flex gap-2 items-center">
                <Pencil
                  className="cursor-pointer pointer-events-auto hover:text-brown-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGroupToUpdate(group);
                    setIsGroupUpdateDialogOpen(true);
                  }}
                />

                <Info
                  className="cursor-pointer pointer-events-auto hover:text-brown-light"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGroupToInfo(group);
                    setIsGroupInfoDialogOpen(true);
                  }}
                />
              </div>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuLabel className="font-bold text-brown-dark">
            공개 그룹 가입
          </DropdownMenuLabel>
          <div className="overflow-y-auto relative max-h-52">
            {publicGroup?.pages.map((page) =>
              page.groups.map((group: IGroupResponseDto) => (
                <DropdownMenuItem
                  key={group.groupId}
                  disabled={myGroup?.some(
                    (myGroup) => myGroup.groupId === group.groupId
                  )}
                  onSelect={() => {
                    setSelectedGroupToJoin(group);
                    setIsGroupJoinDialogOpen(true);
                  }}
                >
                  {group.groupName}
                </DropdownMenuItem>
              ))
            )}

            {hasNextPage && (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  fetchNextPage();
                }}
                className="text-brown-dark hover:text-brown-dark"
              >
                더 보기
              </DropdownMenuItem>
            )}
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="text-base text-brown-dark hover:text-brown-dark"
            onSelect={() => setIsGroupCreateDialogOpen(true)}
          >
            그룹 생성
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedGroupToJoin && (
        <GroupJoinDialog
          open={isGroupJoinDialogOpen}
          setOpen={setIsGroupJoinDialogOpen}
          group={selectedGroupToJoin}
          onSuccess={() => {
            refetchMyGroup();
          }}
        />
      )}

      <GroupCreateDialog
        open={isGroupCreateDialogOpen}
        setOpen={setIsGroupCreateDialogOpen}
        onSuccess={() => {
          refetchMyGroup();
        }}
      />

      {selectedGroupToUpdate && (
        <GroupUpdateDialog
          open={isGroupUpdateDialogOpen}
          setOpen={setIsGroupUpdateDialogOpen}
          group={selectedGroupToUpdate}
        />
      )}

      {selectedGroupToInfo && (
        <GroupInfoDialog
          open={isGroupInfoDialogOpen}
          setOpen={setIsGroupInfoDialogOpen}
          group={selectedGroupToInfo}
        />
      )}
    </div>
  );
}

export default TopAppBar;
