"use client";

import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useGroup } from "../context/GroupContext.jsx";
import Logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GroupQueries } from "@/api/query/GroupQueries.js";
import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import GroupJoinDialog from "./group/GroupJoinDialog.jsx";
import GroupNicknameDialog from "./group/GroupProfileDialog.jsx";
import GroupCreateDialog from "./group/GroupCreateDialog.jsx";

function MainAppBar() {
  const location = useLocation();
  const shouldShowBack = location.pathname.startsWith("/main/feed/create");

  const { selectedGroup, setSelectedGroup } = useGroup();
  const [selectedGroupToJoin, setSelectedGroupToJoin] = useState(null);

  const [isGroupJoinDialogOpen, setIsGroupJoinDialogOpen] = useState(false);
  const [isNicknameRequired, setIsNicknameRequired] = useState(false);
  const [isGroupCreateDialogOpen, setIsGroupCreateDialogOpen] = useState(false);

  // 내 그룹 조회
  const { data: myGroups, mutate: getMyGroups } = useMutation({
    ...GroupQueries.myGroups(),
  });

  // 공개 그룹 조회
  const {
    data: publicGroups,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery({
    ...GroupQueries.getAllPublicGroups(),
  });

  // 그룹 닉네임 상태 조회(카카오테크 부트캠프만)
  const {
    data: nicknameStatus,
    isLoading: isNicknameStatusLoading,
    refetch: refetchNicknameStatus,
  } = useQuery({
    ...GroupQueries.checkNicknameStatus({
      groupId: 1,
    }),
    enabled: false,
  });

  useEffect(() => {
    getMyGroups();
  }, []);

  useEffect(() => {
    if (myGroups) {
      if (!selectedGroup) {
        setSelectedGroup(myGroups.data[myGroups.data.length - 1]);
      }
    }

    // 카카오테크 부트캠프만 닉네임 상태 조회
    if (myGroups?.data.some((group) => group.groupId === 1)) {
      refetchNicknameStatus();
    }
  }, [myGroups]);

  // 닉네임 없을 경우, 닉네임 입력 다이얼로그 띄우기
  useEffect(() => {
    if (nicknameStatus) {
      if (!nicknameStatus?.data.hasNickname && nicknameStatus?.data.required) {
        setIsNicknameRequired(true);
      }
    }
  }, [nicknameStatus]);

  return (
    <div className="sticky top-0 z-20 flex items-center w-full gap-3 px-4 mx-auto bg-white border-b h-14">
      {/* 왼쪽 아이콘 */}
      {shouldShowBack ? (
        <IoMdArrowRoundBack size={24} onClick={() => window.history.back()} />
      ) : (
        <img src={Logo} alt="Logo" className="w-8 h-8" />
      )}

      {/* 그룹 선택 드롭박스 */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex items-center justify-center w-full gap-x-1.5 py-2 font-bold text-xl mx-2">
            {selectedGroup ? selectedGroup.groupName : "그룹 선택"}
            <ChevronDownIcon aria-hidden="true" className="size-5" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute z-10 w-56 mt-2 origin-top-right bg-white divide-y-2 divide-gray-200 rounded-md shadow-lg ring-1 ring-black/5"
        >
          <div className="py-1">
            <div className="px-4 py-3 font-bold text-brand-brown_dark">
              내 그룹
            </div>

            {myGroups?.data.map((group) => (
              <MenuItem key={group.groupId}>
                <button
                  onClick={() => setSelectedGroup(group)}
                  className="block w-full px-4 py-3 text-sm hover:bg-gray-100 disabled:text-brand-brown_dark text-start"
                  disabled={selectedGroup?.groupId === group.groupId}
                >
                  {group.groupName}
                </button>
              </MenuItem>
            ))}
          </div>
          <div className="py-1">
            <div className="px-4 py-3 font-bold text-brand-brown_dark">
              공개 그룹 가입
            </div>

            {publicGroups?.pages.map((page) =>
              page.data.groups.map((group) => (
                <MenuItem key={group.groupId}>
                  <button
                    onClick={() => {
                      setSelectedGroupToJoin(group);
                      setIsGroupJoinDialogOpen(true);
                    }}
                    className="block w-full px-4 py-3 text-sm text-start hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={myGroups?.data.some(
                      (myGroup) => myGroup.groupId === group.groupId
                    )}
                  >
                    {group.groupName}
                  </button>
                </MenuItem>
              ))
            )}

            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                className="block w-full px-4 py-3 text-sm hover:bg-gray-100 text-start text-brand-brown_dark"
              >
                더 보기
              </button>
            )}
          </div>

          <div className="py-1">
            {/* 그룹 생성 */}
            <MenuItem key="createGroup">
              <a
                className="flex items-center gap-1 px-4 py-3 text-sm hover:bg-gray-100"
                onClick={() => setIsGroupCreateDialogOpen(true)}
              >
                그룹 생성
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>

      {selectedGroupToJoin && (
        <GroupJoinDialog
          open={isGroupJoinDialogOpen}
          setOpen={setIsGroupJoinDialogOpen}
          group={selectedGroupToJoin}
          onSuccess={() => {
            getMyGroups();
          }}
        />
      )}

      {isNicknameRequired && (
        <GroupNicknameDialog
          open={isNicknameRequired}
          setOpen={setIsNicknameRequired}
          group={myGroups?.data.find((group) => group.groupId === 1)}
        />
      )}

      {isGroupCreateDialogOpen && (
        <GroupCreateDialog
          open={isGroupCreateDialogOpen}
          setOpen={setIsGroupCreateDialogOpen}
          onSuccess={() => {
            getMyGroups();
          }}
        />
      )}
    </div>
  );
}

export default MainAppBar;
