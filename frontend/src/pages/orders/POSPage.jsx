import Navbar from "../../components/layout/navbar";
import { Box } from "@mui/material";
import SideBar from "./components/sideBar";
import TableSummary from "./components/TableSummary";
import { useTableStore } from "../../store/Table.store";
import Menu from "./components/Menu.jsx";

const POSPage = () => {
  const selectedTable = useTableStore((state) => state.selectedTable);
  const order = useTableStore((state) => state.order);
  const setOrder = useTableStore((state) => state.setOrder);

  return (
    <Box>
      <Navbar />
      <Box sx={{ display: "flex", mt: 2 }}>
        <Box sx={{ borderRight: "1px solid #eee", height: "100%" }}>
          <SideBar />
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto", m: 2, px: 2 }}>
          <Menu order={order} setOrder={setOrder} />
        </Box>

        <Box sx={{ mt: 2 }}>
          {selectedTable && (
            <TableSummary table={selectedTable} order={order} setOrder={setOrder} />
          )}
        </Box>
      </Box>
    </Box>
  );
};



export default POSPage;
