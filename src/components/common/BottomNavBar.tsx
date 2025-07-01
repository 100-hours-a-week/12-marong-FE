import { navItems } from "@/constants/navItems";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="flex fixed bottom-0 z-50 justify-around items-center w-full max-w-sm h-16 bg-white border-t shadow">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname.startsWith(item.href);
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.href)}
            className={`flex flex-col items-center text-sm ${
              isActive ? "font-bold text-brown" : "text-gray-400"
            }`}
          >
            <Icon className="mb-1 w-6 h-6" />
            {item.name}
          </button>
        );
      })}
    </nav>
  );
}

export default BottomNavBar;
