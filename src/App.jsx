import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Survey from './pages/Survey';
import './App.css'
import {useState} from "react";

function App() {
  return (
    <Router>
      <div className="min-h-dvh flex flex-col items-center justify-center p-4 bg-white">
        <Routes>
          <Route path="/auth" element={<Login />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
