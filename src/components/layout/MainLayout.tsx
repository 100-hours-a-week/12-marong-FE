import { Outlet, useLocation } from "react-router-dom";
import TopAppBar from "../common/TopAppBar";
import BottomNavBar from "../common/BottomNavBar";

const HIDE_NAV_PATHS = ["/auth"];

const MainLayout = () => {
  const location = useLocation();
  const shouldHideNav = HIDE_NAV_PATHS.includes(location.pathname);

  return (
    <div className="flex relative flex-col w-full bg-orange-50 min-h-dvh">
      <div className="flex relative flex-col flex-1 mx-auto w-full max-w-md bg-white">
        {!shouldHideNav && <TopAppBar />}
        <main className="flex flex-col flex-1 mb-16 w-full h-full">
          <Outlet />
        </main>
        {!shouldHideNav && <BottomNavBar />}
      </div>
    </div>
  );
};

export default MainLayout;
