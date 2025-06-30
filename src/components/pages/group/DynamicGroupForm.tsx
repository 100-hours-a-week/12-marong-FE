import ImageUploader from "@/components/common/ImageUploader";
import {
  InputField,
  InputFieldWithButton,
} from "@/components/common/InputField";
import type {
  ErrorState,
  FieldType,
  FieldValue,
  FormState,
} from "@/hooks/useFormFields";

type DynamicGroupFormProps = {
  fields: FieldType[];
  values: FormState;
  errors: ErrorState;
  onChange: (name: FieldType, value: FieldValue) => void;
  onCheckNicknameDuplicate?: () => void;
  onCheckGroupNameDuplicate?: () => void;
  disableNicknameCheck?: boolean;
  disableGroupNameCheck?: boolean;
  availableNickname?: boolean | null;
  availableGroupName?: boolean | null;
};

export default function DynamicGroupForm({
  fields,
  values,
  errors,
  onChange,
  onCheckNicknameDuplicate,
  onCheckGroupNameDuplicate,
  disableNicknameCheck,
  disableGroupNameCheck,
  availableNickname,
  availableGroupName,
}: DynamicGroupFormProps) {
  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => {
        switch (field) {
          case "groupUserProfileImage":
            return (
              <ImageUploader
                key="groupUserProfileImage"
                label="프로필 이미지"
                onChange={(file) => onChange("groupUserProfileImage", file)}
              />
            );
          case "groupImage":
            return (
              <ImageUploader
                key="groupProfileImage"
                label="그룹 이미지"
                onChange={(file) => onChange("groupImage", file)}
              />
            );
          case "inviteCode":
            return (
              <InputField
                key="inviteCode"
                label="초대 코드"
                value={values.inviteCode as string}
                error={errors.inviteCode}
                onChange={(val) => onChange("inviteCode", val)}
                maxLength={6}
                placeholder="초대 코드를 입력해주세요."
              />
            );
          case "groupName":
            return (
              <InputFieldWithButton
                key="groupName"
                label="그룹 이름"
                value={values.groupName as string}
                error={errors.groupName}
                onChange={(val) => onChange("groupName", val)}
                maxLength={20}
                placeholder="그룹 이름을 입력해주세요."
                onCheckDuplicate={onCheckGroupNameDuplicate}
                disableCheck={disableGroupNameCheck}
                available={availableGroupName}
              />
            );
          case "groupUserNickname":
            return (
              <InputFieldWithButton
                key="groupUserNickname"
                label="닉네임"
                value={values.groupUserNickname as string}
                error={errors.groupUserNickname}
                onChange={(val) => onChange("groupUserNickname", val)}
                maxLength={20}
                placeholder="닉네임을 입력해주세요."
                onCheckDuplicate={onCheckNicknameDuplicate}
                disableCheck={disableNicknameCheck}
                available={availableNickname}
              />
            );
          case "groupUserNicknameWithoutCheck":
            return (
              <InputField
                key="groupUserNicknameWithoutCheck"
                label="닉네임"
                value={values.groupUserNicknameWithoutCheck as string}
                error={errors.groupUserNicknameWithoutCheck}
                onChange={(val) =>
                  onChange("groupUserNicknameWithoutCheck", val)
                }
                maxLength={20}
                placeholder="닉네임을 입력해주세요."
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
