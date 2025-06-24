import type { IGroupResponseDto } from "@/api/group/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GroupStore = {
  selectedGroup: IGroupResponseDto | null;
  setSelectedGroup: (group: IGroupResponseDto | null) => void;
};

export const useGroupStore = create<GroupStore>()(
  persist(
    (set) => ({
      selectedGroup: null,
      setSelectedGroup: (group) => set({ selectedGroup: group }),
    }),
    {
      name: "selected-group",
    }
  )
);
