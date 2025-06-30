import { groupQueries } from "@/api/group/queries";
import type { IUpdateUserGroupProfileRequestDto } from "@/api/group/type";
import DialogWrapper from "@/components/common/DialogWrapper";
import { useCheckDuplicate } from "@/hooks/useCheckDuplicate";
import { useFormFields } from "@/hooks/useFormFields";
import type { GroupDialogProps } from "@/type/group";
import { useMutation } from "@tanstack/react-query";
import DynamicGroupForm from "./DynamicGroupForm";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GroupUpdateDialog({
  open,
  setOpen,
  group,
}: GroupDialogProps) {
  if (!group) return null;

  const { fields, errors, valid, handleFieldChange, reset } = useFormFields([
    "groupUserProfileImage",
    "groupUserNickname",
  ]);

  const {
    checkDuplicate: checkNickname,
    available,
    reset: resetNickname,
  } = useCheckDuplicate(
    groupQueries.checkNickname({
      groupId: group.groupId,
      nickname: fields.groupUserNickname as string,
    })
  );

  const { mutate: updateGroup } = useMutation({
    ...groupQueries.updateUserGroupProfile(
      group.groupId,
      fields as IUpdateUserGroupProfileRequestDto
    ),
    onSuccess: () => {
      handleClose();
    },
  });

  useEffect(() => {
    if (available === true) {
      resetNickname();
    }
  }, [fields.groupUserNickname]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      reset();
    }
  };

  return (
    <DialogWrapper
      open={open}
      setOpen={handleOpenChange}
      title={`${group.groupName} 프로필 수정`}
      description="그룹 프로필을 수정하려면 아래 정보를 입력하세요."
    >
      <DynamicGroupForm
        fields={["groupUserProfileImage", "groupUserNickname"]}
        values={fields}
        errors={errors}
        onChange={handleFieldChange}
        onCheckNicknameDuplicate={checkNickname}
        disableNicknameCheck={!valid.groupUserNickname}
        availableNickname={available}
      />

      <DialogFooter className="flex gap-2 pt-4 w-full">
        <Button
          variant="outline"
          onClick={handleClose}
          className="flex-1 text-gray-500 bg-gray-200 hover:bg-gray-300"
        >
          취소
        </Button>
        <Button
          className="flex-1 py-2 text-base"
          disabled={!valid.groupUserNickname || !available}
          onClick={() => updateGroup()}
        >
          수정하기
        </Button>
      </DialogFooter>
    </DialogWrapper>
  );
}
