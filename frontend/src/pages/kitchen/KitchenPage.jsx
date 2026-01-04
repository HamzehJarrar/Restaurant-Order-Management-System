import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import Navbar from "../../components/layout/navbar";
import socket from "../../socket";
import { getAllOrders, updateStatus } from "../../api/order.api";
import TimerIcon from "@mui/icons-material/Timer";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.data.success) {
          const kitchenOrders = response.data.data.filter(
            (order) => order.status !== "pending" && order.status !== "served" && order.status !== "paid"
          );
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
      if (newOrder.status !== "pending" && newOrder.status !== "paid") {
        setOrders((prev) => [newOrder, ...prev]);
      }
    });

    socket.on("order:statusChanged", (updatedOrder) => {
      setOrders((prev) => {
        const exists = prev.find((o) => o._id === updatedOrder._id);
        if (exists) {
          if (["pending", "served", "paid"].includes(updatedOrder.status)) {
            return prev.filter((o) => o._id !== updatedOrder._id);
          }
          return prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o));
        } else {
          if (!["pending", "served", "paid"].includes(updatedOrder.status)) {
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

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateStatus(orderId, { status: newStatus });

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "cooking": return "primary";
      case "ready": return "success";
      case "OPEN": return "warning";
      default: return "default";
    }
  };

  console.log("Current Orders:", orders);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Box p={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight="800" color="primary">
            🍳 Kitchen Dashboard
          </Typography>
          <Chip
            label={`Active Orders: ${orders.length}`}
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: "bold" }}
          />
        </Stack>

        <Grid container spacing={3}>
          {orders.length === 0 ? (
            <Box sx={{ width: '100%', textAlign: 'center', mt: 10 }}>
              <Typography variant="h6" color="textSecondary">No pending orders. Take a break! ☕</Typography>
            </Box>
          ) : (
            orders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order._id}>
                <Card
                  elevation={4}
                  sx={{
                    borderRadius: 3,
                    borderLeft: `8px solid ${order.status === 'ready' ? '#4caf50' : '#ff9800'}`,
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h5" fontWeight="bold">
                        Table {order.table?.number || "N/A"}
                      </Typography>
                      <Chip
                        label={order.status.toUpperCase()}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                      <TimerIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="textSecondary">
                        Ordered at: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                    </Stack>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ minHeight: "100px" }}>
                      {order.items.map((item, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" my={1}>
                          <Typography variant="body1" fontWeight="500">
                            • {item.name}
                          </Typography>
                          <Typography variant="body1" sx={{ bgcolor: "#eee", px: 1, borderRadius: 1, fontWeight: "bold" }}>
                            x{item.quantity}
                          </Typography>
                        </Box>
                      ))}
                      <Paper sx={{ p: 1, mb: 2, bgcolor: "#fff3e0", borderLeft: "4px solid #ff9800" }}>
                        <Typography variant="body2" fontWeight="bold" color="warning.dark">
                          {order.notes}
                        </Typography>
                      </Paper>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Stack direction="row" spacing={1}>
                      {order.status === "OPEN" && (
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          startIcon={<RestaurantIcon />}
                          onClick={() => handleStatusUpdate(order._id, "cooking")}
                        >
                          Start Cooking
                        </Button>
                      )}
                      {order.status === "cooking" && (
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleStatusUpdate(order._id, "ready")}
                        >
                          Mark Ready
                        </Button>
                      )}
                      {order.status === "ready" && (
                        <Typography variant="body2" color="success.main" textAlign="center" width="100%" fontWeight="bold">
                          Waiting for server...
                        </Typography>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}