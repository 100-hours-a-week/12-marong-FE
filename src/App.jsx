import {BrowserRouter as Router, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Login from './pages/Login';
import Survey from './pages/survey/Survey.jsx';
import './App.css'
import Feed from "./pages/Feed.jsx";
import Manitto from "./pages/Manitto.jsx";
import Recommendation from './pages/Recommendation.jsx';
import MainAppBar from "./components/MainAppBar.jsx";
import BottomNavigation from "./components/BottomNavigation.jsx";
import {GroupProvider} from "./context/GroupContext.jsx";
import FeedCreate from "./pages/FeedCreate.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GroupProvider>
        <Router>
          <div className="flex w-full min-h-dvh bg-orange-50">
            <AppRoutes/>
          </div>
        </Router>
      </GroupProvider>
    </QueryClientProvider>
  )
}

function AppRoutes() {
  const location = useLocation()
  const shouldShowTopBar = location.pathname.startsWith('/main')
  const shouldShowBottomBar = location.pathname.startsWith('/main')

  return (
    <div className="relative flex flex-col w-full max-w-sm min-h-dvh mx-auto items-center justify-center bg-white">
      {shouldShowTopBar && <MainAppBar/>}

      <div className="flex flex-1 w-full">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace/>}/>

          <Route path="/auth" element={<Login/>}/>
          <Route path="/survey" element={<Survey/>}/>

          <Route path="/main/home" element={<Feed/>}/>
          <Route path="/main/feed/create" element={<FeedCreate/>}/>
          <Route path="/main/manito" element={<Manitto/>}/>
          <Route path="/main/recommendation" element={<Recommendation/>}/>
          <Route path="/main/profile" element={<div>Profile</div>}/>
        </Routes>
      </div>

      {shouldShowBottomBar && <BottomNavigation/>}
    </div>
  )
}

export default App
