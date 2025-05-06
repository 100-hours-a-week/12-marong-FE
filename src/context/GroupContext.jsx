import { createContext, useContext, useState } from "react";

const GroupContext = createContext()

export const GroupProvider = ({ children }) => {
  const [selectedGroup, setSelectedGroup] = useState("카카오테크 부트캠프")

  return (
    <GroupContext.Provider value={{ selectedGroup, setSelectedGroup }}>
      {children}
    </GroupContext.Provider>
  )
}

export const useGroup = () => useContext(GroupContext)
