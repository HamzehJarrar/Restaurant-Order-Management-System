import { Box, Button, Typography, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMenu } from "../../../api/menu.api";
import { useTableStore } from "../../../store/Table.store";
import { getOrderByTable, addItemsToOrder } from "../../../api/order.api";

function Menu({ order, setOrder }) {
  const [tableMenu, setTableMenu] = useState([]);
  const selectedTable = useTableStore((state) => state.selectedTable);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      const menuData = await getMenu();
      setTableMenu(menuData || []);
    };
    fetchMenu();
  }, []);

  const handleAddItem = async (item) => {
    if (!selectedTable) return;

    setLoading(true);
    try {
      let currentOrder = order;

      if (!currentOrder) {
        currentOrder = await getOrderByTable(selectedTable._id);
      }

      const updatedOrder = await addItemsToOrder({
        orderId: currentOrder._id,
        items: [{ menuItemId: item._id, quantity: 1 }],
      });

      setOrder(updatedOrder);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 3,
        p: 2,
      }}
    >
      {tableMenu.map((item) => (
        <Paper
          key={item._id}
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            borderRadius: 3,
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 6,
            },
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              mb: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              borderRadius: 2,
            }}
          >
            <img
              src={item.image || "/placeholder.png"}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5, textAlign: "center" }}>
            {item.name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2, gap: 1 }}>
            <Typography variant="body2" fontWeight="bold" color="#acacacff" sx={{ mb: 1 }}>
              Price:
            </Typography>

            <Typography variant="h6" fontWeight="bold" color="#FF5733" sx={{ mb: 1 }}>
              ₪ {item.price}
            </Typography>
          </Box>


          <Button
            variant="contained"
            sx={{ backgroundColor: "#FF5733" }}
            fullWidth
            disabled={!selectedTable || loading}
            onClick={() => handleAddItem(item)}
          >
            Add to Order
          </Button>
        </Paper>
      ))}
    </Box>
  );
}

export default Menu;
