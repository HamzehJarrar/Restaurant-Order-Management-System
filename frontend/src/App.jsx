import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.js";
import LoginPage         from "./auth/LoginPage.jsx";
import RegisterPage      from "./auth/RegisterPage.jsx";
import KitchenPage       from "./pages/kitchen/KitchenPage.jsx";
import POSPage           from "./pages/orders/POSPage.jsx";
import PaidOrdersPage    from "./pages/orders/PaidOrdersPage.jsx";
import MenuDashboard     from "./pages/menu/MenuDashboard.jsx";
import MenuForm          from "./pages/menu/MenuForm.jsx";
import AdminAnalyticsPage from "./pages/AI/AdminAnalyticsPage.jsx";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/"              element={<PrivateRoute><POSPage /></PrivateRoute>} />
          <Route path="/kitchen"       element={<PrivateRoute><KitchenPage /></PrivateRoute>} />
          <Route path="/paid-orders"   element={<PrivateRoute><PaidOrdersPage /></PrivateRoute>} />
          <Route path="/menu-dashboard" element={<PrivateRoute><MenuDashboard /></PrivateRoute>} />
          <Route path="/menu-form"     element={<PrivateRoute><MenuForm /></PrivateRoute>} />
          <Route path="/admin-analytics" element={<PrivateRoute><AdminAnalyticsPage /></PrivateRoute>} />
          <Route path="*"              element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
