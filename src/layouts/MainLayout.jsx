import { Outlet } from "react-router-dom"
import BottomNavigation from "../components/BottomNavigation"

export default function MainLayout() {
  return (
    <div className="w-full max-w-sm min-h-dvh pb-20">
      <Outlet />
      <BottomNavigation />
    </div>
  )
}
