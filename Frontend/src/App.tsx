import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import POS from "./pages/POS/POS";

function Dashboard() {
  return <h1>Dashboard (Admin Only)</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pos" element={<POS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
