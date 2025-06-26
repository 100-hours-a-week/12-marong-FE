import DialogWrapper from "@/components/common/DialogWrapper";
import { useFormFields } from "@/hooks/useFormFields";
import DynamicGroupForm from "./DynamicGroupForm";
import type { GroupDialogProps } from "@/type/group";
import { useMutation } from "@tanstack/react-query";
import { groupQueries } from "@/api/group/queries";
import { useCheckDuplicate } from "@/hooks/useCheckDuplicate";
import { useEffect } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ICreateGroupRequestDto } from "@/api/group/type";

function GroupCreateDialog({ open, setOpen, onSuccess }: GroupDialogProps) {
  const { fields, errors, valid, handleFieldChange, reset } = useFormFields([
    "groupImage",
    "groupName",
    "description",
    "inviteCode",
    "groupUserProfileImage",
    "groupUserNicknameWithoutCheck",
  ]);

  const {
    checkDuplicate: checkGroupName,
    available,
    reset: resetGroupName,
  } = useCheckDuplicate(
    groupQueries.checkGroupName(fields.groupName as string)
  );

  const { mutate: createGroup } = useMutation({
    ...groupQueries.createGroup({
      ...fields,
      groupUserNickname: fields.groupUserNicknameWithoutCheck as string,
    } as ICreateGroupRequestDto),
    onSuccess: () => {
      onSuccess?.();
      handleClose();
    },
  });

  useEffect(() => {
    if (available === true) {
      resetGroupName();
    }
  }, [fields.groupName]);

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
      title="그룹 생성"
      description="그룹을 생성하려면 아래 정보를 입력하세요."
    >
      <DynamicGroupForm
        fields={["groupImage", "groupName", "description", "inviteCode"]}
        values={fields}
        errors={errors}
        onChange={handleFieldChange}
        onCheckGroupNameDuplicate={checkGroupName}
        disableGroupNameCheck={!valid.groupName}
        availableGroupName={available}
      />

      <div className="flex flex-col gap-2 p-4 rounded-xl border">
        <div className="text-sm text-brand-brown_dark">
          이 그룹에서 사용할 프로필 생성
        </div>

        <DynamicGroupForm
          fields={["groupUserProfileImage", "groupUserNicknameWithoutCheck"]}
          values={fields}
          errors={errors}
          onChange={handleFieldChange}
        />
      </div>

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
          disabled={
            !valid.inviteCode ||
            !available ||
            !valid.groupName ||
            !valid.groupUserNicknameWithoutCheck
          }
          onClick={() => createGroup()}
        >
          생성하기
        </Button>
      </DialogFooter>
    </DialogWrapper>
  );
}

export default GroupCreateDialog;
