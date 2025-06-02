"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { GroupQueries } from "@/api/query/GroupQueries.js";
import { useMutation } from "@tanstack/react-query";

const initialState = {
  groupName: "",
  description: "",
  inviteCode: "",
  groupImage: null,
  groupUserNickname: "",
  groupUserProfileImage: null,
};
const initialError = {
  groupName: "",
  description: "",
  inviteCode: "",
  groupUserNickname: "",
};
const initialValid = {
  groupName: false,
  description: true,
  inviteCode: false,
  groupUserNickname: false,
};

export default function GroupCreateDialog({ open, setOpen, onSuccess }) {
  const [fields, setFields] = useState(initialState);
  const [error, setError] = useState(initialError);
  const [valid, setValid] = useState(initialValid);
  const [groupImageUrl, setGroupImageUrl] = useState("");
  const [groupUserProfileImageUrl, setGroupUserProfileImageUrl] = useState("");

  const { mutate: createGroup } = useMutation({
    ...GroupQueries.createGroup({
      groupName: fields.groupName,
      description: fields.description,
      inviteCode: fields.inviteCode,
      groupImage: fields.groupImage,
      groupUserNickname: fields.groupUserNickname,
      groupUserProfileImage: fields.groupUserProfileImage,
    }),
    onSuccess: () => {
      onSuccess && onSuccess();
      setOpen(false);
    },
    onError: (error) => {
      console.log("createGroupError", error);
      alert(error.response.data.message);
    },
  });

  const handleInput = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));

    if (name === "description") {
      return;
    }

    let isValid = false,
      errorMsg = "";

    if (name === "groupName") {
      if (!value) errorMsg = "";
      else if (!/^[가-힣a-zA-Z0-9]{2,10}$/.test(value))
        errorMsg =
          "그룹 이름은 한글, 영문, 숫자만 사용 가능합니다.(2자 이상 10자 이하)";
      else isValid = true;
    }
    if (name === "inviteCode") {
      if (!value) errorMsg = "";
      else if (!/^[A-Za-z0-9]{6}$/.test(value))
        errorMsg = "초대 코드는 영어와 숫자를 모두 포함한 6자리여야 합니다.";
      else isValid = true;
    }
    if (name === "groupUserNickname") {
      if (!value) errorMsg = "";
      else if (!/^[가-힣a-zA-Z0-9._\-\s()]{2,20}$/.test(value))
        errorMsg =
          "닉네임은 한글, 영문, 숫자, 점(.), 언더스코어(_), 하이픈(-), 괄호, 공백만 사용 가능합니다.(2자 이상 20자 이하)";
      else isValid = true;
    }
    setError((prev) => ({ ...prev, [name]: errorMsg }));
    setValid((prev) => ({ ...prev, [name]: isValid }));
  };

  const handleGroupImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFields((prev) => ({
      ...prev,
      groupImage: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setGroupImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleGroupUserProfileImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFields((prev) => ({
      ...prev,
      groupUserProfileImage: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setGroupUserProfileImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setOpen(false);
    setFields(initialState);
    setError(initialError);
    setValid(initialValid);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-20">
      <DialogBackdrop
        transition
        className="fixed inset-0 transition-opacity bg-gray-500/75 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 max-w-sm mx-auto overflow-y-auto">
        <div className="flex items-center justify-center w-full p-4 min-h-dvh">
          <DialogPanel
            transition
            className="relative w-full p-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl"
          >
            <DialogTitle className="text-xl font-bold text-start">
              그룹 생성
            </DialogTitle>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center mx-auto text-gray-400 transition border rounded-full size-24 hover:border-brand-pink text-start overflow-hidden">
                    {groupImageUrl ? (
                      <img
                        src={groupImageUrl}
                        alt="업로드 미리보기"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      "그룹 이미지"
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleGroupImage}
                  />
                </label>

                <input
                  type="text"
                  placeholder="그룹 이름"
                  maxLength={10}
                  onChange={(e) => handleInput("groupName", e.target.value)}
                  className="w-full p-3 mt-2 text-sm border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
                />
                {error.groupName && (
                  <p className="text-sm text-red-500 ps-2 text-start">
                    {error.groupName}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="그룹 설명"
                  maxLength={30}
                  onChange={(e) => handleInput("description", e.target.value)}
                  className="w-full p-3 mt-2 text-sm border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
                />
                {error.description && (
                  <p className="text-sm text-red-500 ps-2 text-start">
                    {error.description}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="초대 코드 (6자리)"
                  maxLength={6}
                  onChange={(e) => handleInput("inviteCode", e.target.value)}
                  className="w-full p-3 mt-2 text-sm border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
                />
                {error.inviteCode && (
                  <p className="text-sm text-red-500 ps-2">
                    {error.inviteCode}
                  </p>
                )}

                <div className="flex flex-col gap-2 p-4 border rounded-xl">
                  <div className="text-sm text-brand-brown_dark">
                    이 그룹에서 사용할 프로필 생성
                  </div>

                  <label className="cursor-pointer">
                    <div className="flex items-center justify-center mx-auto text-gray-400 transition border rounded-full size-24 hover:border-brand-pink text-start overflow-hidden">
                      {groupUserProfileImageUrl ? (
                        <img
                          src={groupUserProfileImageUrl}
                          alt="업로드 미리보기"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "프로필 이미지"
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleGroupUserProfileImage}
                    />
                  </label>

                  <input
                    type="text"
                    placeholder="닉네임"
                    onChange={(e) =>
                      handleInput("groupUserNickname", e.target.value)
                    }
                    className="w-full p-3 mt-2 text-sm border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  />
                  {error.groupUserNickname && (
                    <p className="text-sm text-red-500 ps-2">
                      {error.groupUserNickname}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <button
                  onClick={handleClose}
                  className="flex-1 p-3 text-sm text-gray-500 bg-gray-200 border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    console.log("fields", fields);
                    createGroup();
                  }}
                  disabled={
                    !valid.groupName ||
                    !valid.description ||
                    !valid.inviteCode ||
                    !valid.groupUserNickname
                  }
                  className="flex-1 p-3 text-sm text-white border resize-none bg-brand-pink rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  그룹 생성
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
