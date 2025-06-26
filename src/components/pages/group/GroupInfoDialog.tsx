import { groupQueries } from "@/api/group/queries";
import DialogWrapper from "@/components/common/DialogWrapper";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { GroupDialogProps } from "@/type/group";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

function GroupInfoDialog({ open, setOpen, group }: GroupDialogProps) {
  if (!group) return null;

  const { data: userGroupList, refetch } = useQuery({
    ...groupQueries.getUserGroupList(group.groupId),
  });

  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title={`그룹 ${group.groupName} 정보`}
      //   description="그룹 정보를 확인하세요."
    >
      <div className="flex flex-col gap-4">
        <p className="flex gap-2 items-center">
          <Label className="font-bold text-brown-dark">그룹 이름</Label>
          <span>{group.groupName}</span>
        </p>
        <p className="flex gap-2 items-center">
          <Label className="font-bold text-brown-dark">그룹 설명</Label>
          <span>{group.description || "없음"}</span>
        </p>
        <p className="flex gap-2 items-center">
          <Label className="font-bold text-brown-dark">그룹 소속 인원</Label>
          <span>{group.memberCount}</span>
        </p>
        <Label className="font-bold text-brown-dark">그룹 멤버 목록</Label>
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
          {userGroupList?.nicknames.map((nickname) => (
            <div key={nickname}>
              <p>{nickname}</p>
            </div>
          ))}
        </div>
      </div>
    </DialogWrapper>
  );
}

export default GroupInfoDialog;
