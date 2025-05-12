import { Outlet } from "react-router-dom"
import BottomNavigation from "../components/BottomNavigation"
import {GroupProvider} from "../context/GroupContext.jsx";
import MainAppBar from "../components/MainAppBar.jsx";

export default function MainLayout() {
  return (
    <GroupProvider>
      <div className="w-full max-w-2xl min-h-dvh flex flex-col pb-16 pt-14">
        <MainAppBar />
        <Outlet />
        <BottomNavigation />
      </div>
    </GroupProvider>
  )
}
