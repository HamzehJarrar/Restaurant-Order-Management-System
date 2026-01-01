import { Box, Button, Typography } from "@mui/material";
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
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 3 }}>
      {tableMenu.map((item) => (
        <Box key={item._id} sx={{ border: "1px solid #eee", borderRadius: 2, p: 2, textAlign: "center" }}>
          <img src={item.image || "/placeholder.png"} alt={item.name} width="100" height="100" />
          <Typography fontWeight="bold">{item.name}</Typography>
          <Typography color="text.secondary">${item.price}</Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            disabled={!selectedTable || loading}
            onClick={() => handleAddItem(item)}
          >
            Add to Order
          </Button>
        </Box>
      ))}
    </Box>
  );
}


export default Menu;
