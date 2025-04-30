import { Outlet } from "react-router-dom"
import BottomNavigation from "../components/BottomNavigation"

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white pb-16">
      <Outlet />
      <BottomNavigation />
    </div>
  )
}
