import { Outlet, useLocation } from "react-router-dom";
import TopAppBar from "../common/TopAppBar";
import BottomNavBar from "../common/BottomNavBar";
import RequireAuth from "../auth/RequireAuth";

const HIDE_NAV_PATHS = ["/auth", "/survey"];

const MainLayout = () => {
  const location = useLocation();
  const shouldHideNav = HIDE_NAV_PATHS.includes(location.pathname);

  return (
    <div className="flex relative flex-col w-full bg-orange-50 min-h-dvh">
      <div className="flex relative flex-col flex-1 mx-auto w-full max-w-sm bg-white">
        {!shouldHideNav && <TopAppBar />}
        <main
          className={`flex flex-col flex-1 w-full h-full ${
            !shouldHideNav ? "mt-14 mb-16" : ""
          }`}
        >
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        </main>
        {!shouldHideNav && <BottomNavBar />}
      </div>
    </div>
  );
};

export default MainLayout;
