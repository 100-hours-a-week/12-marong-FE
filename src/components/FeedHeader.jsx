"use client"

import {useEffect, useState} from "react";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react"

function FeedHeader({selectedGroup, setSelectedGroup}) {
  const [groups, setGroups] = useState([
    "그룹1", "그룹2", "그룹3", "그룹4", "그룹5", "그룹6", "그룹7", "그룹8", "그룹9", "그룹10"
  ])

  useEffect(() => {
    console.log("Selected group:", selectedGroup)
  }, [selectedGroup])

  return (
    <div className="flex flex-row justify-between h-14 px-4 items-center border-b">
      {/* 그룹 선택 드롭박스 */}
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full py-2 font-bold">
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

export default FeedHeader