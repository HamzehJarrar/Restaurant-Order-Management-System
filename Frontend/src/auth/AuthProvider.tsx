import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "waiter";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    // توجيه حسب الدور
    if (user.role === "admin") window.location.href = "/dashboard";
    else window.location.href = "/pos";
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
