import { Box, Button, Typography, Tooltip } from "@mui/material";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { getTables } from "../../../api/table.api";
import { useTableStore } from "../../../store/Table.store";
import { useEffect } from "react";

const SideBar = () => {
  const setTables    = useTableStore((s) => s.setTables);
  const tableNumbers = useTableStore((s) => s.tableNumbers);
  const tables       = useTableStore((s) => s.tables);
  const selectedTable   = useTableStore((s) => s.selectedTable);
  const setSelectedTable = useTableStore((s) => s.setSelectedTable);

  useEffect(() => {
    getTables()
      .then(setTables)
      .catch((e) => console.error("Failed to fetch tables:", e));
  }, []);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: { xs: "row", md: "column" },
      gap: 1,
      p: { xs: 1.5, md: 2 },
      bgcolor: "rgba(255,255,255,0.9)",
      borderRadius: 3,
      border: "1px solid rgba(148,163,184,0.2)",
      boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
      overflowX: { xs: "auto", md: "visible" },
      position: "sticky",
      top: 80,
      alignSelf: "start",
      flexShrink: 0,
    }}>
      {/* Label — desktop only */}
      <Box sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", alignItems: "center", mb: 1 }}>
        <TableRestaurantIcon sx={{ color: "text.secondary", fontSize: 20 }} />
        <Typography variant="caption" sx={{
          fontWeight: 700, color: "text.secondary",
          letterSpacing: 0.5, textTransform: "uppercase", fontSize: 10, mt: 0.5
        }}>
          Tables
        </Typography>
      </Box>

      {tableNumbers.map((num) => {
        const table = tables.find((t) => t.number === num);
        const active = selectedTable?.number === num;
        return (
          <Tooltip key={num} title={`Table ${num}`} placement="right" arrow>
            <Button
              onClick={() => setSelectedTable(table)}
              sx={{
                minWidth: { xs: 44, md: 52 },
                height: { xs: 44, md: 52 },
                p: 0,
                flexShrink: 0,
                bgcolor: active ? "secondary.main" : "rgba(15,23,42,0.05)",
                color: active ? "white" : "text.primary",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 2.5,
                boxShadow: active ? "0 4px 14px rgba(245,158,11,0.4)" : "none",
                transition: "all 0.18s ease",
                "&:hover": {
                  bgcolor: active ? "secondary.dark" : "rgba(15,23,42,0.1)",
                  transform: "scale(1.05)",
                },
              }}
            >
              {num}
            </Button>
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default SideBar;
