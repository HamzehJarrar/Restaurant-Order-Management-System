// src/pages/Kitchen/KitchenPage.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Chip, Divider } from "@mui/material";
import Navbar from "../../components/layout/navbar";
import socket from "../../socket";
import { getAllOrders } from "../../api/order.api";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

  // src/pages/Kitchen/KitchenPage.jsx

// ... داخل الكومبوننت KitchenPage

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      if (response.data.success) {
        // 🔥 تعديل: فلترة الطلبات لعرض فقط التي حالتها ليست pending
        const kitchenOrders = response.data.data.filter(order => order.status !== "pending");
        setOrders(kitchenOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  fetchOrders();
}, []);

useEffect(() => {
  socket.on("order:new", (newOrder) => {
    // 🔥 تعديل: لا تضف الطلب الجديد إذا كان pending
    if (newOrder.status !== "pending") {
      setOrders((prev) => [newOrder, ...prev]);
    }
  });

  socket.on("order:statusChanged", (updatedOrder) => {
    setOrders((prev) => {
      const exists = prev.find(o => o._id === updatedOrder._id);
      
      if (exists) {
        if (updatedOrder.status === "pending") {
          return prev.filter(o => o._id !== updatedOrder._id);
        }
        return prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
      } else {
        if (updatedOrder.status !== "pending") {
          return [updatedOrder, ...prev];
        }
        return prev;
      }
    });
  });

  return () => {
    socket.off("order:new");
    socket.off("order:statusChanged");
  };
}, []);


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Box p={3}>
        <Typography variant="h4" mb={3} fontWeight="bold">
          🍳 Kitchen Orders
        </Typography>

        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">Table: {order.table?.number || "N/A"}</Typography>
                    <Chip
                      label={order.status}
                      color={order.status === "pending" ? "warning" : "success"}
                      size="small"
                    />
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  {order.items.map((item, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" my={0.5}>
                      <Typography variant="body2">
                        {item.name} <strong>x{item.quantity}</strong>
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ mt: 2, mb: 1 }} />
                  <Typography variant="caption" color="textSecondary">
                    Total: ${order.totalAmount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}