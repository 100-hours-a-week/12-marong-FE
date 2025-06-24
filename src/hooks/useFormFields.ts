import { useState } from "react";

export type FieldType =
  | "groupName"
  | "description"
  | "inviteCode"
  | "groupImage"
  | "groupUserNickname"
  | "groupUserProfileImage";

export type FieldValue = string | File | null;

export type FormState = Record<FieldType, FieldValue>;
export type ErrorState = Record<FieldType, string>;
export type ValidState = Record<FieldType, boolean>;

const initialFormState: FormState = {
  groupName: "",
  description: "",
  inviteCode: "",
  groupImage: null as File | null,
  groupUserNickname: "",
  groupUserProfileImage: null as File | null,
};

const initialErrorState: ErrorState = {
  groupName: "",
  description: "",
  inviteCode: "",
  groupImage: "",
  groupUserNickname: "",
  groupUserProfileImage: "",
};

const initialValidState: ValidState = {
  groupName: false,
  description: false,
  inviteCode: false,
  groupImage: false,
  groupUserNickname: false,
  groupUserProfileImage: false,
};

export const useFormFields = (defaultFields: FieldType[]) => {
  const [fields, setFields] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<ErrorState>(initialErrorState);
  const [valid, setValid] = useState<ValidState>(initialValidState);

  const validators: Record<FieldType, (v: FieldValue) => string> = {
    groupName: (v) =>
      typeof v === "string" && v.length >= 2 && v.length <= 30
        ? ""
        : "그룹 이름은 2~10자, 한글, 영문, 숫자만 사용 가능합니다.",
    description: (v) => "",
    inviteCode: (v) =>
      typeof v === "string" &&
      /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6}$/.test(v)
        ? ""
        : "초대 코드는 영어와 숫자를 모두 포함한 6자리여야 합니다.",
    groupImage: (v) => "",
    groupUserNickname: (v) =>
      typeof v === "string" && /^[가-힣a-zA-Z0-9._\-\s()]{2,20}$/.test(v)
        ? ""
        : "닉네임은 2~20자, 한글/영문/숫자/기호(. _ - () 공백)만 가능합니다.",
    groupUserProfileImage: (v) => "",
  };

  const handleFieldChange = (name: FieldType, value: FieldValue) => {
    setFields((prev) => ({ ...prev, [name]: value }));

    if (validators[name]) {
      const err = validators[name](value);
      setErrors((prev) => ({ ...prev, [name]: err }));
      setValid((prev) => ({ ...prev, [name]: !err }));
    }
  };

  const reset = () => {
    setFields(initialFormState);
    setErrors(initialErrorState);
    setValid(initialValidState);
  };

  return {
    fields,
    errors,
    valid,
    handleFieldChange,
    reset,
  };
};
