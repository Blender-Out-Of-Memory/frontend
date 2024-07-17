import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegistrationScreen from "./pages/RegistrationScreen";
import PrivateRoute from "./contexts/ProtectedRoute";
import LogInScreen from "./pages/LogInScreen";
import DashboardPage from "./pages/DashboardPage";
import AuthProvider from "./contexts/AuthProvider";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogInScreen />} />
          <Route path="/register" element={<RegistrationScreen />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
