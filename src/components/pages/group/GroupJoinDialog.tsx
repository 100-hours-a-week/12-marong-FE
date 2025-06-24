import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { groupQueries } from "@/api/group/queries";
import type { IGroupResponseDto, IJoinGroupRequestDto } from "@/api/group/type";
import DialogWrapper from "@/components/common/DialogWrapper";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFormFields } from "@/hooks/useFormFields";
import DynamicGroupForm from "./DynamicGroupForm";
import { useCheckDuplicate } from "@/hooks/useCheckDuplicate";

type GroupJoinDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  group: IGroupResponseDto;
};

export default function GroupJoinDialog({
  open,
  setOpen,
  onSuccess,
  group,
}: GroupJoinDialogProps) {
  const { fields, errors, valid, handleFieldChange, reset } = useFormFields([
    "groupUserProfileImage",
    "inviteCode",
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

  const { mutate: joinGroup } = useMutation({
    ...groupQueries.joinGroup(group.groupId, fields as IJoinGroupRequestDto),
    onSuccess: () => {
      onSuccess?.();
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
      title={`${group.groupName} 가입`}
      description="그룹에 가입하려면 아래 정보를 입력하세요."
    >
      <DynamicGroupForm
        fields={["groupUserProfileImage", "inviteCode", "groupUserNickname"]}
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
          disabled={!valid.inviteCode || !available}
          onClick={() => joinGroup()}
        >
          가입하기
        </Button>
      </DialogFooter>
    </DialogWrapper>
  );
}
