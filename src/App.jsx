import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Survey from './pages/survey/Survey.jsx';
import './App.css'
import MainLayout from "./layouts/MainLayout.jsx";
import Feed from "./pages/Feed.jsx";
import Manitto from "./pages/Manitto.jsx";
import Recommendation from './pages/Recommendation.jsx';

function App() {
  return (
    <Router>
      <div className="relative flex flex-col min-h-dvh max-w-2xl mx-auto font-marong">
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace/>}/>

          <Route path="/auth" element={<Login/>}/>
          <Route path="/survey" element={<Survey/>}/>

          <Route path="/main" element={<MainLayout/>}>
            <Route path="home" element={<Feed/>}/>
            <Route path="manito" element={<Manitto/>}/>
            <Route path="recommendation" element={<Recommendation/>}/>
            <Route path="profile" element={<div>Profile</div>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
