import React, { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Grid, Chip, Divider,
  Button, Stack, Paper, useMediaQuery,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Navbar from "../../components/layout/navbar";
import socket from "../../socket";
import { getAllOrders, updateStatus } from "../../api/order.api";
import { useTheme } from "@mui/material/styles";

const STATUS_CONFIG = {
  OPEN:    { label: "New",     color: "warning", border: "#f59e0b", bg: "rgba(245,158,11,0.06)"  },
  cooking: { label: "Cooking", color: "primary", border: "#0ea5e9", bg: "rgba(14,165,233,0.06)"  },
  ready:   { label: "Ready",   color: "success", border: "#10b981", bg: "rgba(16,185,129,0.06)"  },
};

const getConf = (status) => STATUS_CONFIG[status] ?? STATUS_CONFIG["OPEN"];

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);
  const theme   = useTheme();
  const isMd    = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    let active = true;
    const fetch = async () => {
      try {
        const res = await getAllOrders();
        const all = res?.data || [];
        const kitchen = all.filter(
          (o) => !["pending", "served", "paid"].includes(o.status)
        );
        if (active) setOrders(kitchen);
      } catch (e) {
        console.error("Error fetching orders:", e);
      }
    };
    fetch();
    const id = setInterval(fetch, 5000);
    return () => { active = false; clearInterval(id); };
  }, []);

  useEffect(() => {
    socket.on("order:new", (o) => {
      if (!["pending", "paid"].includes(o.status))
        setOrders((p) => [o, ...p]);
    });
    socket.on("order:statusChanged", (o) => {
      setOrders((p) => {
        const exists = p.find((x) => x._id === o._id);
        if (exists) {
          if (["pending", "served", "paid"].includes(o.status))
            return p.filter((x) => x._id !== o._id);
          return p.map((x) => (x._id === o._id ? o : x));
        }
        if (!["pending", "served", "paid"].includes(o.status))
          return [o, ...p];
        return p;
      });
    });
    return () => { socket.off("order:new"); socket.off("order:statusChanged"); };
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateStatus(orderId, { status: newStatus });
      setOrders((p) => p.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const byStatus = (s) => orders.filter((o) => o.status === s);
  const columns  = [
    { key: "OPEN",    title: "New Orders"  },
    { key: "cooking", title: "Cooking"     },
    { key: "ready",   title: "Ready"       },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Navbar />

      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 2.5, md: 4 } }}>
        {/* Header */}
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }} spacing={1.5} mb={4}>
          <Box>
            <Typography variant="h4" fontWeight={800} color="primary.main">
              Kitchen Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Live order management · updates every 5 s
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {columns.map(({ key, title }) => (
              <Chip
                key={key}
                label={`${title}: ${byStatus(key).length}`}
                color={getConf(key).color}
                variant={byStatus(key).length > 0 ? "filled" : "outlined"}
                sx={{ fontWeight: 700, color: byStatus(key).length > 0 ? "white" : undefined }}
              />
            ))}
          </Stack>
        </Stack>

        {orders.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 14 }}>
            <Typography fontSize={56} mb={2}>☕</Typography>
            <Typography variant="h6" color="text.secondary" fontWeight={600}>
              No active orders right now.
            </Typography>
            <Typography variant="body2" color="text.disabled" mt={0.5}>
              New orders will appear here automatically.
            </Typography>
          </Box>
        ) : isMd ? (
          /* Desktop: Kanban columns */
          <Grid container spacing={3} alignItems="flex-start">
            {columns.map(({ key, title }) => {
              const conf = getConf(key);
              return (
                <Grid item xs={12} md={4} key={key}>
                  <Box sx={{
                    bgcolor: conf.bg,
                    borderRadius: 4,
                    border: `1px solid ${conf.border}30`,
                    p: 2,
                    minHeight: 200,
                  }}>
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <Box sx={{
                        width: 10, height: 10, borderRadius: "50%",
                        bgcolor: conf.border
                      }} />
                      <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
                      <Chip label={byStatus(key).length} size="small"
                        sx={{ ml: "auto", fontWeight: 700, bgcolor: conf.border, color: "white", height: 22 }} />
                    </Stack>
                    <Stack spacing={2}>
                      {byStatus(key).map((order) => (
                        <OrderCard key={order._id} order={order} onUpdate={handleStatusUpdate} conf={conf} />
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          /* Mobile: flat list */
          <Grid container spacing={2}>
            {orders.map((order) => (
              <Grid item xs={12} key={order._id}>
                <OrderCard order={order} onUpdate={handleStatusUpdate} conf={getConf(order.status)} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

function OrderCard({ order, onUpdate, conf }) {
  return (
    <Card elevation={0} sx={{
      borderRadius: 4,
      borderLeft: `5px solid ${conf.border}`,
      bgcolor: "rgba(255,255,255,0.95)",
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": { transform: "translateY(-3px)", boxShadow: "0 12px 28px rgba(15,23,42,0.1)" },
    }}>
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        {/* Top Row */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Typography variant="h6" fontWeight={800}>
            Table {order.table?.number ?? "—"}
          </Typography>
          <Chip label={order.status.toUpperCase()} color={conf.color} size="small" sx={{ fontWeight: 700 }} />
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <TimerIcon fontSize="small" sx={{ color: "text.disabled" }} />
          <Typography variant="caption" color="text.secondary">
            {order.createdAt
              ? new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "—"}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Items */}
        <Stack spacing={0.8} mb={2}>
          {order.items.map((item, i) => (
            <Box key={i} display="flex" justifyContent="space-between" alignItems="center">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalDiningIcon sx={{ fontSize: 14, color: "text.disabled" }} />
                <Typography variant="body2" fontWeight={600}>{item.name}</Typography>
              </Box>
              <Chip label={`×${item.quantity}`} size="small"
                sx={{ bgcolor: "rgba(15,23,42,0.06)", fontWeight: 700, height: 22 }} />
            </Box>
          ))}
        </Stack>

        {order.notes && (
          <Paper elevation={0} sx={{
            p: 1.5, mb: 2, borderRadius: 2,
            bgcolor: "rgba(245,158,11,0.08)",
            borderLeft: "3px solid #f59e0b",
          }}>
            <Typography variant="caption" fontWeight={700} color="warning.dark">
              📝 {order.notes}
            </Typography>
          </Paper>
        )}

        <Divider sx={{ mb: 2 }} />

        {/* Action */}
        {order.status === "OPEN" && (
          <Button fullWidth variant="contained" color="primary" startIcon={<RestaurantIcon />}
            onClick={() => onUpdate(order._id, "cooking")} sx={{ borderRadius: 3 }}>
            Start Cooking
          </Button>
        )}
        {order.status === "cooking" && (
          <Button fullWidth variant="contained" color="success" startIcon={<CheckCircleIcon />}
            onClick={() => onUpdate(order._id, "ready")} sx={{ borderRadius: 3 }}>
            Mark as Ready
          </Button>
        )}
        {order.status === "ready" && (
          <Box sx={{ textAlign: "center", py: 1 }}>
            <Typography variant="body2" color="success.main" fontWeight={700}>
              ✓ Ready — waiting for server
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
