import React, { useContext, createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  username: string | null;
  token: string | null;
  login: (data: DataType) => Promise<void>;
  logout: () => void;
  register: (data: RegisterDataType) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type RegisterDataType = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};
type DataType = {
  username: string;
  password: string;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || "",
  );
  const navigate = useNavigate();

  const register = async (data: RegisterDataType) => {
    const endpoint = "https://api.boomtechnologies.de/account/register/";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        const res = await response.json();
        console.error("Registration failed:", res);
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  const login = async (data: DataType) => {
    try {
      const endpoint = "https://api.boomtechnologies.de/account/login/";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.token) {
        setUsername(data.username);
        setToken(res.token);
        localStorage.setItem("token", res.token);
        navigate("/dashboard");
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  const logout = async () => {
    try {
      const endpoint = "https://api.boomtechnologies.de/account/logout/";
      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      console.error("Error loggin out:", error);
    }
    setUsername(null);
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
