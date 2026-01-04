import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.js";
import MenuPage from "./pages/menu/MenuPage.jsx";
import KitchenPage from "./pages/kitchen/KitchenPage.jsx";
import POSPage from "./pages/orders/POSPage.jsx";
import PaidOrdersPage from "./pages/orders/PaidOrdersPage.jsx";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<h1>Restaurant Home</h1>} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/paid-orders" element={<PaidOrdersPage />} />
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/" element={<POSPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
