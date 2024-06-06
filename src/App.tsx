import React from "react"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import RegistrationScreen from "./pages/RegistrationScreen"
import { redirect } from "react-router-dom";
import PrivateRoute from "./contexts/ProtectedRoute"
import LogInScreen from "./pages/LogInScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegistrationScreen/>} />
          <Route path="/login" element={<LogInScreen/>} />
      </Routes>
    </Router>
      
  )
}

export default App