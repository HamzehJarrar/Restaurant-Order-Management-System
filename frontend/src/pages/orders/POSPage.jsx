import Navbar from "../../components/layout/navbar";
import { Box, Grid } from "@mui/material";
import SideBar from "./components/sideBar";
import TableSummary from "./components/TableSummary";
import { useTableStore } from "../../store/Table.store";

const POSPage = () => {
  const selectedTable = useTableStore((state) => state.selectedTable);

  return (
    <Box>
      <Navbar />

      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          height: "calc(100vh - 100px)",
        }}
      >
        {/* SideBar */}
        <Grid item xs={12} md={2}>
          <SideBar />
        </Grid>

        {/* Menu */}
        <Grid item xs={12} md={5}>
          <h1>Menu</h1>
        </Grid>

        {/* Table Summary */}
        <Grid item xs={12} md={5}>
          {selectedTable && <TableSummary table={selectedTable} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default POSPage;
