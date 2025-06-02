"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { GroupQueries } from "@/api/query/GroupQueries.js";
import { useMutation } from "@tanstack/react-query";

const initialState = {
  inviteCode: "",
  nickname: "",
  groupUserProfileImage: null,
};
const initialError = {
  inviteCode: "",
  nickname: "",
};
const initialValid = {
  inviteCode: false,
  nickname: false,
};

export default function GroupJoinDialog({ open, setOpen, onSuccess, group }) {
  const [fields, setFields] = useState(initialState);
  const [error, setError] = useState(initialError);
  const [valid, setValid] = useState(initialValid);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [nicknameValidMsg, setNicknameValidMsg] = useState("");

  const {
    data: nicknameCheckData,
    mutate: checkNickname,
    isSuccess: isNicknameChecked,
  } = useMutation({
    ...GroupQueries.checkNickname({
      groupId: group.groupId,
      nickname: fields.nickname,
    }),
    onError: (error) => {
      console.log("checkNicknameError", error);
      alert(error.response.data.message);
    },
  });

  const { data: joinGroupData, mutate: joinGroup } = useMutation({
    ...GroupQueries.joinGroup({
      groupId: group.groupId,
      inviteCode: fields.inviteCode,
      nickname: fields.nickname,
      groupUserProfileImage: fields.groupUserProfileImage,
    }),
    onSuccess: () => {
      onSuccess && onSuccess();
      setOpen(false);
    },
    onError: (error) => {
      console.log("joinGroupError", error);
      alert(error.response.data.message);
    },
  });

  useEffect(() => {
    if (isNicknameChecked) {
      if (nicknameCheckData.data.available) {
        setValid((prev) => ({ ...prev, nickname: true }));
        setNicknameValidMsg("사용 가능한 닉네임입니다.");
        setError((prev) => ({ ...prev, nickname: "" }));
      } else {
        setValid((prev) => ({ ...prev, nickname: false }));
        setNicknameValidMsg("");
        setError((prev) => ({
          ...prev,
          nickname: "이미 사용중인 닉네임입니다.",
        }));
      }
    }
  }, [isNicknameChecked]);

  const handleInput = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }));

    let isValid = false,
      errorMsg = "";
    if (name === "inviteCode") {
      if (!value) errorMsg = "";
      else if (!/^[A-Za-z0-9]{6}$/.test(value))
        errorMsg = "초대 코드는 영어와 숫자를 모두 포함한 6자리여야 합니다.";
      else isValid = true;
    }
    if (name === "nickname") {
      if (!value) errorMsg = "";
      else if (!/^[가-힣a-zA-Z0-9._\-\s()]{2,20}$/.test(value))
        errorMsg =
          "닉네임은 한글, 영문, 숫자, 점(.), 언더스코어(_), 하이픈(-), 괄호, 공백만 사용 가능합니다.(2자 이상 20자 이하)";
      else isValid = true;
    }
    setError((prev) => ({ ...prev, [name]: errorMsg }));
    setValid((prev) => ({ ...prev, [name]: isValid }));
    if (name === "nickname") {
      setNicknameValidMsg("");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFields((prev) => ({
      ...prev,
      groupUserProfileImage: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setOpen(false);
    setFields(initialState);
    setError(initialError);
    setValid(initialValid);
    setNicknameValidMsg("");
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
              그룹 가입
            </DialogTitle>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label className="cursor-pointer">
                  <div className="flex items-center justify-center mx-auto text-gray-400 transition border rounded-full size-24 hover:border-brand-pink text-start overflow-hidden">
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
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
                    onChange={handleImage}
                  />
                </label>

                <div className="w-full p-3 mt-2 text-brand-brown_dark">
                  그룹 이름: {group.groupName}
                </div>
                {error.groupId && (
                  <p className="text-sm text-red-500 ps-2 text-start">
                    {error.groupId}
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

                <div className="flex flex-row w-full gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="닉네임"
                    onChange={(e) => handleInput("nickname", e.target.value)}
                    className="flex-1 p-3 text-sm border resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink"
                  />

                  <button
                    className="px-2 text-white bg-brand-pink rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!fields.nickname || !valid.nickname}
                    onClick={() => {
                      checkNickname();
                    }}
                  >
                    중복 확인
                  </button>
                </div>
                {error.nickname && (
                  <p className="text-sm text-red-500 ps-2">{error.nickname}</p>
                )}
                {nicknameValidMsg && (
                  <p className="text-sm text-green-500 ps-2">
                    {nicknameValidMsg}
                  </p>
                )}
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
                    joinGroup();
                  }}
                  disabled={
                    !valid.nickname ||
                    !valid.inviteCode ||
                    !fields.inviteCode ||
                    !fields.nickname ||
                    nicknameValidMsg !== "사용 가능한 닉네임입니다."
                  }
                  className="flex-1 p-3 text-sm text-white border resize-none bg-brand-pink rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-pink disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  가입
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
