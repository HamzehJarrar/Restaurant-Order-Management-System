import { useState } from "react";
import { Box, Drawer, Fab, Badge, useMediaQuery } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/layout/navbar";
import SideBar from "./components/SideBar";
import TableSummary from "./components/TableSummary";
import Menu from "./components/Menu.jsx";
import { useTableStore } from "../../store/Table.store";

const POSPage = () => {
  const selectedTable = useTableStore((s) => s.selectedTable);
  const order         = useTableStore((s) => s.order);
  const setOrder      = useTableStore((s) => s.setOrder);

  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const itemCount = order?.items?.reduce((s, i) => s + i.quantity, 0) ?? 0;

  return (
    <Box className="page-shell">
      <Navbar />

      <Box sx={{
        px: { xs: 1.5, sm: 2, md: 4 },
        py: { xs: 1.5, md: 3 },
        display: "grid",
        gap: { xs: 1.5, md: 3 },
        gridTemplateColumns: {
          xs: "1fr",
          md: "72px minmax(0, 1fr) 340px",
          lg: "88px minmax(0, 1fr) 380px",
        },
        alignItems: "start",
      }}>
        {/* Table Sidebar */}
        <SideBar />

        {/* Menu Panel */}
        <Box sx={{
          bgcolor: "rgba(255,255,255,0.88)",
          border: "1px solid rgba(148,163,184,0.16)",
          borderRadius: 4,
          p: { xs: 1.5, md: 2.5 },
          backdropFilter: "blur(12px)",
          boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
          minHeight: { xs: "auto", md: "calc(100vh - 140px)" },
        }}>
          <Menu order={order} setOrder={setOrder} />
        </Box>

        {/* Order Panel — desktop inline, mobile drawer */}
        {!isMobile ? (
          <Box>
            {selectedTable && (
              <TableSummary table={selectedTable} order={order} setOrder={setOrder} />
            )}
          </Box>
        ) : null}
      </Box>

      {/* Mobile: FAB to open order drawer */}
      {isMobile && selectedTable && (
        <>
          <Fab
            color="secondary"
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              color: "white",
              boxShadow: "0 8px 24px rgba(245,158,11,0.45)",
            }}
          >
            <Badge badgeContent={itemCount} color="error" max={99}>
              <ReceiptIcon />
            </Badge>
          </Fab>

          <Drawer
            anchor="bottom"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{ sx: { borderRadius: "24px 24px 0 0", maxHeight: "90vh", overflow: "auto" } }}
          >
            <Box sx={{ p: 2, pt: 1.5 }}>
              {/* Drag handle */}
              <Box sx={{ width: 40, height: 4, bgcolor: "rgba(148,163,184,0.4)", borderRadius: 2, mx: "auto", mb: 2 }} />
              <TableSummary table={selectedTable} order={order} setOrder={setOrder} />
            </Box>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default POSPage;
