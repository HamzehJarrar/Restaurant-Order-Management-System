import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.js";
import KitchenPage from "./pages/kitchen/KitchenPage.jsx";
import POSPage from "./pages/orders/POSPage.jsx";
import PaidOrdersPage from "./pages/orders/PaidOrdersPage.jsx";
import MenuDashboard from "./pages/menu/MenuDashboard.jsx";
import MenuForm from "./pages/menu/MenuForm.jsx";
import AdminAnalyticsPage from "./pages/AI/AdminAnalyticsPage.jsx";
import "./App.css";
import LoginPage from "./auth/LoginPage.jsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<h1>Restaurant Home</h1>} />
          <Route path="/paid-orders" element={<PaidOrdersPage />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/menu-dashboard" element={<MenuDashboard />} />
          <Route path="/menu-form" element={<MenuForm />} />
          <Route path="/admin-analytics" element={<AdminAnalyticsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<POSPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
