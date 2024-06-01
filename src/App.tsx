import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationScreen from "./pages/RegistrationScreen"


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
          <Route path="/register" element={<RegistrationScreen/>} />
      </Routes>
    </Router>
      
  )
}

export default App