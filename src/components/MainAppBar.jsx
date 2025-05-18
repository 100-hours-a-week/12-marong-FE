"use client"

import {useEffect, useState} from "react";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react"
import {useGroup} from "../context/GroupContext.jsx";
import Logo from "../assets/logo.png";
import {useLocation} from "react-router-dom";
import {IoMdArrowRoundBack} from "react-icons/io";

function MainAppBar() {
  const location = useLocation()
  const shouldShowBack = location.pathname.startsWith('/main/feed/create')

  const {selectedGroup, setSelectedGroup} = useGroup()
  const [groups, setGroups] = useState([
    "카카오테크 부트캠프"
  ])

  useEffect(() => {
    console.log("Selected group:", selectedGroup)
  }, [selectedGroup])

  return (
    <div className="sticky w-full mx-auto top-0 flex h-14 px-4 items-center border-b bg-white gap-3 z-20">
      {/* 왼쪽 아이콘 */}
      {shouldShowBack ? (
        <IoMdArrowRoundBack
          size={24}
          onClick={() => window.history.back()}
        />
      ) : (
        <img
          src={Logo}
          alt="Logo"
          className="w-8 h-8"
        />
      )}


      {/* 그룹 선택 드롭박스 */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full py-2 font-bold text-xl">
            {selectedGroup ? selectedGroup : "그룹 선택"}
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5"
        >
          {groups.map((group) => (
            <div className="py-1">
              <MenuItem>
                <a
                  onClick={() => setSelectedGroup(group)}
                  className="block px-4 py-2 text-sm"
                >
                  {group}
                </a>
              </MenuItem>
            </div>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}

export default MainAppBar