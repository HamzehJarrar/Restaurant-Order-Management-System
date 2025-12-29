import { Box, Button } from "@mui/material";
import { getTables } from "../../../api/table.api"
import { useTableStore } from "../../../store/Table.store";
import { useEffect } from "react";
import { orange } from "@mui/material/colors";

const SideBar = () => {
  const setTables = useTableStore((state) => state.setTables);
  const tableNumbers = useTableStore((state) => state.tableNumbers);
  const setSelectedTable = useTableStore((state) => state.setSelectedTable);
  const tables = useTableStore((state) => state.tables);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tables = await getTables();
        setTables(tables);
      } catch (error) {
        console.error("Failed to fetch tables:", error);
      }
    }
    fetchTables();
  }, []);


  return (
    <Box sx={{ display: "flex", width: "100px", mt: 2, gap: 1, flexDirection: "column" }}>
      {tableNumbers.map((tablesNumber) => (
        <Button key={tablesNumber}
          onClick={() => {
            const table = tables.find(t => t.number === tablesNumber);
            setSelectedTable(table);

          }}
          sx={{
            bgcolor: orange[500],
            color: "white"
          }}>{tablesNumber}</Button>
      ))}
    </Box>
  );
};

export default SideBar;
