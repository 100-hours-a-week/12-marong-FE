import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Survey from './pages/Survey';
import HomePage from "./pages/HomePage.jsx"
import ManitoPage from "./pages/ManitoPage"
import RecommendationPage from "./pages/RecommendationPage"
import ProfilePage from "./pages/ProfilePage"
import MainLayout from "./layouts/MainLayout"
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/survey" element={<Survey />} />

        <Route path="/main" element={<MainLayout />}>
          <Route index element={<Navigate to="/main/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="manito" element={<ManitoPage />} />
          <Route path="recommendation" element={<RecommendationPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
