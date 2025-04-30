import { Link, useLocation } from "react-router-dom"
import { Home, Users, ThumbsUp, User } from "lucide-react"

export default function BottomNavigation() {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { path: "/main/home", icon: Home, label: "홈" },
    { path: "/main/manito", icon: Users, label: "마니또" },
    { path: "/main/recommendation", icon: ThumbsUp, label: "추천" },
    { path: "/main/profile", icon: User, label: "프로필" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2">
      {navItems.map((item) => {
        const isActive = currentPath === item.path
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 px-4 ${isActive ? "text-pink-500" : "text-gray-500"}`}
          >
            <item.icon size={24} className={isActive ? "fill-pink-500" : ""} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
